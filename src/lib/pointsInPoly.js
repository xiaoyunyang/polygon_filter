// Assume point1 and point2 do not form a vertical line so deltaX is never 0
const EdgeLine = (point1, point2) => {
  const deltaY = point1.y - point2.y;
  const deltaX = point1.x - point2.x;
  const slope = deltaY / deltaX; // aka m in y=mx+b
  const yIntercept = point1.y - (slope * point1.x); // aka b in y=mx+b => b=y-mx
  const xIntercept = -yIntercept / slope; // y=mx+b, let y=0 => x=-b/m
  return { slope, yIntercept, xIntercept };
};
const vertexIntersect = (point1, point2) => {
  let horizIntersect = false;
  let vertIntersect = false;
  // Edge case: if intersection occurs at a vertex...
  if ((point1.y === 0 && point2.y < 0) || (point2.y === 0 && point1.y < 0)) {
    horizIntersect = true;
  } else if ((point1.x === 0 && point2.x < 0) || (point2.x === 0 && point1.x < 0)) {
    vertIntersect = true;
  }
  return { horizIntersect, vertIntersect };
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
    let horizIntersect = Math.min(point1.y, point2.y) < 0 &&
      Math.max(point1.y, point2.y) >= 0 &&
      point1.x > 0;

    const vertexIntersectHoriz = vertexIntersect(point1, point2).horizIntersect;  
    horizIntersect = horizIntersect || vertexIntersectHoriz;

    return {
      horizIntersect,
      vertIntersect: false
    };
  }

  // Edge case: if edgeLine is horizontal...
  if (point1.y === point2.y) {
    // check using vertical ray approaching positive y-inf
    let vertIntersect = Math.min(point1.x, point2.x) < 0 &&
      Math.max(point1.x, point2.x) > 0 &&
      point1.y >= 0;

    const vertexIntersectVert = vertexIntersect(point1, point2).vertIntersect;
    vertIntersect = vertIntersect || vertexIntersectVert;

    return {
      horizIntersect: false,
      vertIntersect
    };
  }

  const edgeLine = EdgeLine(point1, point2);

  let horizIntersect = (edgeLine.xIntercept > 0 &&
    edgeLine.xIntercept > Math.min(point1.x, point2.x) &&
    edgeLine.xIntercept < Math.max(point1.x, point2.x));

  let vertIntersect = (edgeLine.yIntercept > 0 &&
    edgeLine.yIntercept > Math.min(point1.y, point2.y) &&
    edgeLine.yIntercept < Math.max(point1.y, point2.y));

  // Edge case: if intersection occurs at a vertex...
  const vertexIntersectHoriz = vertexIntersect(point1, point2).horizIntersect;
  const vertexIntersectVert = vertexIntersect(point1, point2).vertIntersect;

  horizIntersect = horizIntersect || vertexIntersectHoriz;
  vertIntersect = vertIntersect || vertexIntersectVert;

  return {
    horizIntersect,
    vertIntersect,
    vertexIntersectHoriz,
    vertexIntersectVert
  };
};
const pointsEqual = (point1, point2) => {
  return (point1.latitude === point2.latitude &&
  point1.longitude === point2.longitude);
};
const qtyInRange = (qty, limit1, limit2) => {
  return qty >= Math.min(limit1, limit2) &&
    qty <= Math.max(limit1, limit2);
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

    // Edge case: if the point is one of the edge vertices
    // return true
    if (pointsEqual(point, edgePoint1) ||
      pointsEqual(point, edgePoint2)) {
      return true;
    }

    // if (edgePoint1.longitude === edgePoint2.longitude && point.longitude === edgePoint1.longitude) {
    //   // Edge is vertical
    //   return qtyInRange(point.latitude, edgePoint1.latitude, edgePoint2.latitude);
    // }
    // if (edgePoint1.latitude === edgePoint2.latitude && point.latitude === edgePoint1.latitude) {
    //   // Edge is horizontal
    //   return qtyInRange(point.longitude, edgePoint1.longitude, edgePoint2.longitude);
    // }

    const {
      horizIntersect,
      vertIntersect
    } = intersect(point, edgePoint1, edgePoint2);
    horizIntersects += horizIntersect ? 1 : 0;
    vertIntersects += vertIntersect ? 1 : 0;
  }
  return (horizIntersects % 2 === 1 || vertIntersects % 2 === 1);
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
