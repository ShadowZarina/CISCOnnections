# Canvas Prototype Plan

> **Implementation status:** JavaScript/JSX code updated for measured node geometry, dark mode, and a star-anchored connection card with tags; awaiting human review. Runtime verification of these changes remains pending. See [handoff notes](README.md).

## Goal

Build a small, resettable canvas prototype that lets someone place and move placeholder stars, connect them into visible constellations, and remove those connections. This prototype focuses on canvas functionality. Xiaoha owns the visual direction.

## Fixed boundary

- Open directly into a static `General` star system with a non-interactive path label.
- Seed the canvas with 4–6 placeholder stars so connection behavior is immediately usable.
- Use React with JavaScript/JSX, Bun, Tailwind CSS, and React Flow.
- Keep all data in memory. Refreshing the page resets the prototype.
- Use one universal `Star` node record. Do not add type-specific node classes.
- Use a dark canvas with neutral grayscale placeholder controls and visible light connection lines. Home and Xiaoha will decide the specific palette and visual assets later.

## Connection contract

1. Select a source star.
2. Activate its placeholder **Connect** control/handle.
3. Choose another star as the target.
4. Validate the pair, then create one unnamed, undirected connection immediately.
5. Open a small optional card anchored beside the target star inside the canvas. It follows the star during movement, pan, and zoom and switches sides when space is limited.
6. Allow an optional connection name and comma-separated tags. Save applies both; dismiss keeps the existing connection metadata. Tags are descriptive only and do not generate edges.

Links run between the visual centers of the two stars, regardless of which one was clicked first. Both hidden handles sit at the same center point. Lines and their pointer preview stay behind the opaque placeholder nodes, so they emerge from the box boundaries without crossing labels or controls. Selected edges change appearance without being raised over nodes. Future sprite artwork should retain this central anchor; any sprite-specific masking will be decided with its visual design.

The connection policy must reject a self-link and a second link for the same unordered pair of stars. It must allow any star to connect to many different stars. A future multi-system screen must reuse the same policy to reject cross-system or cross-galaxy links.

```text
A -- B   allowed
B -- C   allowed
B -- D   allowed
A -- B   rejected: duplicate pair
A -- A   rejected: self-link
```

A constellation is a derived connected component of the graph, not a saved entity, folder, or named record. Adding a connection can grow or merge components; removing one can split them.

## Small data and component boundary

| Concern | Prototype responsibility |
| --- | --- |
| `Star` | `id`, placeholder name, position, and the static system ID |
| `Connection` | `id`, two star IDs, an optional label, and descriptive tags |
| Connection policy | Checks different-star, same-system, and one link per unordered pair |
| `CanvasPrototype` | React Flow canvas, selection, pan/zoom, and seeded fixtures |
| `StarNode` | Placeholder node plus its explicit Connect control/handle |
| `ConnectionEdge` | Visible edge, selection state, hover delete indicator, and optional label |
| `EdgeQuickCard` | Star-anchored name/tag form and save/dismiss/remove actions |
| Flow node adapter | Preserves React Flow's measured dimensions independently of graph records |
| Graph state | Local React state only: stars, connections, selected node, selected edge, and quick-card target |

## Implementation checklist

Update this checklist in the same change whenever implementation is added or revised. A checked implementation item means its code has been written; human review and runtime verification are tracked separately below.

- [x] Create the Bun + React + JavaScript/JSX + Tailwind + React Flow project shell.
- [x] Add a static `General` canvas view with six in-memory placeholder stars and a neutral path label.
- [x] Make stars draggable and keep their positions in local React state.
- [x] Add one small `canConnect` policy function and use it before every connection is created.
- [x] Implement select source → activate Connect → choose target → create unnamed edge.
- [x] Show the optional edge quick card with connection name and comma-separated tags; user-chosen colors remain deferred.
- [x] Support selected-edge highlighting, a hover delete affordance, keyboard Delete/Backspace, and a right-click **Delete link** action.
- [x] Derive constellation membership from current connections rather than storing constellation records.
- [x] Write graph tests for connection rules, graph edits, and constellation merging/splitting.
- [x] Preserve measured node dimensions and explicit handle IDs when projecting stars into React Flow, and memoize nodes during pointer-preview changes.
- [x] Add regression test cases for measured geometry retention and normalized connection tags.
- [x] Anchor the connection card beside its target star using `NodeToolbar`, with placement chosen from available canvas space.
- [x] Add neutral dark surfaces, readable light edges, and fixed node/layout dimensions to limit resize feedback.
- [x] Center both connection anchors, start the pointer preview at the star center, and keep selected/unselected links behind nodes.
- [x] Write center-position test cases for placeholder dimensions and moved/resized star visuals.

## Review and verification checklist

Review and runtime checks for the current changes remain pending. Update them only after the corresponding review or check has actually occurred. Dependencies and `bun.lock` are present locally, but the agent has not run installation.

- [ ] Human review approved.
- [x] Dependencies and the generated `bun.lock` are present in the workspace.
- [ ] Run the graph tests.
- [ ] Build successfully with Bun.
- [ ] Confirm a person can move placeholder stars and form one or more constellations.
- [ ] Confirm a star can connect to many others, while duplicate pairs and self-links are rejected.
- [ ] Confirm an unnamed link remains after dismissing its quick card.
- [ ] Confirm deleting a link updates the constellation shape and count.
- [ ] Confirm refresh returns to the seeded fixture graph.
- [ ] Confirm created links render and remain attached after selection changes, node dragging, pan, and zoom, without the reported ResizeObserver loop.
- [ ] Confirm the name/tag card follows the target star and remains usable near canvas edges.
- [ ] Confirm saved tags reopen correctly; dismissing a draft leaves metadata unchanged.
- [ ] Confirm dark-mode controls, labels, selection, and connection lines remain readable.
- [ ] Confirm links emerge along the center-to-center line in every direction, including when target stars move left of or above their sources.
- [ ] Confirm selecting a link or starting a connection does not draw over star labels and controls.

## Deliberately deferred

- Working Universe and Galaxy navigation
- Browser persistence, Zustand, accounts, sync, or collaboration
- Star tags, descriptions, time metadata, and user-chosen edge colors
- Drag-to-connect as an alternate gesture
- Final visual components, styling, accessibility polish, and motion choices

## Review and verification gate

After code generation, stop for human review. Do not run setup commands, builds, linting, tests, a dev server, or browser checks until the user gives the explicit approval: **“Human review approved; run verification.”** Browser or end-to-end checks need separate explicit approval.
