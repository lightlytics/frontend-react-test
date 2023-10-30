import dagre from "dagre";
import { groupBy, keyBy, mapValues } from "lodash";
import { useMemo } from "react";

function useGraph({ nodes }) {
  return useMemo(() => {
    const g = new dagre.graphlib.Graph({
      compound: true,
      multigraph: true
    });

    g.setGraph({
      rankdir: "LR",
      nodesep: 50,
      edgesep: 30,
      ranksep: 20
    });

    g.setDefaultEdgeLabel(function () {
      return {};
    });

    for (const node of nodes) {
      g.setNode(node.id, {
        width: 60,
        height: 60
      });

      if (node.parent) {
        g.setParent(node.id, node.parent);
      }

      for (const dest of node.rel) {
        g.setEdge(node.id, dest);
      }
    }

    dagre.layout(g);

    return {
      width: g.graph().width,
      height: g.graph().height,
      edges: g.edges().map((e) => g.edge(e)),
      nodesByParent: groupBy(nodes, "parent"),
      graphNodesById: mapValues(keyBy(g.nodes()), (id) => g.node(id))
    };
  }, [nodes]);
}

export default useGraph;
