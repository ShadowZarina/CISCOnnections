import { useState } from "react";
import { NodeToolbar, Position, useStore, useViewport } from "@xyflow/react";
import { STAR_HEIGHT, STAR_WIDTH } from "./flow-nodes.js";

export function EdgeQuickCard({ edge, sourceName, targetStar, onSave, onClose, onRemove }) {
  const [label, setLabel] = useState(edge.label ?? "");
  const [tags, setTags] = useState((edge.tags ?? []).join(", "));
  const { x, y, zoom } = useViewport();
  const canvasWidth = useStore((state) => state.width);
  const canvasHeight = useStore((state) => state.height);
  const left = targetStar.position.x * zoom + x;
  const right = left + STAR_WIDTH * zoom;
  const top = targetStar.position.y * zoom + y;
  const bottom = top + STAR_HEIGHT * zoom;
  const hasRightSpace = right + 316 <= canvasWidth;
  const hasLeftSpace = left >= 316;
  const position = hasRightSpace ? Position.Right : hasLeftSpace ? Position.Left
    : bottom + 300 <= canvasHeight ? Position.Bottom : Position.Top;
  const isBeside = position === Position.Right || position === Position.Left;
  const anchor = isBeside ? (top + bottom) / 2 : (left + right) / 2;
  const extent = isBeside ? canvasHeight : canvasWidth;
  const align = anchor < extent / 3 ? "start" : anchor > extent * 2 / 3 ? "end" : "center";

  return (
    <NodeToolbar nodeId={targetStar.id} isVisible position={position} align={align} offset={16}
      className="nodrag nopan nowheel" style={{ zIndex: 30 }}>
    <section className="edge-card" aria-label="Connection details"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}>
      <p>{sourceName} — {targetStar.name}</p>
      <form onSubmit={(event) => {
        event.preventDefault(); onSave({ label, tags: tags.split(",") });
      }}>
        <label htmlFor="edge-label">Connection name (optional)</label>
        <input id="edge-label" value={label} maxLength={120} placeholder="Unnamed connection"
          onChange={(event) => setLabel(event.target.value)} />
        <label htmlFor="edge-tags" className="field-label">Tags (optional)</label>
        <input id="edge-tags" value={tags} maxLength={300} placeholder="team, project"
          aria-describedby="edge-tags-hint" onChange={(event) => setTags(event.target.value)} />
        <p id="edge-tags-hint" className="field-hint">Separate tags with commas.</p>
        <div className="flex flex-wrap gap-2 mt-3">
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Dismiss</button>
          <button type="button" onClick={onRemove}>Delete link</button>
        </div>
      </form>
    </section>
    </NodeToolbar>
  );
}
