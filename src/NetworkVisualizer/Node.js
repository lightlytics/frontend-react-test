import { useContext } from "react";
import { context } from "./GraphProvider";
import usePosition from "./usePosition";

function Node({ node }) {
  const { nodesByParent, graphNodesById } = useContext(context);
  const childNodes = nodesByParent[node.id];
  const gNode = graphNodesById[node.id];
  const position = usePosition(gNode, graphNodesById[node.parent]);

  return (
    <div
      className="node"
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: gNode.width,
        height: gNode.height,
      }}
    >
      <div className="label">{node.id}</div>
      {childNodes?.map((node) => (
        <Node key={node.id} node={node} />
      ))}
    </div>
  );
}

export default Node;
