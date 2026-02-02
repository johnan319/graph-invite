import { useAppState } from "../state/useAppState";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const { logs, mode, path, distance, graph, setMode } = useAppState();

  const handleDecode = () => {
    setMode("reveal");
  };

  // Extract tags from path nodes
  const pathMetadata =
    path.length > 0
      ? path
          .map((nodeId) => graph.nodes.find((n) => n.id === nodeId)?.tag)
          .filter(Boolean)
      : [];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Output Console</h3>
        <div className="status-indicator">
          <span className={`status-dot ${mode}`}></span>
          <span className="status-text">
            {mode === "neutral" && "Ready"}
            {mode === "running" && "Running"}
            {mode === "results" && "Complete"}
            {mode === "reveal" && "Decoding"}
            {mode === "final" && "Complete"}
          </span>
        </div>
      </div>

      <div className="logs-container">
        {logs.map((log, i) => (
          <div key={i} className="log-entry">
            {log}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {mode === "results" && (
          <motion.div
            className="results-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h4>Results Summary</h4>
            <div className="result-item">
              <span className="label">Path:</span>
              <span className="value">{path.join(" → ")}</span>
            </div>
            <div className="result-item">
              <span className="label">Distance:</span>
              <span className="value">{distance.toFixed(2)}</span>
            </div>
            {pathMetadata.length > 0 && (
              <div className="result-item metadata">
                <span className="label">Path metadata:</span>
                <span className="value">{pathMetadata.join(" → ")}</span>
              </div>
            )}

            <motion.button
              className="btn-decode"
              onClick={handleDecode}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                boxShadow: [
                  "0 0 0 0 rgba(244, 114, 182, 0)",
                  "0 0 0 8px rgba(244, 114, 182, 0.2)",
                  "0 0 0 0 rgba(244, 114, 182, 0)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              Decode Path
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
