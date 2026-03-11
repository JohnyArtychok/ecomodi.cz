import chokidar from 'chokidar';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, copyFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { buildAll } from './build.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const SRC_GLOB = path.join(ROOT, 'src');
const SYNC_CONFIG_PATH = path.join(ROOT, 'sync.config.json');

let running = false;
let pending = false;

function extractLocalPath(fileUrl) {
  // Remove file:// protocol only, keep query string in filename
  let localPath = fileUrl.replace(/^file:\/\//, '');
  return localPath;
}

async function syncFiles() {
  try {
    // Check if sync config exists
    await access(SYNC_CONFIG_PATH, constants.F_OK);
  } catch {
    // Config doesn't exist, skip sync
    return;
  }

  try {
    const configContent = await readFile(SYNC_CONFIG_PATH, 'utf8');
    const syncConfig = JSON.parse(configContent);
    
    if (!Array.isArray(syncConfig) || syncConfig.length === 0) {
      return;
    }

    console.log(`\n[sync] Syncing ${syncConfig.length} file(s)...`);
    
    for (const entry of syncConfig) {
      if (!entry.source || !entry.target) {
        console.warn(`[sync] ⚠️  Skipping invalid entry: ${JSON.stringify(entry)}`);
        continue;
      }

      const sourcePath = path.resolve(ROOT, entry.source);
      const targetPath = extractLocalPath(entry.target);

      try {
        // Check if source file exists
        await access(sourcePath, constants.F_OK);
        
        // Ensure target directory exists
        await mkdir(path.dirname(targetPath), { recursive: true });
        
        // Copy file
        await copyFile(sourcePath, targetPath);
        console.log(`[sync] ✅ ${path.relative(ROOT, sourcePath)} -> ${targetPath}`);
      } catch (error) {
        console.warn(`[sync] ⚠️  Failed to sync ${entry.source}: ${error.message}`);
        console.warn(`[sync]     Source: ${sourcePath}`);
        console.warn(`[sync]     Target: ${targetPath}`);
      }
    }
  } catch (error) {
    console.warn(`[sync] ⚠️  Failed to read sync config: ${error.message}`);
    console.warn(`[sync]     Config path: ${SYNC_CONFIG_PATH}`);
  }
}

async function runBuild(reason = 'manual') {
  if (running) {
    pending = true;
    return;
  }

  running = true;
  console.log(`\n[build] Starting (${reason})…`);
  try {
    const outputs = await buildAll();
    outputs.core.css.forEach((file) => console.log(`[build] core css -> ${path.relative(ROOT, file)}`));
    outputs.core.js.forEach((file) => console.log(`[build] core js  -> ${path.relative(ROOT, file)}`));
    outputs.locales.forEach(({ target, coreCss, coreJs, diffCss, diffJs }) => {
      coreCss.forEach((file) => console.log(`[build] ${target} css (core) -> ${path.relative(ROOT, file)}`));
      coreJs.forEach((file) => console.log(`[build] ${target} js  (core) -> ${path.relative(ROOT, file)}`));
      diffCss.forEach((file) => console.log(`[build] ${target} css (diff) -> ${path.relative(ROOT, file)}`));
      diffJs.forEach((file) => console.log(`[build] ${target} js  (diff) -> ${path.relative(ROOT, file)}`));
    });
    
    // Sync files after successful build
    await syncFiles();
  } catch (error) {
    console.error('[build] Failed:', error);
  } finally {
    running = false;
    if (pending) {
      pending = false;
      runBuild('queued change');
    }
  }
}

await runBuild('initial');

const watcher = chokidar.watch(SRC_GLOB, {
  ignoreInitial: true,
  persistent: true
});

watcher.on('all', (event, filePath) => {
  console.log(`[watch] ${event} -> ${path.relative(ROOT, filePath)}`);
  runBuild('file change');
});

['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, () => {
    console.log('\n[watch] Shutting down…');
    watcher.close().then(() => process.exit(0));
  });
});

