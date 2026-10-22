# Iron Adamant

Personal site for **Aron Amos** (Iron Adamant): independent web-app QA, WCAG 2.2 AA checks, and security penetration testing. Shipped tools and products stay on the site as proof he can build.

**Live:** [ironadamant.com](https://ironadamant.com)

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Home: services, how an engagement works, selected work, products, about |
| `work.html` | Portfolio (open source, apps, products) with filters. Includes Auspex and Chisel. |
| `contact.html` | Contact form (Formspree) for testing and security enquiries |
| `privacy.html` | Draft privacy policy |
| `terms.html` | Draft terms for testing and security work |
| `projects.html` / `apps.html` | Redirect stubs to Work |
| `small-business.html` | Redirect stub to the homepage |
| `card/` | Digital business card (`noindex`, not in nav) |

Auspex also has a live page at [ironadamant.com/auspex/](https://ironadamant.com/auspex/). That page is not built from this repo. The Work page and the sitemap link to it.

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

`build.js` concatenates CSS into `css/bundle.css`, injects critical CSS, header, and footer, renders work cards from `data/work.json`, and cache-busts asset URLs by content hash. Deploys fail if the committed output does not match a fresh build.

## Stack

- Static HTML/CSS/JS (no framework, no npm runtime deps)
- Modular CSS sources; single `bundle.css` for browsers
- Slim service worker for offline shell
- GitHub Actions to GitHub Pages (allowlisted deploy)

## Content

Edit **`data/work.json`** then run `node build.js`. Featured homepage cards use `featuredIds`.

## Design

Dark professional theme: system fonts, restrained teal accent, no circuit or neon decoration. Plain language. No invented clients, prices, or certificates.
