# Copilot Instructions — hackathon-winners

This repository is a single-page reveal.js slide deck teaching developers how to use GitHub Copilot to win a company hackathon. The tone is **tongue-in-cheek and humorous** while keeping the technical content accurate.

## Project structure

```
index.html          # The entire presentation — all slides, CSS, and JS in one file
README.md
.github/
  copilot-instructions.md
  agents/
  skills/
```

There is **no build step**. The deck runs directly from `index.html` using reveal.js 5.1.0 loaded via CDN (jsdelivr).

## Slide framework

- **Library:** reveal.js 5.1.0 (`https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/`)
- **Theme:** `night`
- **Dimensions:** `width: 1280, height: 720, margin: 0.04`
- **Critical CSS override:** `.reveal { font-size: 26px }` — the night theme defaults to 40px which causes overflow. Everything is sized in `em` so this one override scales the whole deck.
- **Slide sections** use `data-background-color="#0d1117"` for content slides and `data-background-gradient` for section title slides.

## CSS class conventions

| Class | Purpose |
|---|---|
| `.slide-header` | Wraps `<h2>` at top of each content slide |
| `.card` | White-bordered info box, used inside grids |
| `.tip-box` | Yellow/amber highlighted box for hackathon tips |
| `.copilot-box` | Purple/blue highlighted box for Copilot-specific callouts |
| `.grid-2` | Two-column CSS grid |
| `.grid-3` | Three-column CSS grid |
| `.grid-4` | Four-column CSS grid (cheat sheet) |
| `.tag` | Small inline pill/badge (e.g., feature tags on IDE cards) |
| `.spaced` | Adds `margin-bottom: 0.4em` between list items |
| `.muted` | Dimmed text for subtitles and asides |
| `.emoji-big` | Large centered emoji for section title slides |
| `.center-slide` | Full-height centered layout for section title slides |

## Section structure

Each major topic follows this pattern:
1. **Section title slide** — `center-slide` class, gradient background, big emoji, Bob's Burgers GIF on the right
2. **2–4 content slides** — `data-background-color="#0d1117"`, `.slide-header`, content in grid layout

Current sections (in order): Title → Agenda → GitHub UI (title + 3 slides) → IDE (title + 4 slides) → CLI (title + 3 slides) → Copilot App (title + 2 slides) → Custom Agents & Agent Skills (title + 2 slides) → Hackathon Strategy (3 slides) → Cheat Sheet → Closing

## Tone guidelines

- **Accurate but fun** — every technical claim must be correct and verifiable against official GitHub docs
- Hackathon tips should feel like advice from a friend who has done this before, not a corporate manual
- Light self-deprecating humor about common developer situations (forgetting git commands, caffeine dependency, etc.)
- Bob's Burgers character GIFs on section title slides (sourced from Tenor — see below)

## GIF sourcing

Use Tenor for GIFs. Giphy embed pages are JS-rendered and unreliable for direct `<img src>` tags.

Tenor public search API: `https://g.tenor.com/v1/search?q=QUERY&key=LIVDSRZULELA&limit=5`

Always verify a GIF URL resolves by checking the `media.tenor.com/...` URL directly before adding it.

## Content accuracy

Before adding or updating content about a GitHub Copilot feature, verify it against official docs:
- GitHub Copilot docs: `https://docs.github.com/en/copilot`
- Copilot Chat in IDEs: `https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/chat-with-copilot/get-started-with-chat-in-your-ide`
- Copilot CLI best practices: `https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices`
- Custom agents: `https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-custom-agents`
- Agent skills: `https://docs.github.com/en/copilot/concepts/agents/about-agent-skills`
