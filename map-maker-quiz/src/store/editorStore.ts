import { create } from 'zustand';
import type { CustomMap } from '../models/Map';
import type { Region, Point } from '../models/Region';

type DrawingMode = 'none' | 'polygon' | 'edit';

interface EditorState {
  // Current map being edited
  currentMap: CustomMap | null;
  isDirty: boolean; // Has unsaved changes

  // Drawing state
  drawingMode: DrawingMode;
  currentPolygon: Point[]; // Points being drawn
  selectedRegionId: string | null;

  // Actions
  setCurrentMap: (map: CustomMap | null) => void;
  setDrawingMode: (mode: DrawingMode) => void;
  addPolygonPoint: (point: Point) => void;
  clearCurrentPolygon: () => void;
  finishPolygon: (regionName: string, color?: string) => void;
  selectRegion: (regionId: string | null) => void;
  updateRegion: (regionId: string, updates: Partial<Region>) => void;
  deleteRegion: (regionId: string) => void;
  updateMapMetadata: (updates: Partial<CustomMap>) => void;
  markDirty: () => void;
  markClean: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  currentMap: null,
  isDirty: false,
  drawingMode: 'none',
  currentPolygon: [],
  selectedRegionId: null,

  setCurrentMap: (map) => {
    set({
      currentMap: map,
      isDirty: false,
      drawingMode: 'none',
      currentPolygon: [],
      selectedRegionId: null,
    });
  },

  setDrawingMode: (mode) => {
    set({
      drawingMode: mode,
      currentPolygon: mode === 'polygon' ? [] : get().currentPolygon,
      selectedRegionId: mode !== 'edit' ? null : get().selectedRegionId,
    });
  },

  addPolygonPoint: (point) => {
    set((state) => ({
      currentPolygon: [...state.currentPolygon, point],
    }));
  },

  clearCurrentPolygon: () => {
    set({ currentPolygon: [] });
  },

  finishPolygon: (regionName, color = '#3b82f6') => {
    const { currentMap, currentPolygon } = get();
    if (!currentMap || currentPolygon.length < 3) return;

    const newRegion: Region = {
      id: crypto.randomUUID(),
      name: regionName,
      polygon: [...currentPolygon],
      color,
    };

    set({
      currentMap: {
        ...currentMap,
        regions: [...currentMap.regions, newRegion],
        updatedAt: Date.now(),
      },
      currentPolygon: [],
      drawingMode: 'none',
      isDirty: true,
    });
  },

  selectRegion: (regionId) => {
    set({ selectedRegionId: regionId });
  },

  updateRegion: (regionId, updates) => {
    const { currentMap } = get();
    if (!currentMap) return;

    set({
      currentMap: {
        ...currentMap,
        regions: currentMap.regions.map((region) =>
          region.id === regionId ? { ...region, ...updates } : region
        ),
        updatedAt: Date.now(),
      },
      isDirty: true,
    });
  },

  deleteRegion: (regionId) => {
    const { currentMap } = get();
    if (!currentMap) return;

    set({
      currentMap: {
        ...currentMap,
        regions: currentMap.regions.filter((region) => region.id !== regionId),
        updatedAt: Date.now(),
      },
      selectedRegionId: null,
      isDirty: true,
    });
  },

  updateMapMetadata: (updates) => {
    const { currentMap } = get();
    if (!currentMap) return;

    set({
      currentMap: {
        ...currentMap,
        ...updates,
        updatedAt: Date.now(),
      },
      isDirty: true,
    });
  },

  markDirty: () => set({ isDirty: true }),
  markClean: () => set({ isDirty: false }),
}));
