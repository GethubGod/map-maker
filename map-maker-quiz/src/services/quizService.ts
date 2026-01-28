import type { Point } from '../models/Region';
import type { Region } from '../models/Region';
import type { QuizAnswer } from '../models/QuizAttempt';
import {
  isPointInPolygon,
  calculateCentroid,
  euclideanDistance,
  calculateRegionRadius,
} from '../utils/coordinateUtils';

/**
 * Calculate accuracy score for a pin-based answer
 * Returns 0-100 based on how close the user clicked to the correct region
 */
export function calculatePinAccuracy(
  userPoint: Point,
  correctRegion: Region
): number {
  // Full credit if click is inside the correct region
  if (isPointInPolygon(userPoint, correctRegion.polygon)) {
    return 100;
  }

  // Partial credit based on distance from region center
  const regionCenter = calculateCentroid(correctRegion.polygon);
  const distance = euclideanDistance(userPoint, regionCenter);
  const regionRadius = calculateRegionRadius(correctRegion);

  // 3x the region radius = 0 points
  const maxDistance = regionRadius * 3;

  if (distance >= maxDistance) {
    return 0;
  }

  // Linear scaling from 100 (at region edge) to 0 (at maxDistance)
  const score = 100 * (1 - distance / maxDistance);
  return Math.max(0, Math.min(100, score));
}

/**
 * Determine if a quiz answer is considered "correct"
 * For pin-based: must be inside the region or very close (>70% accuracy)
 * For identify: must match the correct region ID
 */
export function isAnswerCorrect(
  answer: QuizAnswer,
  correctRegion: Region
): boolean {
  if (answer.selectedRegionId) {
    // Identify-type question
    return answer.selectedRegionId === correctRegion.id;
  }

  if (answer.userPoint) {
    // Locate-type question
    const accuracy = calculatePinAccuracy(answer.userPoint, correctRegion);
    return accuracy >= 70; // 70% threshold for "correct"
  }

  return false;
}

/**
 * Find which region (if any) contains a given point
 */
export function findRegionAtPoint(
  point: Point,
  regions: Region[]
): Region | null {
  for (const region of regions) {
    if (isPointInPolygon(point, region.polygon)) {
      return region;
    }
  }
  return null;
}

/**
 * Calculate distance from user's click to the correct region center (in pixels)
 */
export function calculateDistanceError(
  userPoint: Point,
  correctRegion: Region,
  canvasWidth: number,
  canvasHeight: number
): number {
  const regionCenter = calculateCentroid(correctRegion.polygon);
  const distance = euclideanDistance(userPoint, regionCenter);

  // Convert normalized distance to pixels (approximate)
  const avgDimension = (canvasWidth + canvasHeight) / 2;
  return distance * avgDimension;
}

/**
 * Generate a hint for a region based on its metadata
 */
export function generateHint(region: Region, hintLevel: number): string {
  const hints: string[] = [];

  if (region.metadata?.capital) {
    hints.push(`Capital: ${region.metadata.capital}`);
  }

  if (region.metadata?.population) {
    hints.push(`Population: ${region.metadata.population.toLocaleString()}`);
  }

  // Add position-based hint
  const centroid = calculateCentroid(region.polygon);
  if (centroid.x < 0.33) {
    hints.push('Located on the western side');
  } else if (centroid.x > 0.67) {
    hints.push('Located on the eastern side');
  }

  if (centroid.y < 0.33) {
    hints.push('Located in the northern area');
  } else if (centroid.y > 0.67) {
    hints.push('Located in the southern area');
  }

  // Return hint based on level (0 = first hint, 1 = second, etc.)
  return hints[Math.min(hintLevel, hints.length - 1)] || 'No hints available';
}
