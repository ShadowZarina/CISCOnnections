# Zenith technical features

## Local development stack

| Tool | Use |
| --- | --- |
| React + JavaScript/JSX | Builds the app and canvas controls. |
| Bun | Installs packages, runs the local development server, and builds frontend assets. |
| Tailwind CSS | Styles screens quickly using project-owned colours and spacing rules. |
| shadcn/ui | Provides editable building blocks for menus, sheets, forms, and dialogs. |
| React Flow | Provides the canvas, draggable stars, direct connections, pan, and zoom. |
| Lucide React | Provides icons. |

The app does not need a backend in the first version. Deployment is a later decision.

## First features

### Galaxy and star-system browsing

- Create and rename a galaxy.
- Start each new galaxy with `General` as its first star system.
- Open one star system at a time.
- Add more systems later from the galaxy screen.

### Star editing

- Right-click empty canvas and choose **Add star**.
- Put the new star at the clicked position.
- Open the inspector so the user can give it a name.
- Add a description and many tags.
- Drag the star and save its position.

### Connections and constellations

- Drag from a star's connection handle to another star.
- Allow the link only when both stars are in the same system.
- Let the user add a short label to a link later if it helps.
- Show the connected shape as a constellation.

### Local saving

- Save galaxies, systems, stars, connections, tags, and positions in the browser.
- Load the same data when the user returns.
- Keep the data code separate from the screen code so a sync feature can be added later.

## Later features

- Tag-based suggestions for related stars.
- Time fields and filters.
- Constellation names and styles.
- Import and export.
- Cloud sync and deployment.
- Full keyboard canvas navigation and screen-reader support.

## Build order

1. Set up React with JavaScript/JSX, Bun, Tailwind, and the basic app shell.
2. Build the star-system canvas with placeholder stars.
3. Add the local data store and saving.
4. Add star creation, editing, dragging, and direct connections.
5. Add galaxy and system browsing.
6. Replace placeholders with Xiaoha's approved visual system.

Do not add tag automation, time tools, or deployment before the basic add → describe → move → connect loop feels useful.
