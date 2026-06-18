---
name: add-slide-section
description: >
  Guides Copilot through adding a complete new topic section to the hackathon-winners slide deck.
  Use when asked to add a new Copilot feature, topic, or section to index.html.
---

## Purpose

This skill provides step-by-step instructions for adding a well-structured, accurately-researched, on-brand new section to the `index.html` reveal.js slide deck.

## Process for adding a new section

### Step 1 — Research the topic

Before writing any HTML, fetch the official GitHub docs for the feature:

1. Search `https://docs.github.com/en/copilot` for the relevant page
2. Read and extract:
   - Key commands, keyboard shortcuts, or UI elements
   - Feature availability (which IDEs, which plans, GA vs preview)
   - Common use cases
3. Note any features that are **not** yet in the existing deck — these become the content

### Step 2 — Find a Bob's Burgers GIF for the section title slide

Every section title slide needs a Bob's Burgers character GIF. Pick a character whose energy fits the topic:

- **Tina** — steady, reliable features (completions, inline suggestions)
- **Bob** — serious, focused, getting work done
- **Louise** — clever hacks, power features, things that feel a little dangerous
- **Gene** — creative, expressive, the "wow" features
- **Linda** — enthusiastic, motivating, strategy/tips content

Search Tenor for a GIF:
```
https://g.tenor.com/v1/search?q=bobs+burgers+KEYWORD&key=LIVDSRZULELA&limit=5
```

Extract a direct URL from `results[N].media[0].gif.url` in the JSON response. Verify the URL loads before using it.

### Step 3 — Plan the slide structure

A new section needs:
1. One **section title slide** (gradient background, center layout, emoji + GIF)
2. Two to three **content slides** (dark background, grid layout, cards)
3. Optional: one entry in the **cheat sheet** (the final `grid-4` slide)

Keep each content slide to the equivalent of one printed page — if it feels cramped, split it into two slides.

### Step 4 — Write the HTML

Insert the new section just before the `<!-- SECTION: Strategy -->` comment (or at the end of the existing sections, before the cheat sheet).

**Section title slide template:**
```html
<!-- ============================================================ SECTION: TOPIC_NAME -->
<section class="center-slide" data-background-gradient="linear-gradient(135deg, #0d1117 0%, #1a1a2e 100%)">
  <div style="display:flex; align-items:center; justify-content:center; gap:2.5em;">
    <div>
      <div class="emoji-big">EMOJI</div>
      <h1>The <span style="color:var(--accent)">Topic</span></h1>
      <h3 style="font-size:1.3em">Short Compelling Subtitle</h3>
      <p class="muted">Witty one-liner. No more than one sentence.</p>
    </div>
    <img src="TENOR_GIF_URL"
         style="height:200px; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.5);"
         alt="Bob's Burgers character description">
  </div>
</section>
```

**Content slide template:**
```html
<section data-background-color="#0d1117">
  <div class="slide-header">
    <h2>EMOJI Topic — Specific Aspect</h2>
  </div>
  <p style="font-size:0.82em;">One sentence that frames what this slide covers.</p>

  <div class="grid-2">
    <div>
      <h3>Left Column Heading</h3>
      <ul class="spaced">
        <li>Point one</li>
        <li>Point two with <code>inline code</code></li>
        <li>Point three with <strong>emphasis</strong></li>
      </ul>
    </div>
    <div>
      <h3>Right Column Heading</h3>
      <div class="card">
        <h4>Card Title</h4>
        <p>Card content.</p>
      </div>
    </div>
  </div>

  <div class="tip-box" style="margin-top:0.5em;">
    <strong>Hackathon tip:</strong> Specific, actionable, slightly irreverent advice.
  </div>
</section>
```

### Step 5 — Update the agenda slide

The agenda slide lists all major sections. Add the new section's emoji and name to the `<ul>` in the agenda slide (the second slide after the title).

### Step 6 — Update the cheat sheet

The cheat sheet is the penultimate slide — a `grid-4` layout with one column per major tool area. If the new section warrants it, either:
- Add a fifth column (change `grid-4` to `grid-5` and add the CSS if needed), or
- Add the top 3–4 commands/tips to the most relevant existing column

### Step 7 — Verify

After inserting the HTML:
1. Confirm the slide count increased by the expected number
2. Check that all new `<code>` blocks have matching closing tags
3. Verify the Tenor GIF URL is accessible
4. Confirm the new section appears in the agenda slide
