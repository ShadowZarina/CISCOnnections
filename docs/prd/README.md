# Zenith product brief

**Status:** Working draft

## The idea

Zenith is a personal, local-first planner. It helps a person place ideas on a visual canvas and draw the relationships between them.

It is not an astronomy simulator. The space theme helps people understand the structure of their information.

## The product tree

```text
Universe → Galaxy → Star system → Star
```

A **constellation** is not a separate folder. It appears when connected stars make a shape inside a star system.

Example:

```text
Galaxy: School organizations
├── Star system: Curricular
│   └── Star: Tech council
└── Star system: Extracurricular
    └── Star: Tech user group
```

Both stars can use the `tech` tag. They cannot have a direct connection because they are in different star systems.

## Confirmed product choices

- This is a personal app first. There is no login, cloud sync, or team editing in the first version.
- Every user-created item is a star. There are no separate planet, moon, or note node types.
- A star can have many tags.
- Users make direct connections by dragging from one star to another.
- Connections cannot cross a star-system or galaxy boundary.
- Tags are stored from the start, but tag-based connection suggestions come later.
- Right-clicking empty canvas offers **Add star** at that exact spot. The toolbar offers the same action for keyboard users.
- A new galaxy starts with one `General` star system.
- Stars do not need a formal type in the first version. Clear tags are enough.

## First version

The first usable version lets a person open one star system, add and edit stars, move them, add tags and descriptions, connect stars, and return later to find the same layout.

## Not in the first version

- Deployment
- Accounts and cloud sync
- Real-time collaboration
- 3D space or physics
- Automatic links from tags
- Time views and animation
- Named or custom-styled constellations

## Responsibilities

| Area | Home | Xiaoha |
| --- | --- | --- |
| Product rules and app structure | Owns the data rules, screen flow, and build order | Checks that rules work with the design |
| Visual system | Turns the agreed visual rules into usable components | Owns the visual brief, assets, star states, colours, type, and motion choices |
| Shared decisions | Priorities, acceptance checks, and user feedback | Priorities, acceptance checks, and user feedback |

Read [architecture.md](architecture.md) for how the app is arranged, [technical-features.md](technical-features.md) for the build scope, and [design.md](design.md) for the visual rules.
