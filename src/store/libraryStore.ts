import { create } from 'zustand';
import type { CustomMap } from '../models/Map';
import type { Quiz } from '../models/Quiz';
import { getAllMaps, getAllQuizzes } from '../services/storageService';

interface LibraryState {
  maps: Record<string, CustomMap>;
  quizzes: Record<string, Quiz>;
  searchQuery: string;
  selectedTags: string[];
  isLoading: boolean;

  // Actions
  loadLibrary: () => void;
  setSearchQuery: (query: string) => void;
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  maps: {},
  quizzes: {},
  searchQuery: '',
  selectedTags: [],
  isLoading: false,

  loadLibrary: () => {
    set({ isLoading: true });

    try {
      const maps = getAllMaps();
      const quizzes = getAllQuizzes();
      set({
        maps,
        quizzes,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error loading library:', error);
      set({ isLoading: false });
    }
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  toggleTag: (tag) => {
    const { selectedTags } = get();
    if (selectedTags.includes(tag)) {
      set({ selectedTags: selectedTags.filter((t) => t !== tag) });
    } else {
      set({ selectedTags: [...selectedTags, tag] });
    }
  },

  clearFilters: () => {
    set({
      searchQuery: '',
      selectedTags: [],
    });
  },
}));
