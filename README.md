# Iron_Adamant Portfolio

Personal portfolio website showcasing software development projects and tools.

## Quick Start

1. Clone the repository
2. Open `index.html` in a browser
3. For local development, use a simple server: `python -m http.server 8000`

## Deployment

The site uses GitHub Actions to deploy to GitHub Pages. The workflow excludes documentation files (`.md`, `wiki-local/`) from the live site.

**To enable:**
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to `main` branch to trigger deployment

## Structure

| File/Folder | Purpose |
|-------------|---------|
| `index.html` | Homepage with hero and featured projects |
| `projects.html` | Projects gallery with filtering |
| `contact.html` | Contact form (Formspree backend) |
| `404.html` | Custom error page |
| `css/` | Stylesheets (styles.css, mobile-nav.css, etc.) |
| `js/` | JavaScript (combined.js, project-data.js) |
| `images/` | Project screenshots and assets |

## Important: Cache Busting

Before committing changes, run:
```bash
node update-version.js
```

This updates the version timestamp in `manifest.json` to ensure users see the latest changes.

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Service Worker (PWA with offline support)
- Formspree (contact form)
- GitHub Actions (deployment)
