import type { Region } from './Region';

export interface CustomMap {
  id: string; // UUID
  name: string;
  description?: string;
  imageData: string; // Base64 encoded image or URL
  imageWidth: number;
  imageHeight: number;
  regions: Region[]; // Defined clickable areas
  createdAt: number; // Timestamp
  updatedAt: number;
  tags?: string[]; // For categorization
}
