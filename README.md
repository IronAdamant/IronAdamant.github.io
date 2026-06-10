# Iron_Adamant Portfolio

Personal portfolio website showcasing software development projects and tools.

## Quick Start

1. Clone the repository
2. Open `index.html` in a browser
3. For local development: `python -m http.server 8000`

## Deployment

Uses GitHub Actions to deploy to GitHub Pages (excludes `.md` files).

**Enable:**
1. Repository Settings → Pages
2. Source: "GitHub Actions"
3. Push to `main` to deploy

## Structure

| File/Folder | Purpose |
|-------------|---------|
| `index.html` | Homepage with hero and featured projects |
| `projects.html` | Project gallery with filtering |
| `apps.html` | Paid products (Checkpoint Projects, ConsistencyHub) |
| `contact.html` | Contact form (Formspree backend) |
| `404.html` | Custom error page |
| `css/` | Modular stylesheets |
| `js/` | JavaScript modules |
| `images/` | Assets |

## CSS Architecture

Modular CSS structure (imported via `main.css`):

| Module | Purpose | LOC |
|--------|---------|-----|
| `base.css` | Variables, reset, fluid typography, icons | ~175 |
| `layout.css` | Header, nav, hero, footer | ~240 |
| `components.css` | Buttons, cards, forms, tags | ~555 |
| `animations.css` | Keyframes, view transitions, scroll-reveal | ~120 |
| `patterns.css` | Background circuit patterns | ~210 |
| `responsive.css` | Media queries | ~105 |
| `main.css` | Entry point (imports all) | ~11 |

Loaded separately (not via `main.css`): `critical.css` (build-injected), `accessibility.css`, `mobile-nav.css`, `lightbox.css` (index/projects only), `apps.css` (apps page only).

Page navigation transitions use the native View Transitions API; prefetching uses Speculation Rules — both progressive enhancements with zero JS.

## JS Architecture

Modular JS structure (loaded via separate files):

| Module | Purpose | LOC |
|--------|---------|-----|
| `navigation.js` | Mobile nav drawer, IntersectionObserver scroll-reveal | ~75 |
| `contact-form.js` | Form validation, submission, spam protection | ~265 |
| `image-modal.js` | Native `<dialog>` image lightbox | ~65 |
| `project-loader.js` | Dynamic project rendering and filtering | ~240 |
| `project-data.js` | Project definitions and helpers | ~330 |
| `sw-register.js` | Service worker registration and updates | ~135 |
| `main.js` | Entry point (orchestrates all) | ~25 |

## Icons

Icons are self-hosted as an SVG sprite at `images/icons.svg` (Font Awesome Free artwork, CC BY 4.0 — no CDN dependency, works offline). Usage:

```html
<svg class="icon" aria-hidden="true"><use href="/images/icons.svg#github"/></svg>
```

Project link icons in `project-data.js` take the sprite symbol id (e.g. `"github"`, `"box"`, `"external-link"`). To add a new icon, append a `<symbol>` to the sprite.

## Cache Busting

Before commits:
```bash
node build.js          # patch bump + full rebuild
node build.js minor    # minor bump + rebuild
node build.js --css-only  # CSS injection only, no version bump
```

Updates version in `manifest.json`, `sw.js`, injects critical CSS, and cache-busts all local assets.

## AI-Assisted Development

This project is indexed with [Stele](https://github.com/IronAdamant/Stele), a local context cache for LLM agents. Stele provides semantic chunking, vector search, symbol graph analysis, and multi-agent safety across the codebase, enabling faster context retrieval in long-running AI-assisted development sessions without re-reading unchanged files.

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript — no frameworks, no external runtime dependencies
- View Transitions API + Speculation Rules (native page transitions and prefetch)
- Service Worker (PWA with offline support, including self-hosted fonts and icons)
- Formspree (contact form)
- GitHub Actions (deployment)
- [Stele](https://github.com/IronAdamant/Stele) (AI development tooling)
