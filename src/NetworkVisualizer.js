import { groupBy, keyBy, mapValues } from "lodash";
import { createContext, memo, useContext, useMemo } from "react";
import { useGraph } from "./useGraph";
import { Arrow, Group, Layer, Stage } from "react-konva";

import "./NetworkVisualizer.css";

const context = createContext();

export const NetworkVisualizer = memo(NetworkVisualizerComponent);

function NetworkVisualizerComponent({ nodes }) {
  const graph = useGraph({ nodes });
  const { width, height } = useMemo(() => graph.graph(), [graph]);
  const edges = useEdges(graph);
  const nodesByParent = useMemo(() => groupBy(nodes, "parent"), [nodes]);
  const graphNodesById = useMemo(
    () => mapValues(keyBy(graph.nodes()), (id) => graph.node(id)),
    [graph]
  );

  return (
    <context.Provider value={{ nodesByParent, graphNodesById }}>
      <NodeGroup nodes={nodesByParent[null]} />
      <NodeEdges width={width} height={height} edges={edges} />
    </context.Provider>
  );
}

function NodeGroup({ nodes }) {
  return nodes?.map((node) => <Node key={node.id} node={node} />);
}

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
      <NodeGroup nodes={childNodes} />
    </div>
  );
}

function NodeEdges({ width, height, edges }) {
  return (
    <Stage width={width} height={height}>
      <Layer>
        {edges?.map((edge, i) => (
          <Group key={i}>
            <Arrow
              points={edge.points}
              strokeWidth={1}
              stroke={"black"}
              fill={"black"}
            />
          </Group>
        ))}
      </Layer>
    </Stage>
  );
}

function usePosition(gNode, parent) {
  return useMemo(() => {
    const pos = {
      x: gNode.x - gNode.width / 2,
      y: gNode.y - gNode.height / 2,
    };

    if (parent) {
      pos.x = pos.x - (parent.x - parent.width / 2);
      pos.y = pos.y - (parent.y - parent.height / 2);
    }
    return pos;
  }, [gNode.height, gNode.width, gNode.x, gNode.y, parent]);
}

function useEdges(graph) {
  return useMemo(() => graph.edges().map((e) => graph.edge(e)), [graph]);
}
