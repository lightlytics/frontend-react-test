import { useContext } from "react";
import { context } from "./GraphProvider";
import Node from "./Node";
import Edges from "./Edges";

import "./NetworkVisualizer.css";

function NetworkVisualizer() {
  const { width, height, edges, nodesByParent } = useContext(context);
  const rootNodes = nodesByParent[null]

  return (
    <div className="container">
      {rootNodes?.map((node) => (
        <Node key={node.id} node={node} />
      ))}
      <Edges edges={edges} width={width} height={height} />
    </div>
  );
}

export default NetworkVisualizer;
