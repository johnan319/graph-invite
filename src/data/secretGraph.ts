import { Graph } from "../types";

// This graph is carefully designed so the shortest path from A to Z
// goes through nodes that spell out: WILL YOU BE MY VALENTINE
// The tags are hidden initially and revealed during decode
//
// Optimal path: A → F → L → Q → Z (distance: 32)
// All alternative paths are longer (35+)

export const secretGraph: Graph = {
  nodes: [
    // SECRET PATH NODES (shortest route A → F → L → Q → Z)
    { id: "A", label: "A", tag: "WILL", x: 80, y: 300 },
    { id: "F", label: "F", tag: "YOU", x: 220, y: 280 },
    { id: "L", label: "L", tag: "BE", x: 380, y: 260 },
    { id: "Q", label: "Q", tag: "MY", x: 540, y: 280 },
    { id: "Z", label: "Z", tag: "VALENTINE", x: 720, y: 300 },

    // DECOY LAYER 1 - Near start
    { id: "B", label: "B", tag: "node", x: 120, y: 180 },
    { id: "C", label: "C", tag: "edge", x: 140, y: 420 },
    { id: "D", label: "D", tag: "vertex", x: 180, y: 120 },
    { id: "E", label: "E", tag: "weight", x: 160, y: 500 },

    // DECOY LAYER 2 - Early middle
    { id: "G", label: "G", tag: "heap", x: 260, y: 160 },
    { id: "H", label: "H", tag: "stack", x: 280, y: 400 },
    { id: "I", label: "I", tag: "queue", x: 240, y: 520 },
    { id: "J", label: "J", tag: "tree", x: 300, y: 80 },

    // DECOY LAYER 3 - Middle
    { id: "K", label: "K", tag: "graph", x: 340, y: 140 },
    { id: "M", label: "M", tag: "array", x: 420, y: 380 },
    { id: "N", label: "N", tag: "list", x: 360, y: 480 },
    { id: "O", label: "O", tag: "hash", x: 440, y: 100 },

    // DECOY LAYER 4 - Late middle
    { id: "P", label: "P", tag: "sort", x: 500, y: 160 },
    { id: "R", label: "R", tag: "search", x: 580, y: 400 },
    { id: "S", label: "S", tag: "data", x: 520, y: 480 },
    { id: "T", label: "T", tag: "struct", x: 600, y: 100 },

    // DECOY LAYER 5 - Near end
    { id: "U", label: "U", tag: "pointer", x: 640, y: 180 },
    { id: "V", label: "V", tag: "binary", x: 660, y: 420 },
    { id: "W", label: "W", tag: "depth", x: 700, y: 500 },
    { id: "X", label: "X", tag: "breadth", x: 680, y: 80 },
    { id: "Y", label: "Y", tag: "traverse", x: 760, y: 180 },
  ],
  edges: [
    // ============================================
    // OPTIMAL PATH: A → F → L → Q → Z (total: 32)
    // ============================================
    { id: "e1", from: "A", to: "F", weight: 8 },
    { id: "e2", from: "F", to: "L", weight: 7 },
    { id: "e3", from: "L", to: "Q", weight: 9 },
    { id: "e4", from: "Q", to: "Z", weight: 8 },

    // ============================================
    // TEMPTING ALTERNATIVES (all slightly longer)
    // ============================================

    // From A - multiple tempting options
    { id: "e5", from: "A", to: "B", weight: 5 },   // Looks good but...
    { id: "e6", from: "A", to: "C", weight: 9 },
    { id: "e7", from: "A", to: "D", weight: 6 },
    { id: "e8", from: "A", to: "E", weight: 11 },

    // B connections - seems promising
    { id: "e9", from: "B", to: "D", weight: 4 },
    { id: "e10", from: "B", to: "F", weight: 7 },  // B→F = 12 total (vs A→F = 8)
    { id: "e11", from: "B", to: "G", weight: 6 },

    // C connections
    { id: "e12", from: "C", to: "E", weight: 5 },
    { id: "e13", from: "C", to: "H", weight: 7 },
    { id: "e14", from: "C", to: "I", weight: 8 },

    // D connections
    { id: "e15", from: "D", to: "J", weight: 5 },
    { id: "e16", from: "D", to: "G", weight: 6 },
    { id: "e17", from: "D", to: "K", weight: 7 },

    // E connections
    { id: "e18", from: "E", to: "I", weight: 6 },
    { id: "e19", from: "E", to: "H", weight: 8 },

    // G connections (early middle layer)
    { id: "e20", from: "G", to: "J", weight: 5 },
    { id: "e21", from: "G", to: "K", weight: 4 },
    { id: "e22", from: "G", to: "F", weight: 8 },

    // H connections
    { id: "e23", from: "H", to: "M", weight: 6 },
    { id: "e24", from: "H", to: "N", weight: 5 },
    { id: "e25", from: "H", to: "L", weight: 10 },

    // I connections
    { id: "e26", from: "I", to: "N", weight: 7 },
    { id: "e27", from: "I", to: "M", weight: 8 },

    // J connections
    { id: "e28", from: "J", to: "K", weight: 6 },
    { id: "e29", from: "J", to: "O", weight: 7 },

    // K connections (middle layer)
    { id: "e30", from: "K", to: "O", weight: 5 },
    { id: "e31", from: "K", to: "L", weight: 9 },  // Alternative to F→L

    // L connections (on optimal path)
    { id: "e32", from: "L", to: "M", weight: 8 },
    { id: "e33", from: "L", to: "P", weight: 10 },
    { id: "e34", from: "L", to: "O", weight: 7 },

    // M connections
    { id: "e35", from: "M", to: "N", weight: 5 },
    { id: "e36", from: "M", to: "R", weight: 7 },
    { id: "e37", from: "M", to: "Q", weight: 11 }, // M→Q longer than L→Q

    // N connections
    { id: "e38", from: "N", to: "S", weight: 6 },
    { id: "e39", from: "N", to: "R", weight: 8 },

    // O connections
    { id: "e40", from: "O", to: "P", weight: 6 },
    { id: "e41", from: "O", to: "T", weight: 7 },

    // P connections (late middle)
    { id: "e42", from: "P", to: "Q", weight: 10 }, // Alternative to L→Q
    { id: "e43", from: "P", to: "T", weight: 6 },
    { id: "e44", from: "P", to: "U", weight: 7 },

    // Q connections (on optimal path)
    { id: "e45", from: "Q", to: "R", weight: 9 },
    { id: "e46", from: "Q", to: "U", weight: 10 },
    { id: "e47", from: "Q", to: "Y", weight: 12 },

    // R connections
    { id: "e48", from: "R", to: "S", weight: 6 },
    { id: "e49", from: "R", to: "V", weight: 7 },
    { id: "e50", from: "R", to: "Z", weight: 11 }, // R→Z longer than Q→Z

    // S connections
    { id: "e51", from: "S", to: "V", weight: 6 },
    { id: "e52", from: "S", to: "W", weight: 8 },

    // T connections
    { id: "e53", from: "T", to: "X", weight: 5 },
    { id: "e54", from: "T", to: "U", weight: 6 },

    // U connections (near end)
    { id: "e55", from: "U", to: "Y", weight: 7 },
    { id: "e56", from: "U", to: "X", weight: 6 },
    { id: "e57", from: "U", to: "V", weight: 9 },

    // V connections
    { id: "e58", from: "V", to: "W", weight: 5 },
    { id: "e59", from: "V", to: "Z", weight: 9 },  // V→Z close but not optimal

    // W connections
    { id: "e60", from: "W", to: "Z", weight: 10 },

    // X connections
    { id: "e61", from: "X", to: "Y", weight: 6 },
    { id: "e62", from: "X", to: "Z", weight: 12 },

    // Y connections
    { id: "e63", from: "Y", to: "Z", weight: 11 },

    // ============================================
    // CROSS-CONNECTIONS for realism
    // ============================================
    { id: "e64", from: "B", to: "K", weight: 12 },
    { id: "e65", from: "C", to: "M", weight: 14 },
    { id: "e66", from: "D", to: "O", weight: 13 },
    { id: "e67", from: "E", to: "S", weight: 16 },
    { id: "e68", from: "G", to: "P", weight: 11 },
    { id: "e69", from: "J", to: "T", weight: 10 },
    { id: "e70", from: "N", to: "V", weight: 12 },
  ],
};

export const START_NODE = "A";
export const END_NODE = "Z";
