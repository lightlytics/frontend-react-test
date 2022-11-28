import { Arrow, Layer, Stage } from "react-konva";

function Edges({ width, height, edges }) {
  return (
    <Stage width={width} height={height}>
      <Layer>
        {edges.map((edge, i) => {
          const lastPointIndex = edge.points.length - 1;
          const arrowStartPoint = edge.points[0];
          const arrowEndPoint = edge.points[lastPointIndex];

          return <Arrow
            key={i}
            points={[
              arrowStartPoint.x,
              arrowStartPoint.y,
              arrowEndPoint.x,
              arrowEndPoint.y
            ]}
            strokeWidth={1}
            stroke={"black"}
            fill={"black"}
          />
        })}
      </Layer>
    </Stage>
  );
}

export default Edges;
