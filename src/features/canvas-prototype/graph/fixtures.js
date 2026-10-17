export function createSeedGraph() {
  const positions = [
    { x: 60, y: 80 }, { x: 340, y: 40 }, { x: 610, y: 150 },
    { x: 100, y: 350 }, { x: 390, y: 330 }, { x: 680, y: 390 },
  ];
  return {
    stars: positions.map((position, index) => ({
      id: `star-${index + 1}`, name: `Star ${String.fromCharCode(65 + index)}`,
      galaxyId: "prototype", systemId: "general", position,
    })),
    connections: [],
  };
}
