# CLAUDE.md

Guidance for AI assistants working in this repository.

## What This Is

Personal site (ironadamant.com) — vanilla HTML/CSS/JS, no framework, no package.json, no tests. Deployed to GitHub Pages via GitHub Actions on push to `main` (allowlisted files only).

**Positioning:** dual audience — contract software work (custom apps, AI tooling) and open-source / product portfolio. Differentiator: simplify technical complexity for non-technical decision-makers. Do not claim n8n or VPS services without shipped proof.

## Commands

```bash
python -m http.server 8000   # local static server

node build.js                # patch version + full rebuild
node build.js minor          # minor bump + rebuild
node build.js major          # major bump + rebuild
node build.js 1.2.3          # set explicit version
node build.js --css-only     # rebuild injects/CSS, no version bump
```

No lint or test tooling.

## Build Pipeline (`build.js`)

1. Concatenates `css/base.css` + `layout.css` + `components.css` + `accessibility.css` → **`css/bundle.css`** (what pages load).
2. Injects `css/critical.css` at `<!-- CRITICAL_CSS -->` (page-specific blocks via `/* page:filename.html */`).
3. Injects `partials/header.html` / `partials/footer.html` between `INJECT_*` / `END_INJECT_*` markers; marks active nav.
4. Renders work cards from **`data/work.json`** into featured / work list / products markers.
5. Bumps `manifest.json` version + timestamp; rewrites `CACHE_VERSION` in `sw.js`; stamps `?v=` on local CSS/JS.

**Edit sources, not generated regions:** never hand-edit injected header/footer/work blocks or the inlined critical `<style>` — change partials, `critical.css`, or `data/work.json` and re-run the build.

## Architecture

### Pages
- `index.html` — hero, services, featured work, products, about
- `work.html` — full portfolio + client-side filters (`js/work-filters.js`)
- `contact.html` — Formspree form (`js/contact-form.js`)
- `projects.html` / `apps.html` — SEO redirect stubs → `work.html`
- `404.html` — root-absolute assets (GitHub Pages catch-all)

### Work content
- Single source: `data/work.json` (`type`: `oss` | `product`, `category`, `featuredIds` on root).
- HTML is **static after build** (crawlable without JS).

### CSS
- Sources: `base`, `layout`, `components`, `accessibility`, `critical`.
- Browser loads **`css/bundle.css` only** (plus critical inline).
- Do not reintroduce `@import` waterfalls for production pages.

### JS
- `navigation.js` — mobile nav + focus trap
- `work-filters.js` — filter `.work-item[data-category]`
- `image-modal.js` — native `<dialog>` lightbox
- `contact-form.js` — validation + Formspree
- `main.js` — init orchestration
- `sw-register.js` + `sw.js` — slim PWA shell

### Icons
Self-hosted sprite `images/icons.svg`. Markup:  
`<svg class="icon" aria-hidden="true"><use href="/images/icons.svg#github"/></svg>`

### Nav
Home | Work | Contact — only via `partials/header.html` (desktop + mobile).

## Deploy

`.github/workflows/deploy.yml` copies an **allowlist** (HTML shell, `css/`, `js/`, `images/`, `fonts/`, `sw.js`, manifest, CNAME, robots, sitemap). Do not rely on denylist for secrets/tooling.

## Repo hygiene

Local AI tooling (`trammel.db`, `.stele*`, `.chisel/`, `wiki-local/`, etc.) must never be committed. `CNAME`, `robots.txt`, `sitemap.xml` are deployment-critical.
