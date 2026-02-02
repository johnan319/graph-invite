import ControlsPanel from "./components/ControlsPanel";
import GraphCanvas from "./components/GraphCanvas";
import Sidebar from "./components/Sidebar";
import RevealOverlay from "./components/RevealOverlay";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Graph Pathfinding Visualizer</h1>
          <p className="subtitle">
            Interactive algorithm demonstration and analysis tool
          </p>
        </div>
      </header>

      <div className="app-layout">
        <aside className="left-panel">
          <ControlsPanel />
        </aside>

        <main className="main-content">
          <GraphCanvas />
        </main>

        <aside className="right-panel">
          <Sidebar />
        </aside>
      </div>

      <footer className="app-footer">
        <span>Graph Theory Visualization Suite v2.4.1</span>
        <span className="separator">•</span>
        <span>Shortest Path Algorithms</span>
        <span className="separator">•</span>
        <span>Educational Demo</span>
      </footer>

      <RevealOverlay />
    </div>
  );
}

export default App;
