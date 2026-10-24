#!/usr/bin/env bash
# Copy gates for ironadamant.com. Run from the repo root. Exits 1 on any hit.
# Globs cover partials, SVG, CSS, and JS. The dollar check matches "$" plus a number.
# CLAUDE.md is left out on purpose: it lists the banned words.
shopt -s nullglob
COPY=(
  index.html work.html case-study.html contact.html 404.html small-business.html projects.html apps.html
  card/index.html card/aron-amos.vcf
  data/work.json manifest.json
  partials/*.html images/*.svg
)
TEXT=("${COPY[@]}" build.js sw.js css/*.css js/*.js)
fail=0
hit() { echo "FAIL: $1"; fail=1; }

rg -n -i -w 'secure|securely|secured|insecure|compliant|compliance|certified|certification|guarantee|guaranteed|guarantees|pentest|pen-test|pen test|red-team|red team|attacker|attackers|adversarial|exploit|hacker|hacking|authorisation|authorization|audit|audited|auditing' "${COPY[@]}" && hit "banned or pentest word"
rg -n -i 'penetration' "${COPY[@]}" | rg -v "It isn['’]t penetration testing." && hit "'penetration' outside the required sentence"
rg -q "It isn['’]t penetration testing." index.html || hit "required sentence missing from index.html"
rg -n -P '[\x{2013}\x{2014}]' "${TEXT[@]}" && hit "em or en dash"
rg -n 'WCAG' "${COPY[@]}" | rg -v 'automated checks against WCAG 2.2 AA plus a manual pass' && hit "WCAG outside the exact phrase"
rg -n '\$ ?[0-9]' "${COPY[@]}" && hit "dollar figure"
rg -n -i 'tel:|"telephone"|\+61|deaf|hearing|clients?\b|client work|testimonial|trusted by|years of|track record|business days' "${COPY[@]}" && hit "phone, hearing line, history claim or reply-time promise"
# Approved DOER case study only: the heading "Case study: DOER", and the nav label "Case study".
if rg -n -i 'case stud' "${COPY[@]}" | rg -v 'Case study: DOER' | rg -v '>Case study</a>'; then
  hit "case study outside the approved DOER heading or nav label"
fi

[ "$fail" = 0 ] && echo "copy gates passed"
exit "$fail"
