# Storefront assets build system

Multijazyčný build systém pro sdílené jádro (core) a jednotlivé jazykové varianty (CZ, SK, …). V repu existují pouze dvě složky `src/scss` a `src/js`. 

**Core soubory:** Každý soubor bez prefixu (např. `style.scss`, `main.js`) se bere jako core. Všechny core SCSS se sloučí do jednoho `style.css`, všechny core JS se buildí jednotlivě. Core soubory se zkopírují do každé lokalitní složky.

**Locale soubory:** Všechny soubory s prefixem `<locale>-` (např. `sk-header.scss`, `sk-differences.scss`, `cz-hero.js`) se pro danou lokalitu sloučí do jednoho `<prefix>-differences.css` resp. `<prefix>-differences.js`.

Každá složka `dist/<locale>` obsahuje:

- `style.css` / `style.min.css` / `main.js` / `main.min.js` – kopie core souborů (normální i minifikované verze).
- `<prefix>-differences.css` / `<prefix>-differences.min.css` / `<prefix>-differences.js` / `<prefix>-differences.min.js` – bundle všech souborů s daným prefixem (normální i minifikované verze).

## Struktura

- `src/scss` – všechny SCSS soubory. Všechny bez prefixu se při buildu spojí do jednoho balíku `style.css` (a `style.min.css`). Všechny soubory s prefixem `<prefix>-` (např. `sk-header.scss`, `sk-differences.scss`) se sloučí do jednoho `<prefix>-differences.css` (a `<prefix>-differences.min.css`).
- `src/js` – všechny JS soubory. Core soubory bez prefixu se buildí jednotlivě (normální i minifikované verze). Všechny soubory s prefixem `<prefix>-` se sloučí do jednoho `<prefix>-differences.js` (a `<prefix>-differences.min.js`).
- `config/locales.json` – seznam lokalit a jejich prefixů.
- `scripts/*.mjs` – build (sass + esbuild) a watch skripty.

## Skripty

```bash
npm run clean   # smaže dist
npm run build   # jednorázová kompilace všech variant
npm run dev     # watch mód (při změně src rebuild)
```

## Lokální sync (Chrome Override)

Při vývoji s Chrome Override můžeš nastavit automatické kopírování buildu do override složek. Po každém úspěšném buildu v `npm run dev` se soubory automaticky zkopírují na zadané cesty.

### Konfigurace

Vytvoř nebo uprav soubor `sync.config.json` v rootu repa:

```json
[
  {
    "source": "dist/cz/js/main.js",
    "target": "/Users/jankolonicny/Developer/Overrides/752801.myshoptet.com/user/documents/jankolonicny/cz/js/main.js"
  },
  {
    "source": "dist/cz/css/style.css",
    "target": "/Users/jankolonicny/Developer/Overrides/752801.myshoptet.com/user/documents/jankolonicny/cz/css/style.css?v=1.0"
  }
]
```

- `source` – relativní cesta k souboru v `dist/`
- `target` – absolutní cesta, kam se má soubor zkopírovat (včetně query stringu v názvu, pokud ho Chrome Override vyžaduje)

Sync probíhá pouze při `npm run dev`, ne při `npm run build`. Pokud soubor neexistuje nebo dojde k chybě, zobrazí se varování, ale proces pokračuje.

## Deployment

Workflow `.github/workflows/deploy.yml`:

1. Spustí se na `push` do `main`.
2. Provede `npm ci && npm run build`.
3. Dynamicky načte lokality z `config/locales.json` a vytvoří deployment matrix.
4. Pro každou lokalitu nahraje kompletní `dist/<locale>` (core + differences soubory) přes SFTP (`ftp.myshoptet.com`, port 22) do `jankolonicny/<kód>/css/` a `jankolonicny/<kód>/js/`.

**Secrets:**
- Nastavují se v GitHub Environments (`ftp-<kód>`, např. `ftp-cz`, `ftp-sk`) pod názvy `FTP_USERNAME`, `FTP_PASSWORD`.
- Host je pevně `ftp.myshoptet.com`, není potřeba ho ukládat jako secret.
- Pokud secrets pro lokalitu chybí, deployment se přeskočí s varováním (ostatní lokality se nasadí normálně).

## Nalinkování souborů ve Shoptetu

Po nasazení souborů je potřeba je nalinkovat v administraci Shoptetu. Příklad pro českou lokalitu (`cz`):

### CSS soubory

```html
<link href="/user/documents/jankolonicny/cz/css/style.min.css?v=1.01" rel="stylesheet" />
<link href="/user/documents/jankolonicny/cz/css/cz-differences.min.css?v=1.01" rel="stylesheet" />
```

### JavaScript soubory

```html
<script src="/user/documents/jankolonicny/cz/js/main.min.js?v=1.01"></script>
<script src="/user/documents/jankolonicny/cz/js/cz-differences.min.js?v=1.01"></script>
```

**Poznámky:**
- Cesta: `/user/documents/jankolonicny/<kód>/css/` resp. `/user/documents/jankolonicny/<kód>/js/`
- Používej minifikované verze (`.min.css`, `.min.min.js`) pro produkci
- Verzování pomocí query parametru `?v=1.01` pomáhá s cache busting
- Pro jiné lokality (např. `sk`) změň kód v cestě: `/user/documents/jankolonicny/sk/...`

## Přidání nové lokality

1. Přidej záznam do `config/locales.json` (kód + prefix).
2. V `src/scss` / `src/js` založ soubory pojmenované `<prefix>-*.scss|js` (např. `hu-differences.scss`, `hu-differences.js`).
3. Otestuj `npm run build`.
4. Přidej nový GitHub Environment `ftp-<kód>` (např. `ftp-hu`) s secrets `FTP_USERNAME` a `FTP_PASSWORD`.
   - Workflow automaticky detekuje novou lokalitu z `config/locales.json` a přidá ji do deploymentu.
   - Pokud secrets chybí, deployment se přeskočí s varováním.
   - Host zůstává `ftp.myshoptet.com`, SFTP port 22.

