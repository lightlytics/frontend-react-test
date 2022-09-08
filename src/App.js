import NetworkVisualizer from "./NetworkVisualizer";
import GraphProvider from "./NetworkVisualizer/GraphProvider";
import nodes from "./nodes.json";

function App() {
  return (
    <GraphProvider nodes={nodes}>
      <NetworkVisualizer />
    </GraphProvider>
  )
}

export default App;
