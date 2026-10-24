# Iron Adamant

Personal site for Aron Amos (Iron Adamant), from Western Sydney, NSW.

Three services.

Web app testing. The parts of an app that customers touch.

Accessibility checks. Automated checks against WCAG 2.2 AA plus a manual pass.

An AI-assisted security review of a system you own. It isn't penetration testing. Not taking bookings yet.

The tools on the Work page are proof I can build. The testing service is new.

A written scope first, then a fixed price for that engagement, agreed before work starts.

**Live:** [ironadamant.com](https://ironadamant.com)

## Pages

| Page | Purpose |
|------|---------|
| `index.html` | Home: services, how an engagement works, selected work, about |
| `work.html` | Tools and products, with filters. Includes Auspex and Chisel. |
| `case-study.html` | Case study: DOER |
| `contact.html` | Contact form (Formspree) |
| `projects.html` / `apps.html` | Redirect stubs to Work |
| `small-business.html` | Redirect stub to the homepage. Not in the sitemap. |
| `card/` | Digital business card (`noindex`, not in the nav) |

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
bash scripts/copy-gates.sh
bash scripts/verify-card.sh
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

Dark theme. System fonts, teal accent, no circuit or neon decoration. Short sentences. No invented history, and no price figure until one is confirmed.
