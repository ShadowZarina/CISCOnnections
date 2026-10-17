import { useCallback, useMemo, useReducer, useState } from "react";
import { canConnect, getConstellations, graphReducer } from "./graph/graph.js";
import { createSeedGraph } from "./graph/fixtures.js";

export function usePrototypeGraph() {
  const [graph, dispatch] = useReducer(graphReducer, undefined, createSeedGraph);
  const [selectedStar, setSelectedStar] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [connectingFrom, setConnectingFrom] = useState(null);
  const [cardEdge, setCardEdge] = useState(null);
  const [message, setMessage] = useState("Select a star, then choose Connect.");

  const startConnection = useCallback((id) => {
    setConnectingFrom(id);
    setSelectedStar(id);
    setSelectedEdge(null);
    setCardEdge(null);
    setMessage("Choose another star. Escape cancels.");
  }, []);

  const chooseTarget = useCallback((target) => {
    if (!connectingFrom) return;
    const decision = canConnect(graph, connectingFrom, target);
    if (!decision.allowed) { setMessage(decision.reason); return; }
    const id = crypto.randomUUID();
    dispatch({ type: "connect", id, source: connectingFrom, target });
    setConnectingFrom(null);
    setSelectedStar(null);
    setSelectedEdge(id);
    setCardEdge(id);
    setMessage("Connection created. A name and tags are optional.");
  }, [connectingFrom, graph]);

  const removeConnection = useCallback((id) => {
    dispatch({ type: "remove-connection", id });
    setSelectedEdge((current) => current === id ? null : current);
    setCardEdge((current) => current === id ? null : current);
    setMessage("Connection removed.");
  }, []);

  const selectStar = useCallback((id) => {
    if (connectingFrom) { chooseTarget(id); return; }
    setSelectedStar(id);
    setSelectedEdge(null);
    setCardEdge(null);
    setMessage("Choose Connect to link this star to another.");
  }, [connectingFrom, chooseTarget]);

  const selectEdge = useCallback((id) => {
    setConnectingFrom(null);
    setSelectedStar(null);
    setSelectedEdge(id);
    setCardEdge(id);
    setMessage("Edit the connection name and tags, or delete it.");
  }, []);

  const clearSelection = useCallback(() => {
    setConnectingFrom(null);
    setSelectedStar(null);
    setSelectedEdge(null);
    setCardEdge(null);
    setMessage("Select a star, then choose Connect.");
  }, []);

  const actions = useMemo(() => ({ startConnection, chooseTarget, removeConnection, selectStar }),
    [startConnection, chooseTarget, removeConnection, selectStar]);

  return {
    graph, dispatch, selectedStar, selectedEdge, connectingFrom, cardEdge, message,
    constellations: getConstellations(graph),
    actions,
    selectStar, selectEdge, clearSelection,
    closeCard: () => setCardEdge(null),
  };
}
