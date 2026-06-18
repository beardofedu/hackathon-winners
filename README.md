# 🏆 Hackathon Winners: A Copilot Training

> A tongue-in-cheek slide deck on how to use GitHub Copilot to win your company hackathon.

Live at: **[beardofedu.github.io/hackathon-winners](https://beardofedu.github.io/hackathon-winners/)**

## What's covered

The deck walks through every place you can use GitHub Copilot, with a focus on practical hackathon tactics:

| Section | What you'll learn |
|---|---|
| 🌐 **GitHub UI** | Copilot Chat on GitHub.com, the Coding Agent, Workspace |
| 💻 **The IDE** | Completions, Chat participants, `/new` scaffolding, Agent Mode |
| ⌨️ **GitHub Copilot CLI** | `/plan`, `/delegate`, `/fleet`, infinite sessions, multi-repo |
| 🖥️ **Copilot App** | The desktop agent experience, "My Work", Agent Merge |
| 🤖 **Custom Agents & Skills** | `.github/agents/`, `gh skill install`, community skills |
| 🚀 **Hackathon Strategy** | Timeline, prompting techniques, custom instructions |

## Tech stack

Single `index.html` — [reveal.js](https://revealjs.com/) 5.1.0 via CDN. No build step, no dependencies to install.

## Running locally

```bash
# Any static file server works
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Slide navigation

| Key | Action |
|---|---|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `F` | Fullscreen |
| `S` | Speaker notes |
| `Esc` | Slide overview |

## Contributing

Spotted something outdated or have a great hackathon tip to add? PRs welcome. Assign it to `@copilot` for extra irony points.
