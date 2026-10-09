# CISCOnnections
Inspired by Obsidian's connection webs, CISCOnnections provides an effective way to connect thoughts, bringing together names, categories, and notes through relationships in a 3D graph.
<br><br>
Access the website live through [CISCOnnections](link)!

## Features
CISCOnnections is the perfect tool for visual and writing-based planners who love basking in the wonders of space! Create galaxies for each of your charts, add categories through planets of various colors and shapes, forge stars into existence by listing down names, add your own notes and descriptions as surrounding moons and comets, and connect them all to form your very own constellations!

✦ Explore the Features of CISCOnnections!
- 🌌 Create Your Own Galaxies — Organize each chart into a unique galaxy of ideas.
- 🪐 Categorize with Planets — Sort information using planets of different colors and shapes.
- ⭐ Bring Stars to Life — List names and entries as stars in your galaxy.
- ☄️ Add Notes and Descriptions — Expand your ideas with informative moons and comets.
- ✨ Connect Your Constellations — Link related entries to visualize connections and relationships.
- 🎨 Personalize Your Universe — Mix visual elements and written details to create your ideal planner.

/* each repository/container is a galaxy
categories are planets 
notes are moons or i can just make them appear on click
all nodes are stars
connect stars to form constellations */

## Tech Stack
This website utilizes the following languages and frameworks:
- sentence-transformers (all-MiniLM-L6-v2)
- NetworkX -> JSON
- D3.js force-directed

The project maximizes the following concepts:
- Cosine + temporal decay

## RECOMMENDED
Language: TypeScript
Framework: React
Build tool: Vite
Styling: CSS Modules
Canvas: React Flow for connected constellations, or React Konva for a freeform visual workspace
Icons: Lucide React
State management: React state initially; Zustand when needed

### 1. Recommended frontend stack

React + TypeScript
Core
Build reusable components for galaxies, planets, stars, notes, toolbars, and sidebars. TypeScript helps catch errors as the project grows.

Vite
A fast development server and build tool for your React application. It keeps the initial setup simple.

CSS Modules or Tailwind CSS
Style your space-themed interface, including responsive layouts, colors, typography, shadows, and planet designs. Choose one initially rather than combining both.

React Flow (@xyflow/react)
Useful for creating connected nodes, draggable objects, and visual relationships. It can provide the foundation for linking stars, planets, and notes.

Lucide React
Clean, consistent icons for actions such as adding planets, editing stars, deleting notes, zooming, and opening settings.


### Technology	Purpose	Priority
HTML5	Structure and semantic elements	Essential
TypeScript	Types for planets, stars, notes, and connections	Essential
CSS	Visual styling and responsive layouts	Essential
React Router	Navigation between pages and galaxies	Optional initially
Zustand	Managing selected objects, editing, and canvas state	Useful as complexity grows
IndexedDB	Saving larger amounts of workspace data locally	Later
Vitest + React Testing Library	Testing components and interactions	Later
