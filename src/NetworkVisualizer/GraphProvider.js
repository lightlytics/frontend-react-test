import { createContext } from "react";
import useGraph from "./useGraph";

function GraphProvider({ nodes, ...props }) {
  const graph = useGraph({ nodes });

  return <context.Provider {...props} value={graph} />;
}

export const context = createContext();

export default GraphProvider;
