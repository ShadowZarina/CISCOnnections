import { describe, expect, test } from "bun:test";
import { createFlowNodes, getStarCenter, updateMeasurements } from "./flow-nodes.js";

const stars = [{ id: "a", name: "Star A", position: { x: 10, y: 20 } }];

describe("star connection center", () => {
  test("uses the placeholder center before dimensions have been measured", () => {
    expect(getStarCenter(stars[0])).toEqual({ x: 82, y: 60 });
  });

  test("follows the measured size and star position when the visual changes", () => {
    expect(getStarCenter({ ...stars[0], position: { x: -100, y: 200 } }, { width: 64, height: 64 }))
      .toEqual({ x: -68, y: 232 });
  });
});

describe("controlled canvas measurements", () => {
  test("retains measured dimensions when connection selection changes", () => {
    const measured = updateMeasurements({}, [
      { type: "dimensions", id: "a", dimensions: { width: 144, height: 80 } },
    ]);
    const nodes = createFlowNodes(stars, measured, "a", "a");
    expect(nodes[0].measured).toEqual({ width: 144, height: 80 });
    expect(nodes[0].data.isSource).toBe(true);
    const linked = createFlowNodes(stars, measured, null, null);
    expect(linked[0].measured).toBe(nodes[0].measured);
  });

  test("preserves geometry across drag events and ignores repeated measurement notifications", () => {
    const measured = { a: { width: 144, height: 80 } };
    expect(updateMeasurements(measured, [
      { type: "position", id: "a", position: { x: 100, y: 200 } },
      { type: "dimensions", id: "a", dimensions: { width: 144, height: 80 } },
    ])).toBe(measured);
    expect(createFlowNodes([{ ...stars[0], position: { x: 100, y: 200 } }], measured, null, null)[0])
      .toMatchObject({ position: { x: 100, y: 200 }, measured: measured.a });
  });

  test("updates only a changed measurement without mutating existing geometry", () => {
    const measured = { a: { width: 144, height: 80 } };
    const next = updateMeasurements(measured, [
      { type: "dimensions", id: "b", dimensions: { width: 144, height: 80 } },
    ]);
    expect(next.a).toBe(measured.a);
    expect(next.b).toEqual({ width: 144, height: 80 });
    expect(measured.b).toBeUndefined();
  });
});
