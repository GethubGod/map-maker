export interface Point {
  x: number; // Normalized 0-1 or absolute pixels
  y: number;
}

export interface Region {
  id: string;
  name: string;
  polygon: Point[]; // Normalized coordinates (0-1)
  color?: string; // Highlight color
  metadata?: {
    capital?: string;
    population?: number;
    [key: string]: any; // Extensible
  };
}
