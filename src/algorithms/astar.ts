import { Graph, AlgorithmResult } from "../types";

// Euclidean distance heuristic
function heuristic(
  nodeId: string,
  targetId: string,
  graph: Graph
): number {
  const node = graph.nodes.find((n) => n.id === nodeId);
  const target = graph.nodes.find((n) => n.id === targetId);

  if (!node || !target) return 0;

  const dx = node.x - target.x;
  const dy = node.y - target.y;
  return Math.sqrt(dx * dx + dy * dy) / 100; // Scale down for reasonable weights
}

export function astar(
  graph: Graph,
  startId: string,
  endId: string
): AlgorithmResult {
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const visited = new Set<string>();
  const visitedOrder: string[] = [];

  // Initialize
  graph.nodes.forEach((node) => {
    gScore.set(node.id, Infinity);
    fScore.set(node.id, Infinity);
    previous.set(node.id, null);
  });

  gScore.set(startId, 0);
  fScore.set(startId, heuristic(startId, endId, graph));

  const openSet = new Set([startId]);

  while (openSet.size > 0) {
    // Find node in openSet with lowest fScore
    let current: string | null = null;
    let minF = Infinity;

    for (const nodeId of openSet) {
      const f = fScore.get(nodeId)!;
      if (f < minF) {
        minF = f;
        current = nodeId;
      }
    }

    if (current === null) break;

    visitedOrder.push(current);

    if (current === endId) {
      // Reconstruct path
      const path: string[] = [];
      let curr: string | null = endId;

      while (curr !== null) {
        path.unshift(curr);
        curr = previous.get(curr)!;
      }

      return {
        visitedOrder,
        path,
        distance: gScore.get(endId) || Infinity,
      };
    }

    openSet.delete(current);
    visited.add(current);

    // Check all neighbors
    const edges = graph.edges.filter(
      (e) => e.from === current || e.to === current
    );

    for (const edge of edges) {
      const neighbor = edge.from === current ? edge.to : edge.from;
      if (visited.has(neighbor)) continue;

      const tentativeG = gScore.get(current)! + edge.weight;

      if (tentativeG < gScore.get(neighbor)!) {
        previous.set(neighbor, current);
        gScore.set(neighbor, tentativeG);
        fScore.set(
          neighbor,
          tentativeG + heuristic(neighbor, endId, graph)
        );

        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
        }
      }
    }
  }

  return { visitedOrder, path: [], distance: Infinity };
}
