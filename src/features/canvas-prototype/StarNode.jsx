import { useEffect } from "react";
import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";
import { useCanvasActions } from "./canvas-context.js";

export function StarNode({ id, data, selected }) {
  const actions = useCanvasActions();
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => { updateNodeInternals(id); }, [id, updateNodeInternals]);

  return (
    <div className={`star-node ${selected ? "is-selected" : ""} ${data.isSource ? "is-source" : ""}`}>
      <Handle id="in" className="star-center-handle" type="target" position={Position.Left} isConnectable={false} />
      <button className="star-name nodrag nopan" aria-label={`Select ${data.name}`}
        onClick={(event) => { event.stopPropagation(); actions.selectStar(id); }}>{data.name}</button>
      {data.isSource ? <span className="star-action">Source selected</span> : data.choosingTarget ? (
        <button className="nodrag nopan" onClick={(event) => {
          event.stopPropagation(); actions.chooseTarget(id);
        }} aria-label={`Connect to ${data.name}`}>Link here</button>
      ) : selected ? (
        <button className="nodrag nopan" onClick={(event) => {
          event.stopPropagation(); actions.startConnection(id);
        }} aria-label={`Connect from ${data.name}`}>Connect</button>
      ) : <span className="star-action">Select to connect</span>}
      <Handle id="out" className="star-center-handle" type="source" position={Position.Right} isConnectable={false} />
    </div>
  );
}
