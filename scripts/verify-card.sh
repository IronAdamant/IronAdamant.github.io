#!/usr/bin/env bash
# Structural + optional HTTP checks for the /card digital business-card page.
# Drives the real shipped files (card/index.html, deploy allowlist, QR asset).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CARD="$ROOT/card/index.html"
VCF="$ROOT/card/aron-amos.vcf"
DEPLOY="$ROOT/.github/workflows/deploy.yml"
QR="$ROOT/images/card-home-qr.svg"
PRINT_QR="$ROOT/images/card-page-qr.svg"
OG="$ROOT/images/card-og.png"
HOME_URL="https://ironadamant.com/"
CARD_URL="https://ironadamant.com/card/"
MAILTO="mailto:aron.amos@ironadamant.com"
EMAIL="aron.amos@ironadamant.com"
FAIL=0

ok() { echo "OK  $*"; }
bad() { echo "FAIL $*" >&2; FAIL=1; }

echo "=== card structure (shipped artifacts) ==="

if [[ -f "$CARD" ]]; then
  ok "card/index.html exists (serves /card/ on GitHub Pages)"
else
  bad "missing $CARD"
fi

if [[ -f "$VCF" ]]; then
  ok "vCard exists: card/aron-amos.vcf"
  grep -q "$EMAIL" "$VCF" && ok "vCard includes email" || bad "vCard missing email"
  grep -q 'BEGIN:VCARD' "$VCF" && ok "vCard has BEGIN:VCARD" || bad "vCard malformed"
else
  bad "missing vCard $VCF"
fi

if [[ -f "$QR" ]]; then
  ok "home QR asset exists: images/card-home-qr.svg"
else
  bad "missing QR asset $QR"
fi

if [[ -f "$PRINT_QR" ]]; then
  ok "print/card-page QR asset exists: images/card-page-qr.svg"
else
  bad "missing print QR asset $PRINT_QR"
fi

if [[ -f "$OG" ]]; then
  ok "OG share image exists: images/card-og.png"
else
  bad "missing OG image $OG"
fi

if grep -q 'card' "$DEPLOY" && grep -q 'cp -r card' "$DEPLOY"; then
  ok "deploy allowlist copies card/ directory"
else
  bad "deploy.yml does not copy card/ into deploy artifact"
fi

if [[ -f "$CARD" ]]; then
  grep -q "$MAILTO" "$CARD" && ok "mailto link present" || bad "missing $MAILTO"
  grep -q "$HOME_URL" "$CARD" && ok "home URL present in page" || bad "missing home URL $HOME_URL"
  grep -q 'data-qr-payload="https://ironadamant.com/"' "$CARD" && ok "data-qr-payload documents home URL" || bad "missing data-qr-payload"
  grep -q 'data-print-qr-payload="https://ironadamant.com/card/"' "$CARD" && ok "print QR payload documented" || bad "missing print QR payload docs"
  grep -q 'card-home-qr.svg' "$CARD" && ok "QR img references card-home-qr.svg" || bad "QR img missing"
  grep -q 'aron-amos.vcf' "$CARD" && ok "Add contact links to vCard" || bad "missing vCard download link"
  grep -q 'copy-email' "$CARD" && ok "Copy email control present" || bad "missing copy-email"
  grep -q 'h-card' "$CARD" && ok "h-card microformat present" || bad "missing h-card"
  grep -q 'application/ld+json' "$CARD" && ok "JSON-LD Person present" || bad "missing JSON-LD"
  # Standalone: no main site nav injection / no site-header
  if grep -q 'site-header\|nav-desktop\|INJECT_HEADER\|mobile-nav' "$CARD"; then
    bad "card page unexpectedly includes main site nav chrome"
  else
    ok "no main site nav chrome on card page"
  fi
fi

# Nav orphan: primary partials must not require a Card link
HEADER="$ROOT/partials/header.html"
if [[ -f "$HEADER" ]]; then
  if grep -qi 'card' "$HEADER"; then
    bad "header partial unexpectedly links to card (orphan page preferred)"
  else
    ok "header partial has no Card nav item (orphan OK)"
  fi
fi

echo
echo "=== optional HTTP check ==="
if [[ "${VERIFY_CARD_HTTP:-}" == "1" ]]; then
  BASE="${VERIFY_CARD_BASE:-http://127.0.0.1:8765}"
  body_file="$(mktemp "${TMPDIR:-/tmp}/verify-card-body.XXXXXX")"
  for i in 1 2; do
    code=$(curl -sS -o "$body_file" -w '%{http_code}' "$BASE/card/" || echo "000")
    if [[ "$code" == "200" ]]; then
      ok "HTTP $code for /card/ (attempt $i)"
      grep -q "$MAILTO" "$body_file" && ok "response has mailto (attempt $i)" || bad "response missing mailto (attempt $i)"
      grep -q "$HOME_URL" "$body_file" && ok "response has home URL (attempt $i)" || bad "response missing home (attempt $i)"
      grep -q 'card-home-qr' "$body_file" && ok "response has QR markup (attempt $i)" || bad "response missing QR (attempt $i)"
    else
      bad "HTTP $code for /card/ (attempt $i) — is the static server up?"
    fi
  done
  rm -f "$body_file"
else
  echo "(skip HTTP; set VERIFY_CARD_HTTP=1 and VERIFY_CARD_BASE=... to enable)"
fi

echo
if [[ "$FAIL" -ne 0 ]]; then
  echo "verify-card: FAILED"
  exit 1
fi
echo "verify-card: PASSED"
exit 0
