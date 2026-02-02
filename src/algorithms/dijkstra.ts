import { Graph, AlgorithmResult } from "../types";

export function dijkstra(
  graph: Graph,
  startId: string,
  endId: string
): AlgorithmResult {
  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const visited = new Set<string>();
  const visitedOrder: string[] = [];

  // Initialize
  graph.nodes.forEach((node) => {
    distances.set(node.id, Infinity);
    previous.set(node.id, null);
  });
  distances.set(startId, 0);

  while (visited.size < graph.nodes.length) {
    // Find unvisited node with smallest distance
    let current: string | null = null;
    let minDist = Infinity;

    for (const node of graph.nodes) {
      if (!visited.has(node.id)) {
        const dist = distances.get(node.id)!;
        if (dist < minDist) {
          minDist = dist;
          current = node.id;
        }
      }
    }

    if (current === null || minDist === Infinity) break;

    visited.add(current);
    visitedOrder.push(current);

    // Early exit if we reached the end
    if (current === endId) break;

    // Update distances to neighbors
    const edges = graph.edges.filter(
      (e) => e.from === current || e.to === current
    );

    for (const edge of edges) {
      const neighbor = edge.from === current ? edge.to : edge.from;
      if (visited.has(neighbor)) continue;

      const newDist = distances.get(current)! + edge.weight;
      if (newDist < distances.get(neighbor)!) {
        distances.set(neighbor, newDist);
        previous.set(neighbor, current);
      }
    }
  }

  // Reconstruct path
  const path: string[] = [];
  let current: string | null = endId;

  while (current !== null) {
    path.unshift(current);
    current = previous.get(current)!;
  }

  // If path doesn't start with startId, no path exists
  if (path[0] !== startId) {
    return { visitedOrder, path: [], distance: Infinity };
  }

  return {
    visitedOrder,
    path,
    distance: distances.get(endId) || Infinity,
  };
}
