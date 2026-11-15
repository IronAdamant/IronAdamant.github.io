# CLAUDE.md

Guidance for AI assistants working in this repository.

## What This Is

Personal site (ironadamant.com). Vanilla HTML/CSS/JS, no framework, no package.json, no tests. Deployed to GitHub Pages via GitHub Actions on push to `main` (allowlisted files only).

**Positioning:** The public offer is QA for websites and apps built with AI tools, with a free first look (one customer journey and the top 5 fixes). Accessibility checks stay as checks. Authorised security checks are not bookable yet. The Work page is proof of building, not a list of clients. Plain language. No neon or circuit decoration. No CTO or advisory angle.

**Offer rules (keep this block):**

Offer: QA for websites and apps built with AI tools; free first look is one customer journey and the top 5 fixes, with the hero line "If you built it with AI tools, I'll walk one customer journey and send you the top 5 fixes, free."; web app testing; accessibility as "automated checks against WCAG 2.2 AA plus a manual pass" (checks, never compliance); AI-assisted security checks of systems the client owns, always with "It isn't penetration testing." Never: secure, compliant, compliance, certified, guaranteed, penetration testing (except that one sentence), pentest, red-team, attacker, audit, authorisation. No em or en dashes anywhere. Only systems the client owns, only with their written go-ahead, never third-party providers. No invented clients, testimonials, metrics, history or reply-time promises. The example report is labelled "Example report: illustrative format, not a real client" and uses the made-up name Example App only. The approved DOER case study on case-study.html uses its approved copy only. The Visit DOER link points at https://itsadoerthing.com/aron-amos-172753/iron-adamant. atlas-workshop.html is approved public-site notes for Atlas Workshop, using only the heading and two paragraphs Rick Burgess agreed on 11 November 2026. It is not a testimonial. Do not add quotes, findings, results, prices, or wording that says the Atlas look was paid work. Do not describe that accessibility work as a VPAT, an ACR, or a compliance sign-off. case-studies.html lists both pieces with their existing titles and one-line summaries. The nav and footer say Case studies and link there. Do not add a third piece or a testimonial. Tools are "proof I can build". Do not name the game engine; say "my open-source game engine" if a name is required. Western Sydney, NSW or Australia only. No phone. No hearing-impairment line on the site. No dollar figures until Aron confirms one. Below the fold, paid testing is "Paid testing: written scope, fixed price agreed before work starts". Voice: plain, short sentences, contractions, no hype. "web app" with no hyphen. The homepage title and H1 stay free of the word AI. Copy is written for human readers. Do not add hidden text or hidden instructions.

Security checks use the sentence "Authorised security checks: bookings opening soon." Leave that sentence in place wherever security checks are offered. Do not say they are open for booking. Do not name which AI tools are used or what they see. Do not add "or a security review" on the contact intro while bookings are closed. privacy.html is the short note Aron set on 15 November 2026: forms go to Aron via Formspree, used only to reply, not sold or shared, deletion via aron.amos@ironadamant.com, analytics if enabled are cookie-free and aggregate. Do not expand it into a lawyer-reviewed policy. Do not add an ABN line until the business-name registration is confirmed for the footer. Keep the Interpres description neutral. Do not add a hearing line. The Cloudflare Web Analytics snippet in the footer stays commented out until a real site token is pasted in. Do not invent a token.

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
- `index.html`: hero, three services, how it works, guardrail, case studies (DOER and Atlas Workshop), featured tools as proof, products, about. Title and H1 do not contain "AI". JSON-LD stays Person, with no telephone.
- `work.html`: full portfolio plus category filters (`js/work-filters.js`), including a Testing filter. Auspex and Chisel are the testing tools. A note points to the DOER case study. A second note links to the Atlas Workshop public-site notes.
- `case-studies.html`: list of both pieces. Each card uses the existing title, the existing one-line summary, and a link to that page. In the nav.
- `case-study.html`: approved DOER case study. Kept at this URL. Use the approved copy only.
- `atlas-workshop.html`: approved Atlas Workshop public-site notes. Kept at this URL. Use the approved heading and two paragraphs only. No quote, no findings list, and no claim that fixes were implemented.
- `contact.html`: free first look form at `#free-first-look` (link and email only, hidden subject "Free first look", honeypot kept), then the full Formspree form for other enquiries (`js/contact-form.js`). Same ownership guardrail as the homepage. No reply-time promise.
- `checklist.html`: public checklist, Common holes in AI-built apps. In the nav. No email capture.
- `sample-report.html`: illustrative Example App report. Linked from the homepage and the contact page. Not in the nav.
- `privacy.html`: short privacy note. Footer link on every page. Not in the nav.
- `llms.txt`: factual summary of the same offer as the homepage, in the llmstxt.org shape.
- `projects.html` / `apps.html`: SEO redirect stubs to `work.html`.
- `small-business.html`: noindex redirect stub to the homepage. Kept for old links. Not in the nav or the sitemap.
- `404.html`: root-absolute assets (GitHub Pages catch-all). Nav and footer are hardcoded, not injected. Mirror the main nav, and include the privacy link in the footer.
- `card/index.html`: digital business card (`noindex`). Standalone, no site nav. `build.js` does not process it. Update `card/aron-amos.vcf` with the same note, and do not add a TEL line.
- Auspex lives at `https://ironadamant.com/auspex/` and is not generated by this repo. Do not add an `auspex/` directory here. Link it from Work and keep the fixed-date sitemap entry.

There is no terms page. Do not add one until a lawyer has reviewed the text. Do not expand privacy.html beyond the short note.

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
Home | Work | Case studies | Checklist | Contact, via `partials/header.html` (desktop and mobile). The Case studies item points at `case-studies.html`. `case-study.html` and `atlas-workshop.html` mark that nav item active. Checklist points at `checklist.html`. `404.html` is hardcoded with root-absolute hrefs. The card page stays out of the nav. Example report and Privacy are footer links, not nav items.

## Deploy

`.github/workflows/deploy.yml` copies an **allowlist** (HTML shell, `card/`, `css/`, `js/`, `images/`, `sw.js`, manifest, CNAME, robots, sitemap). Do not rely on a denylist for secrets or tooling. A new HTML page must be registered in the file itself, `PRIMARY_HTML`, `navKeyFor` if it is in the nav, the sitemap list, `PRECACHE` in `sw.js`, and the deploy allowlist. A file missing from the allowlist is silently skipped.

## Repo hygiene

Local AI tooling (`trammel.db`, `.stele*`, `.chisel/`, `wiki-local/`, and similar) must never be committed. `CNAME`, `robots.txt`, and `sitemap.xml` are deployment-critical.
