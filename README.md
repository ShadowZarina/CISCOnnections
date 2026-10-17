# CISCOnnections

CISCOnnections is a space-themed way to map ideas and their relationships. It is inspired by Obsidian's graph view, but a star can represent almost anything: a person, task, group, source, idea, category, or note.

## How it is organized

```text
Universe
└── Galaxies
    └── Star systems
        └── Stars and their connections
```

- 🌌 **Universe** — the whole app and all of its galaxies.
- 🌠 **Galaxy** — one separate workspace, such as “School organizations.”
- ✨ **Star system** — one smaller area inside a galaxy. Connections stay inside this area.
- ⭐ **Star** — one item in a star system.
- 🔗 **Constellation** — the shape made when stars are connected.

Tags may be shared across star systems, but a direct connection cannot cross a star-system or galaxy boundary.

## What the first version will do

- Create galaxies and star systems.
- Add stars with a name, description, and tags.
- Move stars around the canvas.
- Connect stars in the same star system.
- Show constellations through those connections.
- Save the work locally in the browser.

## Tools

- **React + TypeScript** — the app itself.
- **Vite** — runs the app locally while the team builds it.
- **Bun** — installs packages and runs project scripts.
- **Tailwind CSS** — styles the app.
- **shadcn/ui** — small building blocks for menus, forms, panels, and dialogs.
- **React Flow** — the star-system canvas, dragging, and connections.
- **Lucide React** — icons.

Deployment is not part of the first version. Vite is for local development and previewing the work.

## Project docs

- [General product brief](docs/prd/README.md)
- [Architecture](docs/prd/architecture.md)
- [Technical features](docs/prd/technical-features.md)
- [Design guide](docs/prd/design.md)

The docs use plain language on purpose. They are the shared source of truth for Home, Xiaoha, and future agents.
