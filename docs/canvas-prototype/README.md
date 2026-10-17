# Canvas prototype

The implementation uses JavaScript/JSX and is ready for human code review. The current changes preserve measured node geometry, add neutral dark mode, and anchor a connection name/tag card beside the target star. The agent has not executed the revised app, tests, build, or browser checks.

See [the canvas prototype plan](canvas-prototype-plan.md) for the agreed scope and current checklists. Update its implementation checkboxes with every implementation change; keep review and verification checkboxes separate. This folder holds the prototype's plans and handoff notes; implementation lives in `src/features/canvas-prototype/`.

## What to review

The implementation follows the graph upward:

1. `graph/graph.js` and `graph/graph.test.js` define connection rules, graph edits, and derived constellations independently of the canvas library. Graph data is plain JavaScript objects.
2. `graph/fixtures.js` supplies six disconnected stars in `General`.
3. `usePrototypeGraph.js` owns the in-memory graph and interaction selection using React state and a reducer. There is no external store or persistence.
4. `CanvasPrototype.jsx`, `StarNode.jsx`, `ConnectionEdge.jsx`, and `EdgeQuickCard.jsx` provide the React Flow view and placeholder controls.
5. `flow-nodes.js` preserves React Flow's measured node dimensions while projecting graph records into canvas nodes; `flow-nodes.test.js` covers this geometry across connection and drag changes.

The canvas shows a static path and star/link/constellation counts. Select a star, choose **Connect**, and click a different star or its **Link here** button. A dashed preview follows the pointer while choosing a target. Escape or clicking empty canvas cancels. Invalid targets leave connection mode active and show a short reason.

Connections and their pointer previews now run from each star's visual center. The hidden source and target anchors share that point, so reversing the creation order does not change the line's attachment. Lines stay behind the opaque boxes, including when selected, and visually emerge from the box boundaries. The midpoint delete control, keyboard deletion, and connection card remain available. The center calculation uses measured dimensions so the preview can follow a future change in node size. Sprite artwork and masking remain future visual work.

A valid pair creates an unnamed, undirected link immediately, with empty tags. Its optional name/tag card opens beside the target star using React Flow's `NodeToolbar`. The card follows the star through dragging, panning, and zooming; its position changes when available canvas space is limited. Dismiss keeps the link and its saved metadata; Save applies the name and comma-separated tags. Empty or repeated tags are removed when saving. Clearing the name and tags leaves a valid unnamed link. Tags never create links automatically.

Selecting a link reopens its card. Selected links support Delete/Backspace, a midpoint delete button visible on hover/focus/selection, and right-click **Delete link**. Typing in either field does not delete a selected edge. The canvas, nodes, controls, labels, and lines use a neutral dark treatment; the final palette remains undecided.

The previous node projection dropped measured dimensions on every render. In the installed React Flow code, this clears handle bounds and forces remeasurement, so graph links can exist without usable edge geometry. The updated adapter retains measurements and avoids repeated state updates for unchanged dimensions; it does not hide or suppress ResizeObserver errors. Runtime confirmation of the fix is still pending.

Refresh resets the graph. Isolated stars do not count as constellations. This first round uses the six fixtures; star creation and the broader inspector are outside this canvas prototype.

## Local startup

Run these from a terminal in the repository root to open the prototype manually:

```powershell
bun install
bun run dev
```

Keep the terminal running and open **http://127.0.0.1:3000**. `bun start` starts the same local development server. Ctrl+C stops it.

Do not double-click `index.html` or serve the source with a generic static-file server. JSX and package imports need Bun's bundler. A persistent loading message at the local address means the frontend did not mount; check the development terminal and browser console for an error before assuming its cause.

Dependencies and `bun.lock` are now present locally. The agent has not run installation. Retain the lockfile with the implementation.

Optional checks after code review:

```powershell
bun test
bun run build
```

Open `http://127.0.0.1:3000`. The Bun development server serves and bundles local frontend assets; it does not provide a product backend. `bun run build` writes a static bundle to `dist/`. Vite is not part of this scaffold.

For agent-run verification, explicitly say **“Human review approved; run verification.”** Browser automation/E2E requires separate approval.

