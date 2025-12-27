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
| `contact.html` | Contact form (Formspree backend) |
| `404.html` | Custom error page |
| `css/` | Modular stylesheets |
| `js/` | JavaScript modules |
| `images/` | Assets |

## CSS Architecture

Modular CSS structure (imported via `main.css`):

| Module | Purpose | LOC |
|--------|---------|-----|
| `base.css` | Variables, reset, typography | ~150 |
| `layout.css` | Header, nav, hero, footer | ~280 |
| `components.css` | Buttons, cards, forms, tags | ~470 |
| `animations.css` | Keyframes, transitions | ~180 |
| `patterns.css` | Background circuit patterns | ~280 |
| `responsive.css` | Media queries | ~130 |
| `main.css` | Entry point (imports all) | ~12 |

## JS Architecture

Modular JS structure (loaded via separate files):

| Module | Purpose | LOC |
|--------|---------|-----|
| `navigation.js` | Smooth scroll, filtering, mobile nav | ~130 |
| `contact-form.js` | Form validation, submission, spam protection | ~260 |
| `page-transitions.js` | Page loading transitions | ~170 |
| `image-modal.js` | Image expansion and lightbox | ~190 |
| `main.js` | Entry point (orchestrates all) | ~55 |

## Cache Busting

Before commits:
```bash
node update-version.js
```

Updates version in `manifest.json` for cache busting.

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Service Worker (PWA with offline support)
- Formspree (contact form)
- GitHub Actions (deployment)
