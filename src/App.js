import { NetworkVisualizer } from "./NetworkVisualizer";
import nodes from "./nodes.json";

function App() {
  return <NetworkVisualizer nodes={nodes} />;
}

export default App;
