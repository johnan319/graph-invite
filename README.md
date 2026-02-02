# Graph Pathfinding Visualizer (Valentine's Edition)

A React-based interactive graph pathfinding demonstration tool with a romantic surprise! 🎯❤️

## What is this?

At first glance, this appears to be a professional algorithm visualization tool for demonstrating graph pathfinding algorithms (Dijkstra, A*, BFS). However, it contains a hidden Valentine's Day surprise that reveals itself through the shortest path!

## The Surprise

The graph is specially designed so that the shortest path from node A to node N goes through nodes whose hidden tags spell out: **"WILL YOU BE MY VALENTINE?"**

After running the algorithm successfully, a "Decode Path" button appears. Clicking it triggers a beautiful animation where the nodes morph and rearrange to reveal the romantic message!

## Features

### Legitimate Dev Tool Features
- **Multiple Algorithms**: Dijkstra's Algorithm, A* Search, and Breadth-First Search
- **Visual Animation**: Watch the algorithm explore nodes in real-time
- **Adjustable Speed**: Slow, Normal, or Fast animation speeds
- **Console Logs**: Detailed step-by-step algorithm execution logs
- **Path Visualization**: Clear highlighting of visited nodes and final shortest path
- **Complexity Display**: Shows Big-O notation for selected algorithm

### Hidden Valentine Features
- Secret graph design where shortest path encodes a message
- Smooth morph animation revealing the message
- Confetti celebration
- Interactive "Yes" button with final confirmation
- Professional appearance that doesn't give away the surprise

## Tech Stack

- **React** with Vite
- **Framer Motion** for smooth animations
- **Zustand** for state management
- **SVG** for graph rendering
- Pure frontend (no backend required)

## How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## How to Use

1. **Select Algorithm**: Choose between Dijkstra, A*, or BFS
2. **Set Parameters**: Keep the default start (A) and end (N) nodes for the surprise to work
3. **Adjust Speed**: Choose your preferred animation speed
4. **Run Algorithm**: Click "Run Algorithm" and watch it work!
5. **Decode Path**: After completion, click the glowing "Decode Path" button
6. **Enjoy the Reveal**: Watch as the graph morphs into a Valentine's message!

## The Secret Graph

The graph contains 13 nodes with the following key properties:
- The shortest path from A to N is exactly 5 nodes: A → F → K → M → N
- Each node in this path has a hidden tag:
  - Node A: "WILL"
  - Node F: "YOU"
  - Node K: "BE"
  - Node M: "MY"
  - Node N: "VALENTINE"
- Other nodes have neutral tech-related tags (data, struct, heap, etc.)
- The graph has alternative paths with higher weights to make it realistic

## Project Structure

```
src/
├── algorithms/          # Pathfinding algorithms
│   ├── dijkstra.ts
│   ├── bfs.ts
│   └── astar.ts
├── components/          # React components
│   ├── GraphCanvas.tsx  # SVG graph visualization
│   ├── ControlsPanel.tsx
│   ├── Sidebar.tsx
│   └── RevealOverlay.tsx
├── data/
│   └── secretGraph.ts   # The special graph data
├── state/
│   └── useAppState.ts   # Zustand store
├── types.ts             # TypeScript definitions
├── App.tsx              # Main app component
└── App.css              # Styling
```

## Customization Ideas

Want to create your own version? Here are some ideas:

1. **Different Message**: Modify the tags in `secretGraph.ts` to spell a different message
2. **More Nodes**: Add more nodes to make the graph more complex
3. **Different Layout**: Adjust node positions for a different visual arrangement
4. **Color Scheme**: Change colors in `App.css` to match your preferences
5. **Sound Effects**: Add audio cues during algorithm execution and reveal

## Acceptance Criteria ✅

- [x] Landing page contains no Valentine wording
- [x] Running algorithm visibly visits nodes then highlights shortest path
- [x] After run, Decode Path button appears
- [x] Decode triggers animation revealing "WILL YOU BE MY VALENTINE?"
- [x] "Yes" button leads to final confirmation UI
- [x] Works offline (static build, no backend)
- [x] Mobile responsive
- [x] Professional dev-tool aesthetic

## License

MIT - Feel free to use this for your own Valentine's surprise!

---

Made with ❤️ and algorithms
