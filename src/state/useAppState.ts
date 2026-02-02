import { create } from "zustand";
import { AppState, Algorithm, Mode } from "../types";
import { secretGraph, START_NODE, END_NODE } from "../data/secretGraph";

interface AppActions {
  setMode: (mode: Mode) => void;
  setAlgorithm: (algorithm: Algorithm) => void;
  setSpeed: (speedMs: number) => void;
  setStartNode: (nodeId: string) => void;
  setEndNode: (nodeId: string) => void;
  setVisitedOrder: (order: string[]) => void;
  setPath: (path: string[]) => void;
  setDistance: (distance: number) => void;
  addLog: (message: string) => void;
  clearLogs: () => void;
  reset: () => void;
}

const initialState: AppState = {
  mode: "neutral",
  algorithm: "dijkstra",
  speedMs: 300,
  graph: secretGraph,
  startNodeId: START_NODE,
  endNodeId: END_NODE,
  visitedOrder: [],
  path: [],
  logs: [],
  distance: 0,
};

export const useAppState = create<AppState & AppActions>((set) => ({
  ...initialState,

  setMode: (mode) => set({ mode }),
  setAlgorithm: (algorithm) => set({ algorithm }),
  setSpeed: (speedMs) => set({ speedMs }),
  setStartNode: (nodeId) => set({ startNodeId: nodeId }),
  setEndNode: (nodeId) => set({ endNodeId: nodeId }),
  setVisitedOrder: (order) => set({ visitedOrder: order }),
  setPath: (path) => set({ path }),
  setDistance: (distance) => set({ distance }),
  addLog: (message) =>
    set((state) => ({ logs: [...state.logs, message] })),
  clearLogs: () => set({ logs: [] }),
  reset: () => set(initialState),
}));
