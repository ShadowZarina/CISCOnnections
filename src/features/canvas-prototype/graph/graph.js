export function canConnect(graph, sourceId, targetId) {
  const source = graph.stars.find((star) => star.id === sourceId);
  const target = graph.stars.find((star) => star.id === targetId);
  if (!source || !target) return { allowed: false, reason: "Choose two existing stars." };
  if (sourceId === targetId) return { allowed: false, reason: "Choose a different star. Self-links are not allowed." };
  if (source.galaxyId !== target.galaxyId || source.systemId !== target.systemId) {
    return { allowed: false, reason: "Connections must stay inside one star system." };
  }
  const duplicate = graph.connections.some((edge) =>
    (edge.source === sourceId && edge.target === targetId) ||
    (edge.source === targetId && edge.target === sourceId));
  return duplicate
    ? { allowed: false, reason: "These stars already share a connection." }
    : { allowed: true };
}

export function graphReducer(graph, action) {
  switch (action.type) {
    case "connect":
      if (!canConnect(graph, action.source, action.target).allowed) return graph;
      return { ...graph, connections: [...graph.connections, {
        id: action.id, source: action.source, target: action.target, tags: [],
      }] };
    case "remove-connection":
      return { ...graph, connections: graph.connections.filter((edge) => edge.id !== action.id) };
    case "update-connection":
      return { ...graph, connections: graph.connections.map((edge) => edge.id === action.id
        ? {
          ...edge,
          label: action.label.trim() || undefined,
          tags: [...new Set(action.tags.map((tag) => tag.trim()).filter(Boolean))],
        } : edge) };
    case "move": {
      const positions = new Map(action.positions.map((change) => [change.id, change.position]));
      return { ...graph, stars: graph.stars.map((star) => {
        const position = positions.get(star.id);
        return position ? { ...star, position } : star;
      }) };
    }
    default:
      return graph;
  }
}

export function getConstellations(graph) {
  const neighbors = new Map(graph.stars.map((star) => [star.id, new Set()]));
  for (const edge of graph.connections) {
    neighbors.get(edge.source)?.add(edge.target);
    neighbors.get(edge.target)?.add(edge.source);
  }
  const visited = new Set();
  const components = [];
  for (const [id, adjacent] of neighbors) {
    if (visited.has(id) || adjacent.size === 0) continue;
    const component = [];
    const pending = [id];
    while (pending.length > 0) {
      const current = pending.pop();
      if (visited.has(current)) continue;
      visited.add(current);
      component.push(current);
      for (const neighbor of neighbors.get(current) ?? []) {
        if (!visited.has(neighbor)) pending.push(neighbor);
      }
    }
    components.push(component.sort());
  }
  return components;
}
