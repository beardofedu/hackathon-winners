# Belcher Freight Co. — Demo App

A fake logistics shipment tracking dashboard built with React + Vite. Used to demonstrate GitHub Copilot's issue and PR workflows during the [hackathon-winners](https://beardofedu.github.io/hackathon-winners/) training.

## Running the app

```bash
cd demo
npm install
npm run dev
```

Then open `http://localhost:5173`.

## What's in the app

- **Stats bar** — live counts of shipments by status (In Transit, Delivered, Delayed, etc.)
- **Shipment table** — 20 fake shipments, sortable by any column, filterable by status, searchable
- **Detail panel** — click any row to see full shipment info and tracking event history
- **Known bug** — shipment BFC-100431 shows `undefined` in the status column (see Issue #2)

---

## Presenter walkthrough

This app is a prop for demonstrating GitHub Copilot live. Here's the suggested flow:

### Setup (before the session)

1. Start the app: `npm run dev`
2. Have the [repository issues page](https://github.com/beardofedu/hackathon-winners/issues) open in another tab
3. Have VS Code open to the `demo/` folder with Copilot enabled

---

### Demo 1 — Bug fix with @copilot (5 min)

**Show the bug:**
> "Here's our shipping dashboard. Everything looks great... except look at this row. BFC-100431, a cross-border shipment from Toronto. The status column says *undefined*. Classic."

1. Click on row BFC-100431 in the app to show it in the detail panel
2. Switch to the GitHub issues tab and open **Issue #2** ("Bug: Shipment status shows 'undefined'…")
3. Click **"Assign to Copilot"** from the assignee menu

**Watch it work:**
> "And now we wait about 45 seconds. Copilot is reading the issue, looking through the codebase, finding the bug, and writing a fix."

4. When the PR opens, click through to show the diff — it'll be a one-line fix in `StatusBadge.jsx`

**The reveal:**
> "One line. Missing dictionary entry. Would have taken us 20 minutes to find at hour 11 of a hackathon. Took Copilot 45 seconds."

---

### Demo 2 — Feature with Copilot CLI (8 min)

**Set the scene:**
> "Now let's add the CSV export. This is a real feature request. Our ops team needs to export shipment data every Friday. Let's use the Copilot CLI."

1. Open a terminal in the `demo/` directory
2. Run `copilot`
3. Type the prompt:

```
/plan Add a CSV export button to the shipment table toolbar. 
When clicked, it should download the currently visible shipments 
(after any filters) as a CSV file. Columns: Tracking #, Customer, 
Reference, Origin, Destination, Status, Carrier, Service, Weight, 
Est. Delivery. Filename: belcher-freight-export-YYYY-MM-DD.csv
```

4. Walk through the plan Copilot creates — show the `plan.md`
5. Approve the plan: type `Implement this plan`
6. Watch Copilot edit `ShipmentTable.jsx` and (optionally) `formatters.js`

**The reveal:**
> "I described a feature in plain English. Copilot planned it, checked the plan with me, then implemented it. No Stack Overflow. No StackBlur. Just... done."

---

### Demo 3 — IDE Agent Mode (5 min)

**Set the scene:**
> "Last one. The mobile layout is broken. Issue #6. Let's fix it in the IDE without leaving VS Code."

1. Open Copilot Chat in VS Code (Ctrl+Shift+I)
2. Type:

```
@workspace The shipment table breaks on mobile screens. Fix the responsive 
layout so it works on screens >= 375px wide. Hide lower-priority columns on 
small screens, stack the detail panel below the table, and make the stats bar 
wrap to a 2×3 grid. Use CSS media queries in App.css.
```

3. Switch to Agent Mode (the toggle in the chat panel)
4. Let it run — it'll read `App.css` and `ShipmentTable.jsx` and make the changes
5. Show the before/after using browser DevTools responsive mode

---

## The issues at a glance

| Issue | Type | Best for |
|-------|------|----------|
| [#2 — undefined status badge](https://github.com/beardofedu/hackathon-winners/issues/2) | Bug | @copilot assignment demo |
| [#3 — CSV export](https://github.com/beardofedu/hackathon-winners/issues/3) | Feature | Copilot CLI /plan demo |
| [#4 — Weekend ETA calc](https://github.com/beardofedu/hackathon-winners/issues/4) | Bug | IDE Chat + logic discussion |
| [#5 — Tracking timeline](https://github.com/beardofedu/hackathon-winners/issues/5) | Feature | IDE Agent Mode demo |
| [#6 — Mobile layout](https://github.com/beardofedu/hackathon-winners/issues/6) | Enhancement | @workspace CSS refactor |
