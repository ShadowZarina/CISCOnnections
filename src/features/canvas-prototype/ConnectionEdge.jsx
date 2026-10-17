import { BaseEdge, getStraightPath } from "@xyflow/react";
import { useCanvasActions } from "./canvas-context.js";

export function ConnectionEdge(props) {
  const actions = useCanvasActions();
  const [path, x, y] = getStraightPath(props);
  return (
    <g className={`connection-edge ${props.selected ? "is-selected" : ""}`}>
      <BaseEdge id={props.id} path={path} interactionWidth={24}
        style={{ stroke: "currentColor", strokeWidth: props.selected ? 3 : 2, fill: "none" }} />
      {typeof props.label === "string" && props.label && (
        <text x={x} y={y - 20} textAnchor="middle" className="edge-text">{props.label}</text>
      )}
      <foreignObject x={x - 14} y={y - 14} width={28} height={28}>
        <button className="edge-delete nodrag nopan" aria-label="Delete connection"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => { event.stopPropagation(); actions.removeConnection(props.id); }}>×</button>
      </foreignObject>
    </g>
  );
}
