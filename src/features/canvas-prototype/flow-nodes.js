export const STAR_WIDTH = 144;
export const STAR_HEIGHT = 80;

export function getStarCenter(star, measured) {
  return {
    x: star.position.x + (measured?.width ?? STAR_WIDTH) / 2,
    y: star.position.y + (measured?.height ?? STAR_HEIGHT) / 2,
  };
}

// Keep React Flow's measured geometry when projecting domain stars into view nodes.
export function createFlowNodes(stars, measurements, selectedStar, connectingFrom) {
  return stars.map((star) => ({
    id: star.id,
    type: "star",
    position: star.position,
    selected: selectedStar === star.id,
    zIndex: 1,
    style: { width: STAR_WIDTH, height: STAR_HEIGHT },
    measured: measurements[star.id],
    data: {
      name: star.name,
      isSource: star.id === connectingFrom,
      choosingTarget: !!connectingFrom,
    },
  }));
}

export function updateMeasurements(current, changes) {
  let next = current;
  for (const change of changes) {
    if (change.type !== "dimensions" || !change.dimensions) continue;
    const { width, height } = change.dimensions;
    if (next[change.id]?.width === width && next[change.id]?.height === height) continue;
    if (next === current) next = { ...current };
    next[change.id] = { width, height };
  }
  return next;
}
