# SK lokalizace — stav

## Architektura

SK je **stejný eshop** jako CZ (`www.ecomodi.cz`), Shoptet sám rozliší jazyk:

- **CZ:** `<html lang="cs">`, URL `/`
- **SK:** `<html lang="sk">`, URL `/sk/`

Žádný separátní build, žádný `ftp-sk`, žádné `sk-differences.*`. Vše jde do CZ buildu (`dist/cz/`) a deployuje se na CZ FTP. Jazyk se detekuje v runtime přímo v core souborech.

**Detekce v JS:** `getShoptetDataLayer().language === "sk"`
**Detekce v CSS:** `html[lang="sk"] .selector { … }`

---

## Hotovo

### `src/js/datalayer.js`

- `var shopDataLayer` přejmenováno na `var csShopDataLayer` (CZ defaulty zůstávají beze změny, řádky 1–802)
- Přidán `var skShopDataLayer` — literální objekt zrcadlící CZ strukturu, jen s SK texty (řádky 805–1606)
- Přidán resolver na konci: `var shopDataLayer = getShoptetDataLayer().language === "sk" ? skShopDataLayer : csShopDataLayer;`
- Konzumenti (`footer.js`, `product-detail.js`, `blog-article.js`) zůstávají beze změny — pořád čtou globální `shopDataLayer`

**Přeložené texty:**

- Newsletter (title, subtitle, placeholder)
- Detail produktu: "Prečítať detailný popis", tab "Parametre" (descriptionTab "Popis produktu" je shodný)
- "Ako vybrať správnu veľkosť?" (link u parametru velikosti)
- Velikostní tabulky — všech 10 střihů (premium, extra-vysoke-pohodlne, klasicky-strih, vysoky-pas, nohavickove, tanga, premium-extra-klasicke, premium-extra-vysoke, boxerky, slipy):
  - h2 "Veľkostná tabuľka"
  - sloupce "Veľkosť / Obvod pásu / Obvod bokov / Rozmery nohavičiek*"
  - special text pod tabulkou (3 varianty)
  - notes pod obrázkem střihu
  - alt atributy obrázků
- "Akú absorpciu zvoliť?" (link u parametru absorpce) + celý popup absorpce (Slabá, Stredná, Silná, Extra silná)
- Blog: "Podobné články" — v SK se čte z CZ defaultu (text je stejný)

### `src/scss/benefits.scss`

- Přidán `html[lang="sk"] &` přepis pseudoelementu `.benefitBanner::before`: "Prečo zvoliť Ecomodi?"
- Compiled výstup ověřen: `html[lang=sk] .benefitBanner::before{content:"Prečo zvoliť Ecomodi?"}`

### Build

- `npm run build` prošel bez chyb
- SK datalayer ověřený programaticky: žádné zbylé CZ markery (`Kromě`, `kalhotek`, `spodním`, `Velikostní`, …)

---

## Zbývá

- [ ] **Deploy** — push do `main` → GitHub Actions → CZ FTP
- [ ] **Bump verze** v Shoptet šabloně (`?v=1.07` → `?v=1.08`) pro cache busting CSS i JS
- [ ] **QA na live SK eshopu** (Chrome MCP) — `https://www.ecomodi.cz/sk/`:
  - HP — výhody "Prečo zvoliť Ecomodi?"
  - Newsletter v patičce
  - Detail produktu — link "Ako vybrať správnu veľkosť?" + popup
  - Detail produktu — link "Akú absorpciu zvoliť?" + popup
  - Detail produktu — záložka "Parametre", "Prečítať detailný popis"
  - Blog detail — "Podobné články"
- [ ] **QA CZ eshopu** že nic neregresovalo

---

## Známá omezení / rozhodnutí

### Hardcoded "Velikostní tabulka" v `product-detail.js`

JS hledá v parametrech řádek pojmenovaný `"Velikostní tabulka"` (`product-detail.js:19, 41`). Slouží ke skrytí řádku a načtení typu střihu pro popup. **V Shoptet adminu musí parametr zůstat pojmenovaný česky** (i pro SK produkty), jinak popup nebude správně reagovat na změnu střihu.

Možný refaktor (ne teď): vytáhnout do datalayeru jako `productDetail.parameterNames.sizeTable`.

### Regex `/střih|strih/i` v `product-detail.js:55, 122`

Funguje pro CZ i SK díky alternativě v regexu — žádná úprava nepotřeba.

### Synchronizace CZ ↔ SK datalayeru

Oba objekty jsou literální. Když se v CZ změní hodnota (např. nová velikost v tabulce), musí se ručně promítnout i do SK. Před commitem doporučuji vizuální diff csShopDataLayer vs skShopDataLayer — struktura musí být identická, liší se pouze texty.
