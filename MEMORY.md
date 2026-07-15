# MEMORY — ecomodi.cz

## Hodnocení produktu (#ratingTab)

- Sekce byla původně celá skrytá (`#tab-content #ratingTab {display:none}` + skrytá záložka `tabRating`) — pravidla odstranil Kolo ručně, styly doplněny v `product-detail.scss` (blok `#ratingTab` mezi `#description` a `#tab-content`).
- **Hvězdy Shoptet**: icon font "shoptet", každá `span.star` je `float: left` s pevnou šířkou; glyf je v `::before`, který má **vlastní font-size i barvu**. Doplněk `rating-fix` (extras/rating-fix/screen-blank.css) barví glyf s `!important` → přepis vyžaduje `color: inherit !important` na `::before`.
- Wrapper `.stars` má ze šablony pevnou šířku 65px a výšku 12px — při zvětšení hvězd nutno `width/height: auto`, jinak se hvězdy zalamují.
- Histogram `.votes` skrývá rating-fix doplněk (`#ratingWrapper .rate-wrap .votes {display:none}`) — přepsáno vyšší specificitou `#ratingTab #ratingWrapper .rate-wrap .votes`.
- `.rate-count` (počet "1x") je v markup **uvnitř** `.rate-bar` — vytažen napravo přes `position: absolute; left: calc(100% + 12px)`, prostor rezervuje `.rate-block { padding-right: 44px }`.
- Formulář `#rate-form` řídí JS třídami `.js-hidden`/`.visible`; u produktu bez recenzí se zobrazuje automaticky rozbalený a bez `h3`. Prázdný stav = `p[data-testid="textCommentNotice"]` přímý potomek `#ratingTab`.
- `h2` v tabu dostává focus (tabindex="-1") po prokliku záložky → `outline: none`.

## Dev prostředí

- Chrome DevTools MCP je globálně připojený na port **9222**, ale shoptet-dev projekt `ecomodi` běží na portu **9231** → vytvořen `.mcp.json` v rootu projektu (projeví se po restartu Claude Code). Bez něj MCP ovládá jiný prohlížeč bez override interceptů.
- Override soubory v `~/Developer/Overrides/www.ecomodi.cz/.../style.min.css?v=1.093` mají otazník v názvu souboru — shell příkazy vyžadují quoting.
- `npm run dev` (watch.mjs) builduje dist a syncuje do Overrides dle `sync.config.json`.
