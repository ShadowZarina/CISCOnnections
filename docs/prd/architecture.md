# Zenith architecture

## Goal

Keep the first version small, clear, and easy to change later.

## Main rule

The app has one kind of canvas item: a **star**. Do not make different code classes for an organization, task, person, or note. A star has the same basic shape every time, with a name, description, tags, and optional extra details.

This keeps the app simple. A tag such as `organization`, `school`, or `tech` tells the user what the star means.

## Data shape

| Item | What it stores | Important rule |
| --- | --- | --- |
| Universe | The list of galaxies in the app | It is the top level. |
| Galaxy | Name and its star systems | It cannot share direct connections with another galaxy. |
| Star system | Name and its stars | It is a hard connection boundary. |
| Star | Name, description, tags, canvas position, and system ID | It belongs to one star system. |
| Connection | Source star, target star, and optional label | Both stars must be in the same star system. |

A constellation is calculated from the connections. It does not need its own saved record in the first version.

## Connection rule

Before the app creates a connection, it checks:

```text
same galaxy AND same star system = allowed
anything else = blocked
```

This one simple rule protects the product hierarchy everywhere, even when new screens are added later.

## Main components

| Component | What it does |
| --- | --- |
| `UniverseBrowser` | Shows galaxies. |
| `GalaxyBrowser` | Shows the star systems inside one galaxy. |
| `StarSystemCanvas` | Shows one star system and handles pan, zoom, and selection. |
| `StarNode` | Draws one star and its connection handles. |
| `ConnectionEdge` | Draws one direct connection and its label. |
| `CanvasContextMenu` | Shows actions after right-clicking empty canvas. |
| `InspectorPanel` | Edits the selected star. |
| Graph store | Keeps the current data and provides clear actions, such as create, move, connect, and edit. |

## Why this is not a large OOP hierarchy

The app still has clear responsibilities: each component does one job, and the connection rule does one job. We simply avoid making many child classes for every kind of star. That would make a personal project harder to change without giving users a real benefit.

## Storage

The first version stores data in the browser. Keep storage behind one small data layer so cloud sync can be added later without rewriting the canvas.

## Open questions

- What should the first screen show: a universe view of galaxies, or a sidebar that always selects the current galaxy?
- Should the user add a new star system from the galaxy screen, or only use the starting `General` system at first?
- Should a constellation have a user-given name later, or remain only a visible shape?
