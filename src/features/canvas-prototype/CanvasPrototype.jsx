import { useCallback, useMemo, useRef, useState } from "react";
import {
  Controls, ReactFlow, ViewportPortal,
} from "@xyflow/react";
import { CanvasActions } from "./canvas-context.js";
import { ConnectionEdge } from "./ConnectionEdge.jsx";
import { EdgeQuickCard } from "./EdgeQuickCard.jsx";
import { StarNode } from "./StarNode.jsx";
import { usePrototypeGraph } from "./usePrototypeGraph.js";
import { createFlowNodes, getStarCenter, updateMeasurements } from "./flow-nodes.js";

const nodeTypes = { star: StarNode };
const edgeTypes = { connection: ConnectionEdge };

export function CanvasPrototype() {
  const state = usePrototypeGraph();
  const flow = useRef(null);
  const canvas = useRef(null);
  const [pointer, setPointer] = useState(null);
  const [menu, setMenu] = useState(null);
  const [measurements, setMeasurements] = useState({});
  const source = state.graph.stars.find((star) => star.id === state.connectingFrom);
  const sourceCenter = source ? getStarCenter(source, measurements[source.id]) : null;
  const card = state.graph.connections.find((edge) => edge.id === state.cardEdge);
  const cardTarget = state.graph.stars.find((star) => star.id === card?.target);

  const nodes = useMemo(() => createFlowNodes(
    state.graph.stars, measurements, state.selectedStar, state.connectingFrom,
  ), [state.graph.stars, measurements, state.selectedStar, state.connectingFrom]);

  const edges = useMemo(() => state.graph.connections.map((edge) => ({
    ...edge, type: "connection", selected: edge.id === state.selectedEdge,
    sourceHandle: "out", targetHandle: "in",
    reconnectable: false,
    zIndex: 0,
    ariaLabel: `${state.graph.stars.find((star) => star.id === edge.source)?.name} connected to ${state.graph.stars.find((star) => star.id === edge.target)?.name}`,
  })), [state.graph.connections, state.graph.stars, state.selectedEdge]);

  function starName(id) {
    return state.graph.stars.find((star) => star.id === id)?.name ?? "Star";
  }

  const handleNodeChanges = useCallback((changes) => {
    setMeasurements((current) => updateMeasurements(current, changes));
    const positions = changes.flatMap((change) => change.type === "position" && change.position
      ? [{ id: change.id, position: change.position }] : []);
    if (positions.length) state.dispatch({ type: "move", positions });
  }, [state.dispatch]);

  function handleKeys(event) {
    if (event.defaultPrevented) return;
    if (event.key === "Escape") {
      event.preventDefault(); state.clearSelection(); setMenu(null); canvas.current?.focus();
      return;
    }
    const target = event.target;
    if (target.closest("input, textarea, select, button, [contenteditable='true']")) return;
    if ((event.key === "Delete" || event.key === "Backspace") && state.selectedEdge) {
      event.preventDefault(); state.actions.removeConnection(state.selectedEdge); setMenu(null);
    }
  }

  return (
    <main className="prototype-shell" onKeyDown={handleKeys}>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b p-3">
        <div>
          <h1 className="font-semibold">CISCOnnections · Canvas prototype</h1>
          <p className="text-sm mt-1">Universe / Prototype galaxy / General</p>
        </div>
        <span className="text-sm">Session only · refresh resets the canvas</span>
      </header>
      <div className="flex flex-wrap items-center gap-3 border-b px-3 py-2" aria-label="Canvas information">
        <span>{state.graph.stars.length} stars</span>
        <span>{state.graph.connections.length} links</span>
        <span>{state.constellations.length} constellations</span>
        {source && <button onClick={() => { state.clearSelection(); setPointer(null); }}>Cancel connection</button>}
      </div>
      <CanvasActions.Provider value={state.actions}>
        <div ref={canvas} className="canvas" tabIndex={0} aria-label="General star system canvas"
          onPointerMove={(event) => {
            if (source && flow.current) setPointer(flow.current.screenToFlowPosition({ x: event.clientX, y: event.clientY }));
          }}
          onPointerLeave={() => setPointer(null)}>
          <ReactFlow
            nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes}
            onInit={(instance) => { flow.current = instance; }}
            onNodesChange={handleNodeChanges}
            onNodeClick={(_, node) => { setMenu(null); state.selectStar(node.id); }}
            onEdgeClick={(_, edge) => { setMenu(null); state.selectEdge(edge.id); }}
            onEdgeContextMenu={(event, edge) => {
              event.preventDefault();
              state.selectEdge(edge.id);
              const rect = canvas.current?.getBoundingClientRect();
              if (rect) setMenu({ id: edge.id,
                x: Math.max(0, Math.min(event.clientX - rect.left, rect.width - 150)),
                y: Math.max(0, Math.min(event.clientY - rect.top, rect.height - 50)),
              });
            }}
            onPaneClick={() => { state.clearSelection(); setMenu(null); }}
            onMoveStart={() => setMenu(null)}
            onNodeDragStart={() => setMenu(null)}
            nodesConnectable={false} edgesReconnectable={false} deleteKeyCode={null}
            elevateEdgesOnSelect={false}
            colorMode="dark"
            fitView fitViewOptions={{ padding: 0.25 }} minZoom={0.25} maxZoom={2}
          >
            <Controls showInteractive={false} />
            {sourceCenter && pointer && (
              <ViewportPortal>
                <svg className="connection-preview" aria-hidden="true">
                  <line x1={sourceCenter.x} y1={sourceCenter.y}
                    x2={pointer.x} y2={pointer.y} />
                </svg>
              </ViewportPortal>
            )}
            {card && cardTarget && (
                <EdgeQuickCard key={card.id} edge={card} sourceName={starName(card.source)} targetStar={cardTarget}
                  onSave={({ label, tags }) => {
                    state.dispatch({ type: "update-connection", id: card.id, label, tags });
                    state.closeCard(); canvas.current?.focus();
                  }}
                  onClose={() => { state.closeCard(); canvas.current?.focus(); }}
                  onRemove={() => {
                    state.actions.removeConnection(card.id); setMenu(null); canvas.current?.focus();
                  }} />
            )}
          </ReactFlow>
          {menu && (
            <div className="edge-menu" role="group" aria-label="Connection actions"
              style={{ left: menu.x, top: menu.y }}>
              <button autoFocus onClick={() => {
                state.actions.removeConnection(menu.id); setMenu(null); canvas.current?.focus();
              }}>Delete link</button>
            </div>
          )}
        </div>
      </CanvasActions.Provider>
      <footer className="border-t px-3 py-2 text-sm">
        <p role="status" aria-live="polite">{state.message}</p>
        <p className="mt-1">Drag stars to move them. Select a link to edit its name and tags or delete it. Isolated stars are not constellations.</p>
      </footer>
    </main>
  );
}
