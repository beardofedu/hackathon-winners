# .github — Copilot Customization Files

This folder contains configuration files that customize how GitHub Copilot behaves in this repository.

---

## `copilot-instructions.md`

Repo-wide instructions that Copilot reads automatically on every interaction. Covers:

- Project structure and the single-file `index.html` approach
- reveal.js configuration (version, theme, dimensions, the critical font-size override)
- CSS class reference for every class used in the deck
- Section structure conventions (title slide → content slides)
- Tone guidelines (accurate but fun, hackathon-focused)
- GIF sourcing process via the Tenor API
- Official docs URLs to verify content accuracy against

---

## `agents/`

Custom agent profiles that define specialized versions of the Copilot agent.

### `agents/slide-author.md`

An agent specialized in adding and editing slides in this deck. Assign this agent to an issue when you want Copilot to:

- Add a new topic section following the established HTML structure and CSS conventions
- Update existing content against the latest official GitHub docs
- Source a Bob's Burgers GIF for a new section title slide
- Maintain the tongue-in-cheek tone while keeping technical content accurate

**To use:** Assign the `slide-author` agent to a GitHub Issue describing the change you want, or invoke it directly in the Copilot Chat panel.

---

## `skills/`

Agent skills are folders of instructions and resources that Copilot loads when relevant to improve its performance on specialized tasks. Each skill lives in its own subdirectory containing a `SKILL.md` file.

### `skills/check-external-urls/`

Audits all external URLs in `index.html` to catch broken links before they silently break the deck. Checks:

- **CDN resources** (reveal.js via jsdelivr) — if these break, the whole deck stops working
- **Tenor GIF URLs** — GIFs get removed over time; dead images leave blank spaces in section title slides
- **Docs and feature page links** — referenced in speaker notes and the cheat sheet

Reports results by status (✅ OK / ⚠️ Redirect / ❌ Error) and suggests replacement GIFs or updated CDN URLs where needed.

**When to use:** Run periodically, or before any public presentation of the deck.

### `skills/add-slide-section/`

Guides Copilot through the full workflow for adding a new topic section to the deck:

1. Research the feature against official GitHub docs
2. Find a Bob's Burgers GIF on Tenor that matches the section's energy
3. Write the section title slide and content slides using the correct HTML templates
4. Update the agenda slide and cheat sheet to include the new section
5. Verify the result

**When to use:** When adding coverage of a new Copilot feature or capability that isn't yet in the deck.
