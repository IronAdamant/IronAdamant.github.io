# CLAUDE.md

Guidance for AI assistants working in this repository.

## What This Is

Personal site (ironadamant.com). Vanilla HTML/CSS/JS, no framework, no package.json, no tests. Deployed to GitHub Pages via GitHub Actions on push to `main` (allowlisted files only).

**Positioning:** The public offer is independent web app testing, accessibility checks, and an AI-assisted security review of a system the visitor owns. The Work page is proof of building, not a list of clients. Plain language. No neon or circuit decoration.

**Offer rules (keep this block):**

Offer: web app testing; accessibility as "automated checks against WCAG 2.2 AA plus a manual pass" (checks, never compliance); AI-assisted security review of systems the client owns, always with "It isn't penetration testing." Never: secure, compliant, compliance, certified, guaranteed, penetration testing (except that one sentence), pentest, red-team, attacker, audit, authorisation. No em or en dashes anywhere. Only systems the client owns, only with their written go-ahead, never third-party providers. No invented clients, testimonials, metrics, history or reply-time promises. The approved DOER case study on case-study.html is the only exception. Do not add any other client, testimonial, or case study. Tools are "proof I can build". Western Sydney, NSW or Australia only. No phone. No hearing-impairment line on the site. No dollar figures until Aron confirms one. Pricing line: "a written scope first, then a fixed price for that engagement, agreed before work starts". Voice: plain, short sentences, contractions, no hype. "web app" with no hyphen. AI stays out of the title and H1.

The security review says "Not taking bookings yet." Leave that sentence in place. Do not name which AI tools are used or what they see. Do not add "or a security review" on the contact intro while bookings are closed. Do not add the Formspree privacy note until Aron confirms both promises are true: reply-only use, and delete on request. Do not add an ABN line until the business-name registration is confirmed for the footer. Keep the Interpres description neutral. Do not add a hearing line.

`bash scripts/copy-gates.sh` checks public copy. It does not scan this file, because this file lists the banned words. Do not add this file to that script, and do not delete rules from this file to make the script pass.

## Commands

```bash
python -m http.server 8000   # local static server

node build.js                # patch version + full rebuild
node build.js minor          # minor bump + rebuild
node build.js major          # major bump + rebuild
node build.js 1.2.3          # set explicit version
node build.js --css-only     # full rebuild, no manifest version bump

bash scripts/copy-gates.sh   # public-copy gates
bash scripts/verify-card.sh  # card page
```

No lint or test tooling.

## Build Pipeline (`build.js`)

1. Concatenates `css/base.css` + `layout.css` + `components.css` + `accessibility.css` into **`css/bundle.css`** (what pages load).
2. Injects `css/critical.css` at `<!-- CRITICAL_CSS -->` (page-specific blocks via `/* page:filename.html */`).
3. Injects `partials/header.html` / `partials/footer.html` between `INJECT_*` / `END_INJECT_*` markers; marks active nav.
4. Renders work cards from **`data/work.json`** into featured / work list / products markers.
5. Bumps `manifest.json` version + timestamp (skipped by `--css-only`). The manifest description is set in this script and overwrites `manifest.json` on a full build.
6. Content-hash cache busting on every build: `?v=<hash>` on local CSS/JS, and `CACHE_VERSION` in `sw.js` = version + hash of the precached assets (the SW serves them cache-first, so this must change whenever they do).
7. Writes `sitemap.xml`; `lastmod` is each page's last git commit date (today if uncommitted). The live Auspex URL is included with a fixed lastmod because that page is not a file in this repo.

A rebuild with no source edits produces no diff. The deploy workflow relies on this: it runs `node build.js --css-only` and fails if anything changes.

**Edit sources, not generated regions:** never hand-edit injected header/footer/work blocks or the inlined critical `<style>`. Change partials, `critical.css`, or `data/work.json` and re-run the build.

## Architecture

### Pages
- `index.html`: hero, three services, how it works, guardrail, featured tools as proof, products, about. Title and H1 do not contain "AI". JSON-LD stays Person, with no telephone.
- `work.html`: full portfolio plus category filters (`js/work-filters.js`), including a Testing filter. Auspex and Chisel are the testing tools. A link points to the DOER case study.
- `case-study.html`: approved DOER case study. In the nav. Use the approved copy only.
- `contact.html`: Formspree form (`js/contact-form.js`). Same ownership guardrail as the homepage. No reply-time promise.
- `projects.html` / `apps.html`: SEO redirect stubs to `work.html`.
- `small-business.html`: noindex redirect stub to the homepage. Kept for old links. Not in the nav or the sitemap.
- `404.html`: root-absolute assets (GitHub Pages catch-all). Nav and footer are hardcoded, not injected. Home, Work, Contact only.
- `card/index.html`: digital business card (`noindex`). Standalone, no site nav. `build.js` does not process it. Update `card/aron-amos.vcf` with the same note, and do not add a TEL line.
- Auspex lives at `https://ironadamant.com/auspex/` and is not generated by this repo. Do not add an `auspex/` directory here. Link it from Work and keep the fixed-date sitemap entry.

There is no privacy page and no terms page. Do not add either until a lawyer has reviewed the text.

### Work content
- Single source: `data/work.json` (`type`: `oss` | `product` | `app`, `category`, `featuredIds` on root). `app` is a browser web app, not open source and not a commercial product.
- HTML is **static after build** (crawlable without JS).

### CSS
- Sources: `base`, `layout`, `components`, `accessibility`, `critical`.
- Browser loads **`css/bundle.css` only** (plus critical inline).
- Do not reintroduce `@import` waterfalls for production pages.

### JS
- `navigation.js`: mobile nav and focus trap
- `work-filters.js`: filter `.work-item[data-category]`
- `image-modal.js`: native `<dialog>` lightbox
- `contact-form.js`: validation and Formspree
- `main.js`: init orchestration
- `sw-register.js` + `sw.js`: slim PWA shell

### Icons
Self-hosted sprite `images/icons.svg`. Markup:
`<svg class="icon" aria-hidden="true"><use href="/images/icons.svg#github"/></svg>`

### Nav
Home | Work | Case study | Contact, via `partials/header.html` (desktop and mobile). `404.html` is hardcoded with root-absolute hrefs. The card page stays out of the nav.

## Deploy

`.github/workflows/deploy.yml` copies an **allowlist** (HTML shell, `card/`, `css/`, `js/`, `images/`, `sw.js`, manifest, CNAME, robots, sitemap). Do not rely on a denylist for secrets or tooling. A new HTML page must be registered in the file itself, `PRIMARY_HTML`, `navKeyFor` if it is in the nav, the sitemap list, `PRECACHE` in `sw.js`, and the deploy allowlist. A file missing from the allowlist is silently skipped.

## Repo hygiene

Local AI tooling (`trammel.db`, `.stele*`, `.chisel/`, `wiki-local/`, and similar) must never be committed. `CNAME`, `robots.txt`, and `sitemap.xml` are deployment-critical.
