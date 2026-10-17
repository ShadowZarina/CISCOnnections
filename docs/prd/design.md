# Zenith design guide

## Purpose

The interface should feel calm, personal, and easy to read. The space theme should help users understand the map. It should not make the app feel like a game or a busy sci-fi dashboard.

## Screen levels

| Screen | What the user sees |
| --- | --- |
| Universe | A clear list or map of galaxies. |
| Galaxy | Its star systems. |
| Star system | The editable star canvas. |
| Inspector | Details for the selected star. |

## Main canvas layout

```text
Galaxy / star-system path
Toolbar: add | connect | filter | zoom

Star canvas

Inspector: name | description | tags | connections | time later
```

## Interaction rules

- Right-click empty canvas to add a star at that point.
- Keep an **Add star** toolbar action for keyboard users.
- Drag stars to place them.
- Drag from a clear connection handle to link stars.
- Do not show a link action that cannot work. A star in another system is not a valid target.
- Keep the selected star obvious.
- Use motion only to explain an action, such as opening a panel or drawing a new connection.
- Respect reduced-motion preferences.

## Asset direction for Xiaoha

The team can draw original stars, connection states, background textures, and small decorative details. Each asset should still support a clear product job:

| Asset | Job |
| --- | --- |
| Star states | Show normal, selected, connected, and focused stars. |
| Connection style | Make links readable without covering labels. |
| System background | Help users know which system they are in. |
| Empty state art | Explain what to do before the first star is added. |
| Icons | Support actions without replacing text labels. |

## Style limits

- Use a small set of colours with clear meaning.
- Keep text readable over every background.
- Do not rely on colour alone to show selection or a connection error.
- Avoid constant motion, heavy glow, and visual noise.
- Use shadcn/ui for basic interface behaviour, then style it to fit the project instead of accepting its default look.

## Later design work

- A proper visual brief from Xiaoha.
- Approved colour, type, spacing, and icon rules.
- Constellation naming and style choices.
- Zoom and focus animation experiments.
