// Assume point1 and point2 do not form a vertical line so deltaX is never 0
const EdgeLine = (point1, point2) => {
  const deltaY = point1.y - point2.y;
  const deltaX = point1.x - point2.x;
  const slope = deltaY / deltaX; // aka m in y=mx+b
  const yIntercept = point1.y - (slope * point1.x); // aka b in y=mx+b => b=y-mx
  const xIntercept = -yIntercept / slope; // y=mx+b, let y=0 => x=-b/m
  return { slope, yIntercept, xIntercept };
};

const intersect = (point, edgePoint1, edgePoint2) => {
  const point1 = {
    x: edgePoint1.longitude - point.longitude,
    y: edgePoint1.latitude - point.latitude
  };
  const point2 = {
    x: edgePoint2.longitude - point.longitude,
    y: edgePoint2.latitude - point.latitude
  };

  // Edge case: if edgeLine is vertical...
  // We don't want to run EdgeLine function on vertical line because deltaX
  // will be 0 (divided by zero error)
  if (point1.x === point2.x) {
    // check using horizontal ray approaching positive x- inf
    const horizIntersect = Math.min(point1.y, point2.y) <= 0 && 
      Math.max(point1.y, point2.y) >= 0 &&
      point1.x > 0;
    return { horizIntersect, vertIntersect: false };
  }
  // Edge case: if edgeLine is horizontal...
  if (point1.y === point2.y) {
    // check using vertical ray approaching positive y-inf
    const vertIntersect = Math.min(point1.x, point2.x) <= 0 &&
      Math.max(point1.x, point2.x) >= 0 &&
      point1.y > 0;
    return { horizIntersect: false, vertIntersect };
  }
  const edgeLine = EdgeLine(point1, point2);

  const horizIntersect = (edgeLine.xIntercept >= 0 &&
    edgeLine.xIntercept >= Math.min(point1.x, point2.x) &&
    edgeLine.xIntercept <= Math.max(point1.x, point2.x));

  const vertIntersect = (edgeLine.yIntercept >= 0 &&
    edgeLine.yIntercept >= Math.min(point1.y, point2.y) &&
    edgeLine.yIntercept <= Math.max(point1.y, point2.y));

  return { horizIntersect, vertIntersect };
};

const isPointInPoly = (point, poly) => {
  // baseline poly
  const polyVerticesNum = poly.length;
  // Build the edges
  let horizIntersects = 0;
  let vertIntersects = 0;
  for (let i = 0; i < polyVerticesNum; i += 1) {
    const edgePoint1 = poly[i % polyVerticesNum];
    const edgePoint2 = poly[(i + 1) % polyVerticesNum];
    const { horizIntersect, vertIntersect } = intersect(point, edgePoint1, edgePoint2)
    horizIntersects += horizIntersect ? 1 : 0;
    vertIntersects += vertIntersect ? 1 : 0;
  }
  return (horizIntersects % 2 === 1 || vertIntersects %2 === 1);
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

export {
  isPointInPoly,
  pointsInPoly
};
