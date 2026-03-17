#!/usr/bin/env node

/**
 * Build script for IronAdamant Portfolio
 * Replaces update-version.js — unified CSS injection + version management.
 *
 * Usage:
 *   node build.js              # patch bump + full rebuild
 *   node build.js minor        # minor bump + rebuild
 *   node build.js major        # major bump + rebuild
 *   node build.js --css-only   # inject CSS only, no version bump
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const CRITICAL_CSS_PATH = path.join(ROOT, 'css', 'critical.css');
const MANIFEST_PATH = path.join(ROOT, 'manifest.json');
const SW_PATH = path.join(ROOT, 'sw.js');
const HTML_FILES = ['index.html', 'projects.html', 'apps.html', 'contact.html'];
const MARKER = '<!-- CRITICAL_CSS -->';

// ── Parse args ──────────────────────────────────────────────
const arg = process.argv[2] || 'patch';
const cssOnly = arg === '--css-only';

// ── Read & parse critical.css ───────────────────────────────
const rawCSS = fs.readFileSync(CRITICAL_CSS_PATH, 'utf8');

// Split into shared rules and page-specific blocks
const PAGE_MARKER_RE = /\/\*\s*page:(\S+)\s*\*\//g;
const sections = rawCSS.split(PAGE_MARKER_RE);
// sections[0] = shared CSS, then [filename, css, filename, css, ...]

const sharedCSS = sections[0].trim();
const pageCSS = {};
for (let i = 1; i < sections.length; i += 2) {
  const filename = sections[i].trim();
  const css = sections[i + 1].trim();
  pageCSS[filename] = css;
}

function buildStyleBlock(htmlFile) {
  let css = sharedCSS;
  if (pageCSS[htmlFile]) {
    css += '\n\n' + pageCSS[htmlFile];
  }
  // Indent each line by 8 spaces for HTML formatting
  const indented = css.replace(/^(.)/gm, '        $1');
  return `<style>\n${indented}\n    </style>`;
}

// ── Inject critical CSS into HTML files ─────────────────────
for (const file of HTML_FILES) {
  const filePath = path.join(ROOT, file);
  let html = fs.readFileSync(filePath, 'utf8');

  if (!html.includes(MARKER)) {
    console.error(`ERROR: ${file} is missing the ${MARKER} marker`);
    process.exit(1);
  }

  // Replace marker + any previously injected style block
  const escapedMarker = MARKER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const injectRE = new RegExp(escapedMarker + '(\\s*<style>[\\s\\S]*?<\\/style>)?');
  const styleBlock = buildStyleBlock(file);
  html = html.replace(injectRE, MARKER + '\n    ' + styleBlock);

  fs.writeFileSync(filePath, html);
  console.log(`✅ Injected critical CSS → ${file}`);
}

if (cssOnly) {
  console.log('\n--css-only: skipping version bump.');
  process.exit(0);
}

// ── Version bump ────────────────────────────────────────────
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const currentVersion = manifest.version || '1.0.0';
const parts = currentVersion.split('.').map(Number);
let newVersion;

if (arg.match(/^\d+\.\d+\.\d+$/)) {
  newVersion = arg;
} else {
  switch (arg.toLowerCase()) {
    case 'major':
      newVersion = `${parts[0] + 1}.0.0`;
      break;
    case 'minor':
      newVersion = `${parts[0]}.${parts[1] + 1}.0`;
      break;
    case 'patch':
    default:
      newVersion = `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
      break;
  }
}

const buildTimestamp = new Date().toISOString();
manifest.version = newVersion;
manifest.build_timestamp = buildTimestamp;
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n📦 Version: ${currentVersion} → ${newVersion}`);

// ── Update sw.js CACHE_VERSION ──────────────────────────────
let swContent = fs.readFileSync(SW_PATH, 'utf8');
swContent = swContent.replace(
  /const CACHE_VERSION = '[^']+';/,
  `const CACHE_VERSION = 'v${newVersion}';`
);
fs.writeFileSync(SW_PATH, swContent);
console.log(`🔧 sw.js CACHE_VERSION → v${newVersion}`);

// ── Update ?v= timestamps + build-version in HTML files ─────
const versionStamp = Date.now();
const allHTML = [...HTML_FILES, '404.html'];

for (const file of allHTML) {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) continue;
  let html = fs.readFileSync(filePath, 'utf8');

  // Update build-version meta tag
  html = html.replace(
    /<meta name="build-version" content="[^"]*">/,
    `<meta name="build-version" content="${buildTimestamp}">`
  );

  // Update ?v= on local CSS/JS refs only (skip http:// and https://)
  html = html.replace(
    /(<(?:link|script)[^>]+(?:href|src)=")(?!https?:\/\/)([^"]*\.(?:css|js))(\?v=[^"]*)?(")/g,
    `$1$2?v=${versionStamp}$4`
  );

  fs.writeFileSync(filePath, html);
  console.log(`✅ Updated versions in ${file}`);
}

console.log('\n🚀 Build complete!');
