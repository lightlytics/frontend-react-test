import { Arrow, Layer, Stage } from "react-konva";

function Edges({ width, height, edges }) {
  return (
    <Stage width={width} height={height}>
      <Layer>
        {edges.map((edge, i) => (
          <Arrow
            key={i}
            points={edge.points}
            strokeWidth={1}
            stroke={"black"}
            fill={"black"}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default Edges;
