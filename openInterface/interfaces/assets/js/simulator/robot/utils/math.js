/**
 * Convert degree value to radian valule.
 * @param {Number} d
 */
function degToRad(d) {
  return (Math.PI / 180) * d;
};

/**
 * Convert radian value to degree valule.
 * @param {Number} r
 */
function radToDeg(r) {
  return (180 / Math.PI) * r;
};

/**
 * Returns the coordinates of point after rotation
 * @param {Number} pointX
 * @param {Number} pointY
 * @param {Number} angle
 * @param {Number} x
 * @param {Number} y
 * @returns {Array<Number>}
 */
function getPointAfterRotation(pointX, pointY, angle, x, y) {
  const newPointX = x + (pointX - x) * Math.cos(angle) - (pointY - y) * Math.sin(angle);
  const newPointY = y + (pointX - x) * Math.sin(angle) + (pointY - y) * Math.cos(angle);
  return [newPointX, newPointY];
};

/**
 * Returns distance between 2 points
 * @param {Object} A
 * @param {Object} B
 * @returns {Number}
 */
function distanceBetweenPoints(A, B) {
  const dx = Math.pow(B.x - A.x, 2);
  const dy = Math.pow(B.y - A.y, 2);
  return Math.sqrt(dx + dy);
};

/**
 * Returns coordinates of intersection point, if the lines do not cross between them, returns arbitrary value.
 * @param {Object} point1
 * @param {Object} point2
 * @param {Object} point3
 * @param {Object} point4
 * @returns {Object} Object containing intersection point
 */
function getLinesIntersectionPoint(point1, point2, point3, point4) {
  // Calculate the distance to intersection point
  const dx = [point2.x - point1.x, point1.x - point3.x, point4.x - point3.x];
  const dy = [point2.y - point1.y, point1.y - point3.y, point4.y - point3.y];
  const divider = dy[2] * dx[0] - dx[2] * dy[0];
  const d1 = (dx[2] * dy[1] - dy[2] * dx[1]) / divider;
  const d2 = (dx[0] * dy[1] - dy[0] * dx[1]) / divider;
  // If d1 and d2 are between 0 and 1, lines are intersecting
  if (d1 >= 0 && d1 <= 1 && d2 >= 0 && d2 <= 1) {
    return {
      // Coordinates of intersection
      'x': point1.x + d1 * dx[0],
      'y': point1.y + d1 * dy[0],
    };
  }
  // Lines are not touching
  return null;
};

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  checkCollisionWithRectangle(rectangle) {
    const edges = rectangle.getEdges();
    for (var i in edges) {
      const closestPoint = this._getClosestPointOnEdge(edges[i][0], edges[i][1]);
      const distance = this._getDistanceToPoint(closestPoint);
      if (distance < this.radius) {
        return i;
      }
    }
    return false;
  }

  _getClosestPointOnEdge(p1, p2) {
    const lineSegment = [p2.x - p1.x, p2.y - p1.y];
    const lineSegmentLength = this._getDistanceToPoint(p1, p2);
    let closestPoint = {};
    if (lineSegmentLength <= 0) {
      closestPoint = p1;
    } else {
      const u = ((this.x - p1.x) * lineSegment[0] + (this.y - p1.y) * lineSegment[1]) / (lineSegmentLength ** 2);
      if (u > 1) {
        closestPoint = p2;
      } else if (u <= 0) {
        closestPoint = p1;
      } else {
        closestPoint = { x: p1.x + u * lineSegment[0], y: p1.y + u * lineSegment[1] };
      }
    }
    return closestPoint;
  }

  _getDistanceToPoint(p1, p2 = { x: this.x, y: this.y }) {
    let xDiff = p2.x - p1.x;
    let yDiff = p2.y - p1.y;
    return Math.sqrt(xDiff ** 2 + yDiff ** 2);
  }
}

class Shape {
  constructor(x, y, width, height, angle, offset) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = degToRad(angle);
    this.offset = offset ? offset : 0;
  }

  getEdges() {
    const bottomLeft = this._rotatePoint(-this.width / 2, this.height / 2);
    const bottomRight = this._rotatePoint(this.width / 2, this.height / 2);
    const topLeft = this._rotatePoint(-this.width / 2, -this.height / 2);
    const topRight = this._rotatePoint(this.width / 2, -this.height / 2);
    return {
      'top': [topLeft, topRight],
      'right': [topRight, bottomRight],
      'bottom': [bottomRight, bottomLeft],
      'left': [bottomLeft, topLeft]
    };
  }

  _rotatePoint(x, y) {
    const x1 = (x + this.offset) * Math.cos(this.angle) - y * Math.sin(this.angle);
    const y1 = (x + this.offset) * Math.sin(this.angle) + y * Math.cos(this.angle);
    return { x: x1 + this.x, y: y1 + this.y };
  }
}