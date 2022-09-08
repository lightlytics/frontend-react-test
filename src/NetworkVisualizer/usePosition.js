import { useMemo } from "react";

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

export default usePosition;
