#!/usr/bin/env bash
# Copy gates for ironadamant.com. Run from the repo root. Exits 1 on any hit.
# Globs cover partials, SVG, CSS, and JS. The dollar check allows only the approved package prices.
# CLAUDE.md is left out on purpose: it lists the banned words.
shopt -s nullglob
COPY=(
  index.html work.html case-studies.html case-study.html atlas-workshop.html contact.html checklist.html sample-report.html privacy.html llms.txt 404.html small-business.html projects.html apps.html
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
# Only the approved package prices may appear: US$165, US$330, US$650.
rg -n -o -P '(US)?\$ ?[0-9]+(?:[.,][0-9]+)*' "${COPY[@]}" | rg -v ':US\$(165|330|650)$' && hit "dollar figure other than the approved prices"
rg -n -i 'tel:|"telephone"|\+61|deaf|hearing|clients?\b|client work|testimonial|trusted by|years of|track record|business days' "${COPY[@]}" \
  | rg -v 'Example report: illustrative format, not a real client' \
  && hit "phone, hearing line, history claim or reply-time promise"
# Approved wording only: "Case study: DOER", "Read the case study", and "Case studies" as the list title, nav label, and footer label.
if rg -n -i 'case stud' "${COPY[@]}" \
  | rg -v 'Case study: DOER' \
  | rg -v 'Read the case study' \
  | rg -v '>Case studies</a>' \
  | rg -v '>Case studies</h1>' \
  | rg -v '>Case studies</h2>' \
  | rg -v 'Case studies \| Iron Adamant' \
  | rg -v '^llms\.txt:.*[Cc]ase stud'; then
  hit "case study wording outside the approved titles, nav label, or read link"
fi

[ "$fail" = 0 ] && echo "copy gates passed"
exit "$fail"
