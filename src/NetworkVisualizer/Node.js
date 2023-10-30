import { useContext, useState } from "react";
import { context } from "./GraphProvider";
import usePosition from "./usePosition";

function Node({ node }) {
  const childNodes = useChildNodes(node.id);

  // State to keep track of whether children nodes are expanded or not
  const [isExpanded, setIsExpanded] = useState(true);

  // Function to toggle the expand/collapse state of children nodes
  const toggleExpandCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="node" style={useNodeStyle(node.id, node.parent)}>
      <div className="toolbar">
        <div className="label">{node.id}</div>
        {childNodes?.length > 0 && (
          <button onClick={toggleExpandCollapse}>
            {isExpanded ? "✖" : "🗁"}
          </button>
        )}
      </div>
      {isExpanded &&
        childNodes?.map((node) => <Node key={node.id} node={node} />)}
    </div>
  );
}

function useChildNodes(nodeId) {
  const { nodesByParent } = useContext(context);
  return nodesByParent[nodeId];
}

function useNodeStyle(nodeId, parentId) {
  const { graphNodesById } = useContext(context);
  const gNode = graphNodesById[nodeId];
  const position = usePosition(gNode, graphNodesById[parentId]);

  return {
    position: "absolute",
    top: position.y,
    left: position.x,
    width: gNode.width,
    height: gNode.height
  };
}

export default Node;
