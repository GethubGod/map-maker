import type { Point } from '../models/Region';
import type { Region } from '../models/Region';

/**
 * Normalize a point from absolute pixels to 0-1 coordinates
 */
export function normalizePoint(
  point: Point,
  imageWidth: number,
  imageHeight: number
): Point {
  return {
    x: point.x / imageWidth,
    y: point.y / imageHeight,
  };
}

/**
 * Denormalize a point from 0-1 coordinates to absolute pixels
 */
export function denormalizePoint(
  point: Point,
  canvasWidth: number,
  canvasHeight: number
): Point {
  return {
    x: point.x * canvasWidth,
    y: point.y * canvasHeight,
  };
}

/**
 * Check if a point is inside a polygon using ray casting algorithm
 */
export function isPointInPolygon(point: Point, polygon: Point[]): boolean {
  if (polygon.length < 3) return false;

  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
}

/**
 * Calculate the centroid (center point) of a polygon
 */
export function calculateCentroid(polygon: Point[]): Point {
  if (polygon.length === 0) return { x: 0, y: 0 };

  let xSum = 0;
  let ySum = 0;

  for (const point of polygon) {
    xSum += point.x;
    ySum += point.y;
  }

  return {
    x: xSum / polygon.length,
    y: ySum / polygon.length,
  };
}

/**
 * Calculate Euclidean distance between two points
 */
export function euclideanDistance(p1: Point, p2: Point): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate the approximate radius of a region (average distance from centroid to vertices)
 */
export function calculateRegionRadius(region: Region): number {
  const centroid = calculateCentroid(region.polygon);
  let totalDistance = 0;

  for (const point of region.polygon) {
    totalDistance += euclideanDistance(centroid, point);
  }

  return totalDistance / region.polygon.length;
}

/**
 * Get bounding box of a polygon (for optimization)
 */
export function getBoundingBox(polygon: Point[]): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
} {
  if (polygon.length === 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  }

  let minX = polygon[0].x;
  let minY = polygon[0].y;
  let maxX = polygon[0].x;
  let maxY = polygon[0].y;

  for (const point of polygon) {
    minX = Math.min(minX, point.x);
    minY = Math.min(minY, point.y);
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
  }

  return { minX, minY, maxX, maxY };
}
