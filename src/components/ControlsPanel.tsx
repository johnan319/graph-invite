import { useAppState } from "../state/useAppState";
import { dijkstra } from "../algorithms/dijkstra";
import { bfs } from "../algorithms/bfs";
import { astar } from "../algorithms/astar";
import { Algorithm } from "../types";

export default function ControlsPanel() {
  const {
    algorithm,
    setAlgorithm,
    speedMs,
    setSpeed,
    startNodeId,
    endNodeId,
    setStartNode,
    setEndNode,
    graph,
    mode,
    setMode,
    setVisitedOrder,
    setPath,
    setDistance,
    clearLogs,
    addLog,
    reset,
  } = useAppState();

  const handleRun = async () => {
    if (mode === "running") return;

    setMode("running");
    clearLogs();
    setVisitedOrder([]);
    setPath([]);

    addLog(`[INFO] Running ${algorithm.toUpperCase()} algorithm`);
    addLog(`[INFO] Start: ${startNodeId}, End: ${endNodeId}`);

    // Run selected algorithm
    let result;
    switch (algorithm) {
      case "dijkstra":
        result = dijkstra(graph, startNodeId, endNodeId);
        break;
      case "bfs":
        result = bfs(graph, startNodeId, endNodeId);
        break;
      case "astar":
        result = astar(graph, startNodeId, endNodeId);
        break;
    }

    // Animate traversal
    for (let i = 0; i < result.visitedOrder.length; i++) {
      const nodeId = result.visitedOrder[i];
      setVisitedOrder(result.visitedOrder.slice(0, i + 1));
      addLog(`[VISIT] Exploring node ${nodeId}`);
      await new Promise((resolve) => setTimeout(resolve, speedMs));
    }

    // Show final path
    setPath(result.path);
    setDistance(result.distance);

    if (result.path.length > 0) {
      addLog(`[SUCCESS] Path found: ${result.path.join(" → ")}`);
      addLog(`[INFO] Total distance: ${result.distance.toFixed(2)}`);
      setMode("results");
    } else {
      addLog(`[ERROR] No path found`);
      setMode("neutral");
    }
  };

  const speeds = [
    { label: "Slow", value: 600 },
    { label: "Normal", value: 300 },
    { label: "Fast", value: 100 },
  ];

  const algorithms: { label: string; value: Algorithm }[] = [
    { label: "Dijkstra", value: "dijkstra" },
    { label: "A*", value: "astar" },
    { label: "BFS", value: "bfs" },
  ];

  const canRun = mode === "neutral" || mode === "results";

  return (
    <div className="controls-panel">
      <h2>Graph Pathfinding Sandbox</h2>

      <div className="control-group">
        <label>Algorithm</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
          disabled={!canRun}
        >
          {algorithms.map((alg) => (
            <option key={alg.value} value={alg.value}>
              {alg.label}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label>Start Node</label>
        <select
          value={startNodeId}
          onChange={(e) => setStartNode(e.target.value)}
          disabled={!canRun}
        >
          {graph.nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.id}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label>End Node</label>
        <select
          value={endNodeId}
          onChange={(e) => setEndNode(e.target.value)}
          disabled={!canRun}
        >
          {graph.nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.id}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label>Speed</label>
        <div className="speed-buttons">
          {speeds.map((speed) => (
            <button
              key={speed.value}
              className={speedMs === speed.value ? "active" : ""}
              onClick={() => setSpeed(speed.value)}
              disabled={!canRun}
            >
              {speed.label}
            </button>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <button
          className="btn-primary"
          onClick={handleRun}
          disabled={!canRun}
        >
          {mode === "running" ? "Running..." : "Run Algorithm"}
        </button>
        <button className="btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="meta-info">
        <div className="info-item">
          <span className="label">Dataset:</span>
          <span className="value">Sample Graph 04</span>
        </div>
        <div className="info-item">
          <span className="label">Complexity:</span>
          <span className="value">
            {algorithm === "dijkstra" || algorithm === "astar"
              ? "O(E log V)"
              : "O(V + E)"}
          </span>
        </div>
      </div>
    </div>
  );
}
