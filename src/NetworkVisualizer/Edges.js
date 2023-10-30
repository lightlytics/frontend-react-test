import React, { memo, useContext } from "react";
import { Arrow, Layer, Stage } from "react-konva";
import { context } from "./GraphProvider";

const Edge = memo(({ points }) => (
  <Arrow
    points={points.map((point) => [point.x, point.y]).flat()}
    strokeWidth={1}
    stroke={"black"}
    fill={"black"}
  />
));

function Edges() {
  const { width, height, edges } = useContext(context);
  return (
    <Stage width={width} height={height} style={{ pointerEvents: "none" }}>
      <Layer>
        {edges.map((edge, i) => (
          <Edge key={i} points={edge.points} />
        ))}
      </Layer>
    </Stage>
  );
}

export default Edges;
