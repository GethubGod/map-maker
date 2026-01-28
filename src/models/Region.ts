export interface Point {
  x: number; // Normalized 0-1 or absolute pixels
  y: number;
}

export interface RegionMetadata {
  capital?: string;
  capitalCoords?: Point;
  population?: number;
  [key: string]: unknown; // Extensible
}

export interface Region {
  id: string;
  name: string;
  polygon: Point[]; // Normalized coordinates (0-1)
  color?: string; // Highlight color
  metadata?: RegionMetadata;
}
