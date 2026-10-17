import { describe, expect, test } from "bun:test";
import { canConnect, getConstellations, graphReducer } from "./graph.js";

const star = (id, systemId = "general", galaxyId = "prototype") => ({
  id, name: id, systemId, galaxyId, position: { x: 0, y: 0 },
});
const stars = [star("a"), star("b"), star("c"), star("d"), star("e")];
const graph = { stars, connections: [] };
const connect = (value, source, target) =>
  graphReducer(value, { type: "connect", source, target, id: `${source}-${target}` });

describe("connection policy", () => {
  test("allows many connections from or to the same star", () => {
    const result = connect(connect(connect(graph, "a", "b"), "c", "b"), "b", "d");
    expect(result.connections).toHaveLength(3);
    expect(result.connections.every((edge) => edge.label === undefined)).toBe(true);
  });

  test("rejects duplicates in either direction", () => {
    const linked = connect(graph, "a", "b");
    expect(canConnect(linked, "a", "b").allowed).toBe(false);
    expect(canConnect(linked, "b", "a").allowed).toBe(false);
    expect(connect(linked, "b", "a")).toBe(linked);
  });

  test("rejects self-links, missing stars, and crossed boundaries", () => {
    expect(canConnect(graph, "a", "a").allowed).toBe(false);
    expect(canConnect(graph, "a", "missing").allowed).toBe(false);
    const boundaries = { ...graph, stars: [...stars, star("x", "other"), star("y", "general", "other")] };
    expect(canConnect(boundaries, "a", "x").allowed).toBe(false);
    expect(canConnect(boundaries, "a", "y").allowed).toBe(false);
  });
});

describe("derived constellations", () => {
  test("excludes isolated stars and merges and splits connected groups", () => {
    let result = connect(connect(graph, "a", "b"), "c", "d");
    expect(getConstellations(result)).toEqual([["a", "b"], ["c", "d"]]);
    result = connect(result, "b", "c");
    expect(getConstellations(result)).toEqual([["a", "b", "c", "d"]]);
    result = graphReducer(result, { type: "remove-connection", id: "b-c" });
    expect(getConstellations(result)).toEqual([["a", "b"], ["c", "d"]]);
  });

  test("handles a cycle as one component", () => {
    const result = connect(connect(connect(graph, "a", "b"), "b", "c"), "c", "a");
    expect(getConstellations(result)).toEqual([["a", "b", "c"]]);
  });
});

describe("graph edits", () => {
  test("saves optional text and normalized tags without changing the constellation", () => {
    const linked = connect(graph, "a", "b");
    expect(linked.connections[0].tags).toEqual([]);
    const edited = graphReducer(linked, {
      type: "update-connection", id: "a-b", label: "  Works with  ",
      tags: [" team ", "project", "", "team"],
    });
    expect(edited.connections[0]).toMatchObject({ label: "Works with", tags: ["team", "project"] });
    expect(linked.connections[0].tags).toEqual([]);
    expect(getConstellations(edited)).toEqual([["a", "b"]]);
    const cleared = graphReducer(edited, { type: "update-connection", id: "a-b", label: "", tags: [] });
    expect(cleared.connections[0].label).toBeUndefined();
    expect(cleared.connections[0].tags).toEqual([]);
    expect(cleared.connections).toHaveLength(1);
  });

  test("moving and labeling preserve topology and do not mutate the previous graph", () => {
    const linked = connect(graph, "a", "b");
    const moved = graphReducer(linked, { type: "move", positions: [{ id: "a", position: { x: 15, y: 30 } }] });
    const labeled = graphReducer(moved, { type: "update-connection", id: "a-b", label: "  Related  ", tags: [] });
    expect(linked.stars[0]?.position).toEqual({ x: 0, y: 0 });
    expect(labeled.stars[0]?.position).toEqual({ x: 15, y: 30 });
    expect(labeled.connections[0]?.label).toBe("Related");
    expect(getConstellations(labeled)).toEqual([["a", "b"]]);
    const cleared = graphReducer(labeled, { type: "update-connection", id: "a-b", label: " ", tags: [] });
    expect(cleared.connections[0]?.label).toBeUndefined();
    expect(cleared.connections).toHaveLength(1);
  });
});
