# CODE STRUCTURE

ciscOnnections/<br>
├── src/<br>
│   ├── components/<br>
│   │   ├── GalaxyCanvas.tsx<br>
│   │   ├── PlanetNode.tsx<br>
│   │   ├── StarNode.tsx<br>
│   │   ├── NoteNode.tsx<br>
│   │   ├── CometNode.tsx<br>
│   │   ├── ConnectionLine.tsx<br>
│   │   ├── Toolbar.tsx<br>
│   │   └── PropertiesPanel.tsx<br>
│   ├── pages/<br>
│   │   ├── Dashboard.tsx<br>
│   │   └── GalaxyEditor.tsx<br>
│   ├── types/<br>
│   │   └── galaxy.ts<br>
│   ├── store/<br>
│   │   └── galaxyStore.ts<br>
│   ├── styles/<br>
│   ├── App.tsx<br>
│   └── main.tsx<br>
├── package.json<br>
└── index.html<br>

# LANGUAGES & FRAMEWORKS

- Framework: React
- Build tool: Vite
- Styling: CSS Modules
- Canvas: React Flow for connected constellations, or React Konva for a freeform visual workspace
- Icons: Lucide React



State management: React state initially; Zustand when needed
