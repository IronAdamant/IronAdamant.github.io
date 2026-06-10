# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Personal portfolio site (ironadamant.github.io) — vanilla HTML/CSS/JS, no framework, no package.json, no npm dependencies, no tests. Deployed to GitHub Pages via GitHub Actions on every push to `main` (`.github/workflows/deploy.yml`); `.md` files and dot-directories are excluded from deployment.

## Commands

```bash
python -m http.server 8000   # local dev server (static site, no build needed to view)

node build.js                # patch version bump + full rebuild — run before committing asset changes
node build.js minor          # minor bump + rebuild
node build.js major          # major bump + rebuild
node build.js 1.2.3          # set explicit version
node build.js --css-only     # re-inject critical CSS only, no version bump
```

There is no lint or test tooling in this repo.

## Build Pipeline (build.js)

`build.js` is the single source of versioning and critical-CSS truth. Running it:

1. Injects `css/critical.css` into a `<style>` block at the `<!-- CRITICAL_CSS -->` marker in each of the four pages (`index.html`, `projects.html`, `apps.html`, `contact.html`). **Never hand-edit the injected `<style>` blocks** — edit `css/critical.css` and re-run the build. Page-specific critical CSS is delimited inside `critical.css` by `/* page:filename.html */` markers; CSS before the first marker is shared by all pages.
2. Bumps `version` and `build_timestamp` in `manifest.json`.
3. Rewrites `CACHE_VERSION` in `sw.js` to match.
4. Stamps `?v=<timestamp>` on every local CSS/JS reference in all HTML files (including `404.html`) and updates the `build-version` meta tag.

The service worker (`sw.js` + `js/sw-register.js`) polls `manifest.json`; a changed version/timestamp clears all client caches. If you change any CSS/JS/HTML and skip `build.js`, returning visitors get stale cached assets. Commit messages conventionally reference the new version (e.g. `feat: add X to portfolio (v1.0.14)`).

## Architecture

### Project cards are data-driven
- `js/project-data.js` defines all open-source projects (`projectData` array), the homepage about text (`aboutData`), and `projectHelpers`. The **first 3 entries** in the array are the homepage "featured" projects; all entries render on `projects.html` with category filtering.
- `js/project-loader.js` renders cards on both pages from that data. To add/remove/reorder a project, edit `project-data.js` only — no HTML changes.
- **Paid apps are the exception**: Checkpoint Projects and ConsistencyHub live as static HTML in `apps.html` (styled by `css/apps.css`), not in `project-data.js`.

### CSS
- `css/main.css` is an import-only entry point: base → layout → components → animations → patterns → responsive. Import order matters.
- Loaded separately from `main.css`: `critical.css` (build-injected, never linked), `apps.css` (apps.html only), `lightbox.css` (index + projects only), `mobile-nav.css` (all pages, `media="all"`, not deferred), `accessibility.css`.
- `main.css` is loaded async (`media="print"` onload swap) — critical CSS injection is what prevents FOUC.
- Keep files under 500 LOC. `components.css` is already over (~555) — put new styles in page-specific files instead of adding to it.
- Typography is fluid (`clamp()` in base.css/layout.css) — don't add per-breakpoint font-size overrides to responsive.css.

### Icons
- All icons come from the self-hosted SVG sprite `images/icons.svg` (Font Awesome Free artwork, CC BY 4.0). There is NO Font Awesome CDN dependency.
- Markup: `<svg class="icon" aria-hidden="true"><use href="/images/icons.svg#github"/></svg>` (`.icon` base class is in base.css).
- `project-data.js` link icons take the sprite symbol id (`"github"`, `"box"`, `"external-link"`); legacy `"fab fa-*"` strings still resolve via an alias map in project-loader.js.
- New icon: append a `<symbol id viewBox>` to the sprite.

### Page transitions & scroll animations
- Cross-page transitions use the native View Transitions API (`@view-transition` in animations.css) plus Speculation Rules prefetch (`<script type="speculationrules">` in each head). There is no transition JS.
- Card scroll-reveal: IntersectionObserver in navigation.js adds `.in-view`; the hidden initial state lives in animations.css behind `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`.
- **Init-order gotcha**: deferred scripts run before `DOMContentLoaded`, so project-loader.js calls `initScrollAnimations()`/`initImageExpansion()` itself after rendering cards. `initScrollAnimations` is idempotent (`data-reveal-init` guard).
- Image lightbox is a native `<dialog>` (image-modal.js + lightbox.css) — never reintroduce `position: fixed` overlays inside `.project-item`; its `contain: paint` clips fixed descendants.

### Navigation is duplicated
Every page has both a desktop `<header><nav>` and a separate `<nav class="mobile-nav">`. Nav changes must be applied to **both navs across all four pages**. Order: Home | Projects | Apps | Contact.

### Adding a new cacheable asset
New CSS/JS/font files must also be added to `urlsToCache` in `sw.js`, or offline/PWA caching won't include them.

### 404.html is path-sensitive
GitHub Pages serves 404.html for any missing URL at any depth, so every local reference in it (CSS, JS, links, icons) must be root-absolute (`/css/...`, `/index.html`). Never use relative paths there.

## Repo Hygiene

- `COMPLETE_PROJECT_DOCUMENTATION.md`, `LLM_Development.md`, and `wiki-local/` are local-only documentation (gitignored).
- Untracked root-level artifacts (`.chisel/`, `.stele*/`, `.wikifier*/`, `trammel.db*`, `journal/`, `wikifier.sh`, `library.md`, `file_health.md`, etc.) are local AI-tooling state — never commit them.
- `CNAME`, `robots.txt`, and `sitemap.xml` are deployment-critical; the site is served from the repo root (no `dist/`).
