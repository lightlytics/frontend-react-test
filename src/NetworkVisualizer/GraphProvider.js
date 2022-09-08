import { groupBy, keyBy, mapValues } from "lodash";
import { createContext, useMemo } from "react";
import useGraph from "./useGraph";

function GraphProvider({ nodes, ...props }) {
  const graph = useGraph({ nodes });

  return (
    <context.Provider {...props} value={{
      width: useMemo(() => graph.graph().width, [graph]),
      height: useMemo(() => graph.graph().height, [graph]),
      edges: useMemo(() => graph.edges().map((e) => graph.edge(e)), [graph]),
      nodesByParent: useMemo(() => groupBy(nodes, "parent"), [nodes]),
      graphNodesById: useMemo(
        () => mapValues(keyBy(graph.nodes()), (id) => graph.node(id)),
        [graph]
      ),
    }} />
  );
}

export const context = createContext();

export default GraphProvider;
