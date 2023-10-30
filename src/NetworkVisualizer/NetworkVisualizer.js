import { useContext } from "react";
import GraphProvider, { context } from "./GraphProvider";
import Node from "./Node";
import Edges from "./Edges";

import "./NetworkVisualizer.css";

function NetworkVisualizer({ nodes }) {
  return (
    <GraphProvider nodes={nodes}>
      <div className="container">
        <RootNodes />
        <Edges />
      </div>
    </GraphProvider>
  );
}

function RootNodes() {
  const { nodesByParent } = useContext(context);

  return nodesByParent[null]?.map((node) => <Node key={node.id} node={node} />);
}

export default NetworkVisualizer;
