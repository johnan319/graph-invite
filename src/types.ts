export interface Node {
  id: string;
  label: string;
  tag: string; // Hidden meaning - will be used for reveal
  x: number;
  y: number;
  meta?: {
    weightBias?: number;
  };
}

export interface Edge {
  id: string;
  from: string;
  to: string;
  weight: number;
}

export interface Graph {
  nodes: Node[];
  edges: Edge[];
}

export type Algorithm = "dijkstra" | "astar" | "bfs";
export type Mode = "neutral" | "running" | "results" | "reveal" | "final";
export type NodeStatus = "idle" | "visiting" | "visited" | "path";

export interface AlgorithmResult {
  visitedOrder: string[];
  path: string[];
  distance: number;
}

export interface AppState {
  mode: Mode;
  algorithm: Algorithm;
  speedMs: number;
  graph: Graph;
  startNodeId: string;
  endNodeId: string;
  visitedOrder: string[];
  path: string[];
  logs: string[];
  distance: number;
}
