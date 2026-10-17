# CODE STRUCTURE

Historical layout below, updated to JavaScript/JSX file extensions. The implemented canvas structure is documented in [canvas-prototype/README.md](canvas-prototype/README.md).

zenith/<br>
├── src/<br>
│   ├── components/<br>
│   │   ├── GalaxyCanvas.jsx<br>
│   │   ├── PlanetNode.jsx<br>
│   │   ├── StarNode.jsx<br>
│   │   ├── NoteNode.jsx<br>
│   │   ├── CometNode.jsx<br>
│   │   ├── ConnectionLine.jsx<br>
│   │   ├── Toolbar.jsx<br>
│   │   └── PropertiesPanel.jsx<br>
│   ├── pages/<br>
│   │   ├── Dashboard.jsx<br>
│   │   └── GalaxyEditor.jsx<br>
│   ├── graph/<br>
│   │   └── galaxy.js<br>
│   ├── store/<br>
│   │   └── galaxyStore.js<br>
│   ├── styles/<br>
│   ├── App.jsx<br>
│   └── main.jsx<br>
├── package.json<br>
└── index.html<br>

# LANGUAGES & FRAMEWORKS

- Framework: React
- Language: JavaScript / JSX
- Build tool: Bun
- Styling: CSS Modules
- Canvas: React Flow for connected constellations, or React Konva for a freeform visual workspace
- Icons: Lucide React



State management: React state initially; Zustand when needed
