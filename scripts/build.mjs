import { readFile, writeFile, mkdir, copyFile, readdir, unlink, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';
import { build as esbuild, transform } from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'config', 'locales.json');
const DIST_DIR = path.join(ROOT, 'dist');
const SRC_SCSS = path.join(ROOT, 'src', 'scss');
const SRC_JS = path.join(ROOT, 'src', 'js');

const CSS_OUT = (scope, name) => path.join(DIST_DIR, scope, 'css', `${name}.css`);
const JS_OUT = (scope, name) => path.join(DIST_DIR, scope, 'js', `${name}.js`);
const CORE_CSS_BUNDLE_NAME = 'style';
const CORE_JS_BUNDLE_NAME = 'main';

async function readConfig() {
  const raw = await readFile(CONFIG_PATH, 'utf8');
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed.locales) || parsed.locales.length === 0) {
    throw new Error('config/locales.json must contain locales array');
  }
  parsed.locales.forEach((locale) => {
    if (!locale.code || !locale.prefix) {
      throw new Error(`Locale entry missing code/prefix: ${JSON.stringify(locale)}`);
    }
  });
  return parsed;
}

async function ensureSourceDirs() {
  await Promise.all([
    mkdir(SRC_SCSS, { recursive: true }),
    mkdir(SRC_JS, { recursive: true })
  ]);
}

async function listEntries(dir, extension) {
  const entries = [];
  
  async function scanDirectory(currentDir) {
    const items = await readdir(currentDir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item.name);
      
      if (item.isDirectory()) {
        // Recursively scan subdirectories
        await scanDirectory(fullPath);
      } else if (item.isFile() && item.name.endsWith(extension)) {
        // Extract just the filename without extension for name (used for prefix matching)
        const name = item.name.slice(0, -extension.length);
        entries.push({
          name,
          file: fullPath
        });
      }
    }
  }
  
  await scanDirectory(dir);
  return entries;
}

function splitByLocale(entries, locales) {
  const perLocale = new Map(locales.map((locale) => [locale.code, []]));
  const core = [];

  entries.forEach((entry) => {
    const match = locales.find((locale) => entry.name.startsWith(`${locale.prefix}-`));
    if (match) {
      perLocale.get(match.code).push(entry);
    } else {
      core.push(entry);
    }
  });

  return { core, perLocale };
}

async function buildScss(entry, outFile, minify = false) {
  const compiled = await sass.compileAsync(entry, {
    style: minify ? 'compressed' : 'expanded',
    loadPaths: [path.dirname(entry)]
  });
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, compiled.css);
  return outFile;
}

async function buildScssBundle(entries, outFile, minify = false) {
  if (entries.length === 0) return null;
  const statements = entries
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => {
      const importPath = path.relative(SRC_SCSS, entry.file).replace(/\\/g, '/');
      return `@use '${importPath}' as *;`;
    })
    .join('\n');

  const compiled = await sass.compileStringAsync(statements, {
    style: minify ? 'compressed' : 'expanded',
    loadPaths: [SRC_SCSS]
  });
  await mkdir(path.dirname(outFile), { recursive: true });
  await writeFile(outFile, compiled.css);
  return outFile;
}

async function buildScssBundleBoth(entries, outFile) {
  if (entries.length === 0) return { normal: null, min: null };
  const baseName = outFile.replace(/\.css$/, '');
  const normalFile = `${baseName}.css`;
  const minFile = `${baseName}.min.css`;
  
  const [normal, min] = await Promise.all([
    buildScssBundle(entries, normalFile, false),
    buildScssBundle(entries, minFile, true)
  ]);
  
  return { normal, min };
}

async function buildJs(entry, outFile, minify = false) {
  await mkdir(path.dirname(outFile), { recursive: true });
  await esbuild({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2019',
    sourcemap: !minify,
    minify,
    outfile: outFile
  });
  return outFile;
}

async function buildJsBoth(entry, outFile) {
  const baseName = outFile.replace(/\.js$/, '');
  const normalFile = `${baseName}.js`;
  const minFile = `${baseName}.min.js`;
  
  const [normal, min] = await Promise.all([
    buildJs(entry, normalFile, false),
    buildJs(entry, minFile, true)
  ]);
  
  return { normal, min };
}

async function buildJsBundle(entries, outFile, minify = false) {
  if (entries.length === 0) return null;

  const sorted = entries.slice().sort((a, b) => a.name.localeCompare(b.name));
  const contents = await Promise.all(sorted.map((entry) => readFile(entry.file, 'utf8')));
  const concatenated = contents.join('\n\n');

  await mkdir(path.dirname(outFile), { recursive: true });

  if (minify) {
    const result = await transform(concatenated, {
      loader: 'js',
      minify: true,
      target: 'es2019'
    });
    await writeFile(outFile, result.code);
  } else {
    await writeFile(outFile, concatenated);
  }
  return outFile;
}

async function buildJsBundleBoth(entries, outFile) {
  if (entries.length === 0) return { normal: null, min: null };
  const baseName = outFile.replace(/\.js$/, '');
  const normalFile = `${baseName}.js`;
  const minFile = `${baseName}.min.js`;
  
  const [normal, min] = await Promise.all([
    buildJsBundle(entries, normalFile, false),
    buildJsBundle(entries, minFile, true)
  ]);
  
  return { normal, min };
}

async function copyCoreGroup(assets, localeCode, type) {
  const copies = [];
  for (const asset of assets) {
    const dest = type === 'css'
      ? CSS_OUT(localeCode, asset.name)
      : JS_OUT(localeCode, asset.name);
    
    await mkdir(path.dirname(dest), { recursive: true });
    await copyFile(asset.path, dest);
    copies.push(dest);
  }
  return copies;
}

async function buildLocaleBundle(entries, localeCode, localePrefix, type) {
  if (entries.length === 0) {
    // No source files - create empty bundle files
    const baseName = type === 'css' 
      ? CSS_OUT(localeCode, `${localePrefix}-differences`).replace(/\.css$/, '')
      : JS_OUT(localeCode, `${localePrefix}-differences`).replace(/\.js$/, '');
    
    const normalFile = type === 'css' ? `${baseName}.css` : `${baseName}.js`;
    const minFile = type === 'css' ? `${baseName}.min.css` : `${baseName}.min.js`;
    
    // Ensure directory exists
    await mkdir(path.dirname(normalFile), { recursive: true });
    
    // Create empty files
    await writeFile(normalFile, '');
    await writeFile(minFile, '');
    
    console.log(`[build] Created empty bundle: ${path.relative(ROOT, normalFile)}`);
    
    return { normal: normalFile, min: minFile };
  }
  
  if (type === 'css') {
    // Bundle all SCSS files with this prefix into one <prefix>-differences.css (both normal and min)
    const outFile = CSS_OUT(localeCode, `${localePrefix}-differences`);
    return await buildScssBundleBoth(entries, outFile);
  } else {
    // Bundle all JS files with this prefix into one <prefix>-differences.js (both normal and min)
    const outFile = JS_OUT(localeCode, `${localePrefix}-differences`);
    // For JS, we need to create a temporary entry file that imports all files
    const tempEntry = path.join(ROOT, '.tmp', `${localePrefix}-bundle.js`);
    await mkdir(path.dirname(tempEntry), { recursive: true });
    
    const imports = entries
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((entry) => {
        const importPath = path.relative(path.dirname(tempEntry), entry.file).replace(/\\/g, '/');
        return `import '${importPath}';`;
      })
      .join('\n');
    
    await writeFile(tempEntry, imports);
    
    try {
      return await buildJsBoth(tempEntry, outFile);
    } finally {
      // Clean up temp file
      try {
        await unlink(tempEntry);
      } catch {}
    }
  }
}

export async function buildAll() {
  await ensureSourceDirs();
  const config = await readConfig();
  await mkdir(DIST_DIR, { recursive: true });

  const [scssEntries, jsEntries] = await Promise.all([
    listEntries(SRC_SCSS, '.scss'),
    listEntries(SRC_JS, '.js')
  ]);

  const scssSplit = splitByLocale(scssEntries, config.locales);
  const jsSplit = splitByLocale(jsEntries, config.locales);

  const coreCss = [];
  const coreCssResult = await buildScssBundleBoth(scssSplit.core, CSS_OUT('core', CORE_CSS_BUNDLE_NAME));
  if (coreCssResult.normal) {
    coreCss.push({ name: CORE_CSS_BUNDLE_NAME, path: coreCssResult.normal });
    if (coreCssResult.min) {
      coreCss.push({ name: `${CORE_CSS_BUNDLE_NAME}.min`, path: coreCssResult.min });
    }
  }

  const coreJs = [];
  const coreJsResult = await buildJsBundleBoth(jsSplit.core, JS_OUT('core', CORE_JS_BUNDLE_NAME));
  if (coreJsResult.normal) {
    coreJs.push({ name: CORE_JS_BUNDLE_NAME, path: coreJsResult.normal });
    if (coreJsResult.min) {
      coreJs.push({ name: `${CORE_JS_BUNDLE_NAME}.min`, path: coreJsResult.min });
    }
  }

  const localesResults = [];
  for (const locale of config.locales) {
    const cssCoreCopies = await copyCoreGroup(coreCss, locale.code, 'css');
    const jsCoreCopies = await copyCoreGroup(coreJs, locale.code, 'js');
    
    const localeScssEntries = scssSplit.perLocale.get(locale.code) ?? [];
    const localeJsEntries = jsSplit.perLocale.get(locale.code) ?? [];
    
    const diffCss = await buildLocaleBundle(localeScssEntries, locale.code, locale.prefix, 'css');
    const diffJs = await buildLocaleBundle(localeJsEntries, locale.code, locale.prefix, 'js');

    const diffCssFiles = [];
    if (diffCss.normal) diffCssFiles.push(diffCss.normal);
    if (diffCss.min) diffCssFiles.push(diffCss.min);
    
    const diffJsFiles = [];
    if (diffJs.normal) diffJsFiles.push(diffJs.normal);
    if (diffJs.min) diffJsFiles.push(diffJs.min);

    localesResults.push({
      target: locale.code,
      coreCss: cssCoreCopies,
      coreJs: jsCoreCopies,
      diffCss: diffCssFiles,
      diffJs: diffJsFiles
    });
  }

  return {
    core: {
      css: coreCss.map(({ path }) => path),
      js: coreJs.map(({ path }) => path)
    },
    locales: localesResults
  };
}

const ENTRY_FILE = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === ENTRY_FILE) {
  buildAll()
    .then((outputs) => {
      outputs.core.css.forEach((file) => {
        const isMin = file.includes('.min.');
        console.log(`• core css${isMin ? ' (min)' : ''} -> ${path.relative(ROOT, file)}`);
      });
      outputs.core.js.forEach((file) => {
        const isMin = file.includes('.min.');
        console.log(`• core js${isMin ? ' (min)' : ''}  -> ${path.relative(ROOT, file)}`);
      });
      outputs.locales.forEach(({ target, coreCss, coreJs, diffCss, diffJs }) => {
        coreCss.forEach((file) => {
          const isMin = file.includes('.min.');
          console.log(`• ${target} css (core${isMin ? ', min' : ''}) -> ${path.relative(ROOT, file)}`);
        });
        coreJs.forEach((file) => {
          const isMin = file.includes('.min.');
          console.log(`• ${target} js  (core${isMin ? ', min' : ''}) -> ${path.relative(ROOT, file)}`);
        });
        diffCss.forEach((file) => {
          const isMin = file.includes('.min.');
          console.log(`• ${target} css (diff${isMin ? ', min' : ''}) -> ${path.relative(ROOT, file)}`);
        });
        diffJs.forEach((file) => {
          const isMin = file.includes('.min.');
          console.log(`• ${target} js  (diff${isMin ? ', min' : ''}) -> ${path.relative(ROOT, file)}`);
        });
      });
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

