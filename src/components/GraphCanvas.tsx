import { motion } from "framer-motion";
import { useAppState } from "../state/useAppState";
import { NodeStatus } from "../types";
import { useState, useMemo, useEffect } from "react";

export default function GraphCanvas() {
  const { graph, visitedOrder, path, mode } = useAppState();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [currentlyVisiting, setCurrentlyVisiting] = useState<string | null>(null);

  // Track which node is currently being visited
  useEffect(() => {
    if (mode === "running" && visitedOrder.length > 0) {
      setCurrentlyVisiting(visitedOrder[visitedOrder.length - 1]);
    } else {
      setCurrentlyVisiting(null);
    }
  }, [visitedOrder, mode]);

  // Determine node status based on algorithm state
  const getNodeStatus = (nodeId: string): NodeStatus => {
    if (currentlyVisiting === nodeId && mode === "running") return "visiting";
    if (path.includes(nodeId)) return "path";
    if (visitedOrder.includes(nodeId)) return "visited";
    return "idle";
  };

  // Calculate reveal positions for Valentine message
  const revealPositions = useMemo(() => {
    if (mode !== "reveal" && mode !== "final") return null;

    // Get the tags from path nodes - these form the message
    const pathNodes = path.map((nodeId) => ({
      nodeId,
      tag: graph.nodes.find((n) => n.id === nodeId)?.tag || "",
    }));

    const positions = new Map<string, { x: number; y: number; label: string }>();

    // Arrange the words in multiple lines to form the question
    const centerX = 400;
    const startY = 180;
    const lineHeight = 70;
    const wordSpacing = 100;

    // Line 1: "WILL YOU"
    const line1Words = pathNodes.slice(0, 2);
    const line1Width = line1Words.reduce((sum, w) => sum + w.tag.length * 12 + wordSpacing, 0) - wordSpacing;
    let currentX = centerX - line1Width / 2;

    line1Words.forEach((node) => {
      const wordWidth = node.tag.length * 12;
      positions.set(node.nodeId, {
        x: currentX + wordWidth / 2,
        y: startY,
        label: node.tag,
      });
      currentX += wordWidth + wordSpacing;
    });

    // Line 2: "BE MY"
    const line2Words = pathNodes.slice(2, 4);
    const line2Width = line2Words.reduce((sum, w) => sum + w.tag.length * 12 + wordSpacing, 0) - wordSpacing;
    currentX = centerX - line2Width / 2;

    line2Words.forEach((node) => {
      const wordWidth = node.tag.length * 12;
      positions.set(node.nodeId, {
        x: currentX + wordWidth / 2,
        y: startY + lineHeight,
        label: node.tag,
      });
      currentX += wordWidth + wordSpacing;
    });

    // Line 3: "VALENTINE?"
    if (pathNodes.length > 4) {
      positions.set(pathNodes[4].nodeId, {
        x: centerX,
        y: startY + lineHeight * 2,
        label: pathNodes[4].tag + "?",
      });
    }

    return positions;
  }, [mode, path, graph.nodes]);

  const getNodeColor = (status: NodeStatus) => {
    switch (status) {
      case "visiting":
        return "#fbbf24";
      case "visited":
        return "#60a5fa";
      case "path":
        return mode === "reveal" || mode === "final" ? "#f472b6" : "#34d399";
      default:
        return "#94a3b8";
    }
  };

  // Check if edge is being traversed (current and previous visited node)
  const isEdgeActive = (fromId: string, toId: string) => {
    if (mode !== "running" || visitedOrder.length < 2) return false;
    const lastTwo = visitedOrder.slice(-2);
    return (
      (lastTwo[0] === fromId && lastTwo[1] === toId) ||
      (lastTwo[0] === toId && lastTwo[1] === fromId)
    );
  };

  return (
    <div className="graph-canvas">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
        style={{ background: "#1e293b", borderRadius: "8px", maxHeight: "600px" }}
      >
        {/* Glow filter for visiting nodes */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        <g opacity={mode === "reveal" || mode === "final" ? 0.2 : 1}>
          {graph.edges.map((edge) => {
            const fromNode = graph.nodes.find((n) => n.id === edge.from);
            const toNode = graph.nodes.find((n) => n.id === edge.to);

            if (!fromNode || !toNode) return null;

            const isInPath =
              path.includes(edge.from) && path.includes(edge.to);
            const isActive = isEdgeActive(edge.from, edge.to);

            return (
              <g key={edge.id}>
                <motion.line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isActive ? "#fbbf24" : isInPath ? "#34d399" : "#475569"}
                  strokeWidth={isActive ? 4 : isInPath ? 3 : 1.5}
                  opacity={isActive ? 1 : isInPath ? 0.8 : 0.4}
                  animate={{
                    strokeWidth: isActive ? [3, 5, 3] : isInPath ? 3 : 1.5,
                  }}
                  transition={{ duration: 0.5 }}
                />
                {/* Weight label */}
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2 - 5}
                  fill="#94a3b8"
                  fontSize="11"
                  fontFamily="monospace"
                  textAnchor="middle"
                  opacity={mode === "reveal" || mode === "final" ? 0.1 : 0.6}
                >
                  {edge.weight}
                </text>
              </g>
            );
          })}
        </g>

        {/* Nodes */}
        {graph.nodes.map((node) => {
          const status = getNodeStatus(node.id);
          const isHovered = hoveredNode === node.id;
          const revealPos = revealPositions?.get(node.id);

          return (
            <motion.g
              key={node.id}
              animate={
                revealPos
                  ? { x: revealPos.x - node.x, y: revealPos.y - node.y }
                  : { x: 0, y: 0 }
              }
              transition={{ duration: 1.5, ease: "easeInOut" }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onTouchStart={() => setHoveredNode(node.id)}
              onTouchEnd={() => setHoveredNode(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Outer glow ring for visiting nodes */}
              {status === "visiting" && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={28}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0.8, 0.2, 0.8],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}

              {/* Main node circle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={isHovered ? 22 : 18}
                fill={getNodeColor(status)}
                stroke={
                  mode === "reveal" || mode === "final" ? "#f472b6" : "#1e293b"
                }
                strokeWidth={status === "visiting" ? 3 : 2}
                filter={status === "visiting" ? "url(#strongGlow)" : status === "path" ? "url(#glow)" : undefined}
                animate={{
                  scale: status === "visiting" ? [1, 1.15, 1] : 1,
                  opacity: mode === "reveal" || mode === "final" ? 0.1 : 1,
                }}
                transition={{
                  scale: { duration: 0.6, repeat: status === "visiting" ? Infinity : 0 },
                  opacity: { duration: 0.5 }
                }}
                style={{
                  transformOrigin: `${node.x}px ${node.y}px`
                }}
              />

              {/* Node label */}
              <motion.text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={
                  mode === "reveal" || mode === "final" ? "#f472b6" : "#0f172a"
                }
                fontSize={
                  mode === "reveal" || mode === "final" ? "24" : "14"
                }
                fontWeight={
                  mode === "reveal" || mode === "final" ? "700" : "600"
                }
                fontFamily={
                  mode === "reveal" || mode === "final"
                    ? "Georgia, serif"
                    : "monospace"
                }
                pointerEvents="none"
                animate={{
                  scale: status === "visiting" ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.6, repeat: status === "visiting" ? Infinity : 0 }}
                style={{
                  transformOrigin: `${node.x}px ${node.y}px`
                }}
              >
                {revealPos ? revealPos.label : node.label}
              </motion.text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
