import { Graph, AlgorithmResult } from "../types";

export function bfs(
  graph: Graph,
  startId: string,
  endId: string
): AlgorithmResult {
  const queue: string[] = [startId];
  const visited = new Set<string>([startId]);
  const previous = new Map<string, string | null>();
  const visitedOrder: string[] = [];

  previous.set(startId, null);

  while (queue.length > 0) {
    const current = queue.shift()!;
    visitedOrder.push(current);

    if (current === endId) break;

    // Find all neighbors
    const edges = graph.edges.filter(
      (e) => e.from === current || e.to === current
    );

    for (const edge of edges) {
      const neighbor = edge.from === current ? edge.to : edge.from;

      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        previous.set(neighbor, current);
        queue.push(neighbor);
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

  if (path[0] !== startId) {
    return { visitedOrder, path: [], distance: 0 };
  }

  // BFS doesn't calculate actual distance, so use path length - 1
  return {
    visitedOrder,
    path,
    distance: path.length - 1,
  };
}
