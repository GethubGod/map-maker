import type { CustomMap } from '../models/Map';
import type { Quiz } from '../models/Quiz';

// Simple US States sample map data (simplified for demo)
export const usStatesMap: CustomMap = {
  id: 'sample-us-states',
  name: 'United States',
  description: 'Identify US states on the map',
  imageData: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5Ij5VUyBNYXAgUGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+',
  imageWidth: 800,
  imageHeight: 600,
  regions: [
    {
      id: 'california',
      name: 'California',
      polygon: [
        { x: 0.1, y: 0.3 },
        { x: 0.1, y: 0.6 },
        { x: 0.2, y: 0.65 },
        { x: 0.25, y: 0.4 },
      ],
      color: '#3b82f6',
      metadata: {
        capital: 'Sacramento',
        population: 39538223,
      },
    },
    {
      id: 'texas',
      name: 'Texas',
      polygon: [
        { x: 0.4, y: 0.6 },
        { x: 0.35, y: 0.75 },
        { x: 0.5, y: 0.8 },
        { x: 0.55, y: 0.65 },
      ],
      color: '#10b981',
      metadata: {
        capital: 'Austin',
        population: 29145505,
      },
    },
    {
      id: 'florida',
      name: 'Florida',
      polygon: [
        { x: 0.75, y: 0.65 },
        { x: 0.72, y: 0.75 },
        { x: 0.8, y: 0.78 },
        { x: 0.82, y: 0.68 },
      ],
      color: '#f59e0b',
      metadata: {
        capital: 'Tallahassee',
        population: 21538187,
      },
    },
    {
      id: 'new-york',
      name: 'New York',
      polygon: [
        { x: 0.8, y: 0.25 },
        { x: 0.78, y: 0.3 },
        { x: 0.85, y: 0.32 },
        { x: 0.87, y: 0.27 },
      ],
      color: '#8b5cf6',
      metadata: {
        capital: 'Albany',
        population: 20201249,
      },
    },
  ],
  createdAt: Date.now(),
  updatedAt: Date.now(),
  tags: ['USA', 'States', 'Geography'],
};

export const usStatesQuiz: Quiz = {
  id: 'quiz-us-states',
  mapId: 'sample-us-states',
  name: 'US States Quiz',
  description: 'Test your knowledge of US state locations',
  questions: [
    {
      id: 'q1',
      type: 'locate',
      prompt: 'Find California',
      correctRegionId: 'california',
      hints: ['Located on the west coast', 'Home to Hollywood'],
    },
    {
      id: 'q2',
      type: 'locate',
      prompt: 'Find Texas',
      correctRegionId: 'texas',
      hints: ['Second largest state', 'Known for BBQ and cowboys'],
    },
    {
      id: 'q3',
      type: 'locate',
      prompt: 'Find Florida',
      correctRegionId: 'florida',
      hints: ['Southeastern state', 'Known as the Sunshine State'],
    },
    {
      id: 'q4',
      type: 'locate',
      prompt: 'Find New York',
      correctRegionId: 'new-york',
      hints: ['Northeastern state', 'Home to New York City'],
    },
  ],
  settings: {
    allowRetry: true,
    showCorrectAnswers: true,
    scoringMode: 'accuracy',
    timeLimit: undefined,
    passingScore: 70,
  },
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

// World Continents sample map
export const worldContinentsMap: CustomMap = {
  id: 'sample-world-continents',
  name: 'World Continents',
  description: 'Identify continents on the world map',
  imageData: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgZmlsbD0iI2UwZjJmZSIvPjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2Ij5Xb3JsZCBNYXAgUGxhY2Vob2xkZXI8L3RleHQ+PC9zdmc+',
  imageWidth: 800,
  imageHeight: 600,
  regions: [
    {
      id: 'africa',
      name: 'Africa',
      polygon: [
        { x: 0.45, y: 0.4 },
        { x: 0.42, y: 0.65 },
        { x: 0.55, y: 0.7 },
        { x: 0.58, y: 0.45 },
      ],
      color: '#22c55e',
    },
    {
      id: 'europe',
      name: 'Europe',
      polygon: [
        { x: 0.45, y: 0.2 },
        { x: 0.43, y: 0.35 },
        { x: 0.58, y: 0.37 },
        { x: 0.6, y: 0.22 },
      ],
      color: '#3b82f6',
    },
    {
      id: 'asia',
      name: 'Asia',
      polygon: [
        { x: 0.6, y: 0.15 },
        { x: 0.55, y: 0.45 },
        { x: 0.8, y: 0.48 },
        { x: 0.85, y: 0.18 },
      ],
      color: '#f59e0b',
    },
  ],
  createdAt: Date.now(),
  updatedAt: Date.now(),
  tags: ['World', 'Continents', 'Geography'],
};

export const worldContinentsQuiz: Quiz = {
  id: 'quiz-world-continents',
  mapId: 'sample-world-continents',
  name: 'World Continents Quiz',
  description: 'Can you locate the major continents?',
  questions: [
    {
      id: 'q1',
      type: 'locate',
      prompt: 'Find Africa',
      correctRegionId: 'africa',
    },
    {
      id: 'q2',
      type: 'locate',
      prompt: 'Find Europe',
      correctRegionId: 'europe',
    },
    {
      id: 'q3',
      type: 'locate',
      prompt: 'Find Asia',
      correctRegionId: 'asia',
    },
  ],
  settings: {
    allowRetry: true,
    showCorrectAnswers: true,
    scoringMode: 'combined',
    timeLimit: 180, // 3 minutes
    passingScore: 60,
  },
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const sampleMaps = [usStatesMap, worldContinentsMap];
export const sampleQuizzes = [usStatesQuiz, worldContinentsQuiz];
