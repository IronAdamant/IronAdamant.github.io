# Iron Adamant

Personal site for **Aron Amos** (Iron Adamant): custom software, practical AI tooling, open-source tools, products, and a plain-language offer for small-business owners.

**Live:** [ironadamant.com](https://ironadamant.com)

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Home — services, owner door, selected work, products, about |
| `work.html` | Portfolio (OSS + products) with filters |
| `small-business.html` | Owner offer — one loop on rails, then handover |
| `contact.html` | Contact form (Formspree) |
| `projects.html` / `apps.html` | Redirect stubs → Work |

## Local development

```bash
python -m http.server 8000
# open http://localhost:8000
```

Before committing asset or content changes:

```bash
node build.js          # patch version + rebuild
node build.js minor    # minor bump
node build.js --css-only
```

`build.js` concatenates CSS → `css/bundle.css`, injects critical CSS / header / footer, renders work cards from `data/work.json`, and cache-busts asset URLs.

## Stack

- Static HTML/CSS/JS (no framework, no npm runtime deps)
- Modular CSS sources; single `bundle.css` for browsers
- Slim service worker for offline shell
- GitHub Actions → GitHub Pages (allowlisted deploy)

## Content

Edit **`data/work.json`** then run `node build.js`. Featured homepage cards use `featuredIds`.

## Design

Dark professional theme: system fonts, restrained teal accent, no circuit/neon decoration.
