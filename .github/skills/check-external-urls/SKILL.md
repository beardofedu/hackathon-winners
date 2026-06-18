---
name: check-external-urls
description: >
  Checks that all external URLs in index.html are still live and returning valid responses.
  Use this when maintaining the slide deck to catch broken CDN links, dead GIFs, or outdated docs URLs.
---

## Purpose

This skill audits every external URL referenced in `index.html` and reports any that return errors or redirect unexpectedly. The slide deck depends on several external resources:

- **reveal.js CDN** (jsdelivr) — if this breaks, the entire deck stops working
- **Tenor GIF URLs** — GIFs get removed over time; dead images break the visual layout
- **Docs and feature page links** — used in speaker notes and the cheat sheet

## How to use this skill

When asked to check or validate external URLs in this repository:

1. Read `index.html` and extract every URL that starts with `http://` or `https://`
2. Group the URLs by type:
   - CDN resources (jsdelivr.net, cdnjs.cloudflare.com)
   - GIF media (media.tenor.com, media.giphy.com)
   - Documentation links (docs.github.com)
   - Feature/marketing pages (github.com/features/...)
3. For each URL, make an HTTP HEAD request (or GET if HEAD is not supported) and record the HTTP status code
4. Report the results grouped by status:
   - ✅ **OK** (200–299): working fine
   - ⚠️ **Redirect** (301/302): note the destination — may still work in browser but worth reviewing
   - ❌ **Error** (4xx/5xx): broken — needs replacement
   - ⏱️ **Timeout**: unreachable — recheck before flagging as broken
5. For any broken GIF URLs, suggest a replacement by searching Tenor:
   `https://g.tenor.com/v1/search?q=bobs+burgers&key=LIVDSRZULELA&limit=5`
6. For any broken CDN links, check the latest reveal.js version at `https://cdn.jsdelivr.net/npm/reveal.js/` and suggest an updated URL

## What to fix

- If a Tenor GIF is broken, find a replacement Bob's Burgers GIF and update the `src` attribute in `index.html`
- If the reveal.js CDN URLs are broken, update all four CDN references (reveal.js core, theme CSS, highlight CSS, highlight plugin JS) to the latest stable version
- If a docs link is broken, search `https://docs.github.com/en/copilot` for the updated URL

## Output format

Provide a summary table like this:

| URL | Type | Status | Action needed |
|-----|------|--------|---------------|
| https://cdn.jsdelivr.net/... | CDN | ✅ 200 | None |
| https://media.tenor.com/... | GIF | ❌ 404 | Replace — suggested URL: ... |
| https://docs.github.com/... | Docs | ⚠️ 301 | Review redirect destination |
