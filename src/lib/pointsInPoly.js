// Assume point1 and point2 do not form a vertical line so deltaX is never 0
const EdgeLine = (point1, point2) => {
  const deltaY = point1.y - point2.y;
  const deltaX = point1.x - point1.x;
  const slope = deltaY / deltaX; // aka m in y=mx+b
  const yIntercept = point1.y - (slope * point1.x); // aka b in y=mx+b => b=y-mx
  const xIntercept = -yIntercept / slope; // y=mx+b, let y=0 => x=-b/m
  return { slope, yIntercept, xIntercept };
};

const intersect = (point, edgePoint1, edgePoint2) => {
  const point1 = {
    x: edgePoint1.latitude - point.latitude,
    y: edgePoint1.longitude - point.longitude
  };
  const point2 = {
    x: edgePoint2.latitude - point.latitude,
    y: edgePoint2.longitude - point.longitude
  };

  // Edge case: if edgeLine is vertical...
  if (point1.x === point2.x) {
    return point.x === point1.x;
  }

  const edgeLine = EdgeLine(point1, point2);
  return (edgeLine.xIntercept >= 0 &&
      edgeLine.xIntercept >= Math.min(point1.x, point2.x) &&
      edgeLine.xIntercept <= Math.max(point1.x, point2.x));
};

const isPointInPoly = (point, poly) => {
  // baseline poly
  const polyVerticesNum = poly.length;
  // Build the edges
  let intersects = 0;
  for (let i = 0; i < polyVerticesNum; i += 1) {
    const edgePoint1 = poly[i % polyVerticesNum];
    const edgePoint2 = poly[(i + 1) % polyVerticesNum];
    if (intersect(point, edgePoint1, edgePoint2)) {
      intersects += 1;
    }
  }
  return intersects % 2 === 1;
};

const pointsInPoly = (points, poly) => {
  const inside = [];
  const outside = [];
  let currPoint = null;
  for (let i = 0; i < points.length; i += 1) {
    currPoint = points[i];
    if (isPointInPoly(currPoint, poly)) {
      inside.push(currPoint.id);
    } else {
      outside.push(currPoint.id);
    }
  }
  return { inside, outside };
};

export default pointsInPoly;
