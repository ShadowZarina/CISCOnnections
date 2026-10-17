# Zenith

Zenith is a personal, local-first visual planner for connecting ideas. It uses a space metaphor to help someone organize and explore relationships; it is not a space simulator.

```text
Universe → Galaxy → Star system → Star
```

Every item is a **Star**. A star can represent a person, task, organization, note, concept, source, or category. Tags and descriptions add meaning without creating separate node types.

A **constellation** is the visible connected shape made by stars inside one star system. It is derived from the graph, not saved as a separate folder or object.

## Product rules

- A new galaxy starts with one `General` star system.
- Every star belongs to one star system.
- A star may connect to many other stars.
- Connections are unnamed and undirected by default. One pair of stars can have only one connection, and a star cannot connect to itself.
- Direct connections cannot cross a star-system or galaxy boundary.
- Stars can share tags across systems, but tags never create connections automatically.
- The canvas supports adding stars, moving them, connecting them, and removing a selected connection.

## Current canvas prototype

The first prototype opens directly into a seeded `General` system with placeholder stars. It uses in-memory data only, so refreshing resets the graph. The focus is the canvas loop: select a star, activate its Connect control, choose another star, then see the constellation take shape.

Visual assets, palettes, typography, final node states, and motion are intentionally deferred while the team confirms the interaction model.

## Responsibilities

| Area | Home | Xiaoha |
| --- | --- | --- |
| Product behavior | Owns product rules, scope, hierarchy, and build order | Reviews that proposed behavior remains understandable in the interface |
| Technical direction | Owns the data model, graph state, connection policy, canvas interactions, and integration decisions | Builds the front-end presentation around the agreed behavior |
| Connection mechanics | Owns rules for valid links, duplicate prevention, deletion, and derived constellations | Designs the readable node, edge, selection, and feedback states for those rules |
| Visual system | Supplies technical constraints and placeholder contracts | Owns the visual brief, assets, colors, typography, spacing, motion, and final component treatments |
| Shared work | Reviews priorities, acceptance checks, and user feedback | Reviews priorities, acceptance checks, and user feedback |

## Planned stack

| Tool | Purpose |
| --- | --- |
| React + TypeScript | Application structure and clear graph data shapes |
| Bun | Package manager, development runtime, and build tooling |
| Tailwind CSS | CSS foundation once Xiaoha's visual rules are ready |
| React Flow | Draggable graph canvas, nodes, edges, pan, and zoom |
| shadcn/ui | Optional source-owned controls for ordinary menus, forms, and panels—not canvas visuals |
| Lucide React | Action icons where an icon supports a text label |

## Project documents

- [Product brief](docs/prd/README.md)
- [Architecture](docs/prd/architecture.md)
- [Technical features](docs/prd/technical-features.md)
- [Design guide](docs/prd/design.md)
- [Canvas connection prototype plan](docs/canvas-prototype/connection-spike-plan.md)
