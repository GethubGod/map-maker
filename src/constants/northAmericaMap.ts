import type { CustomMap } from '../models/Map';
import type { Quiz } from '../models/Quiz';

// Complete North and Central America Map - ALL countries and capitals
export const northAmericaMap: CustomMap = {
  id: 'north-central-america',
  name: 'North and Central America',
  description: 'All countries and capitals of North and Central America including Caribbean',
  imageData: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAwIiBoZWlnaHQ9IjcwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iOTAwIiBoZWlnaHQ9IjcwMCIgZmlsbD0iI2UwZjJmZSIvPjx0ZXh0IHg9IjQ1MCIgeT0iMzUwIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2Ij5Ob3J0aCAmIENlbnRyYWwgQW1lcmljYTwvdGV4dD48L3N2Zz4=',
  imageWidth: 900,
  imageHeight: 700,
  regions: [
    // NORTH AMERICA (3 countries)
    {
      id: 'canada',
      name: 'Canada',
      polygon: [
        { x: 0.12, y: 0.08 },
        { x: 0.10, y: 0.25 },
        { x: 0.15, y: 0.25 },
        { x: 0.35, y: 0.20 },
        { x: 0.60, y: 0.22 },
        { x: 0.80, y: 0.18 },
        { x: 0.85, y: 0.10 },
        { x: 0.70, y: 0.05 },
      ],
      color: '#ef4444',
      metadata: {
        capital: 'Ottawa',
        capitalCoords: { x: 0.65, y: 0.23 },
      },
    },
    {
      id: 'united-states',
      name: 'United States',
      polygon: [
        { x: 0.15, y: 0.25 },
        { x: 0.15, y: 0.48 },
        { x: 0.35, y: 0.50 },
        { x: 0.70, y: 0.40 },
        { x: 0.75, y: 0.28 },
        { x: 0.60, y: 0.22 },
        { x: 0.35, y: 0.20 },
      ],
      color: '#3b82f6',
      metadata: {
        capital: 'Washington DC',
        capitalCoords: { x: 0.68, y: 0.38 },
      },
    },
    {
      id: 'mexico',
      name: 'Mexico',
      polygon: [
        { x: 0.20, y: 0.50 },
        { x: 0.18, y: 0.60 },
        { x: 0.25, y: 0.63 },
        { x: 0.40, y: 0.62 },
        { x: 0.45, y: 0.54 },
        { x: 0.35, y: 0.50 },
      ],
      color: '#10b981',
      metadata: {
        capital: 'Mexico City',
        capitalCoords: { x: 0.30, y: 0.58 },
      },
    },

    // CENTRAL AMERICA (7 countries)
    {
      id: 'guatemala',
      name: 'Guatemala',
      polygon: [
        { x: 0.25, y: 0.63 },
        { x: 0.24, y: 0.66 },
        { x: 0.28, y: 0.67 },
        { x: 0.30, y: 0.64 },
      ],
      color: '#f59e0b',
      metadata: {
        capital: 'Guatemala City',
        capitalCoords: { x: 0.27, y: 0.65 },
      },
    },
    {
      id: 'belize',
      name: 'Belize',
      polygon: [
        { x: 0.28, y: 0.63 },
        { x: 0.275, y: 0.655 },
        { x: 0.295, y: 0.66 },
        { x: 0.30, y: 0.64 },
      ],
      color: '#8b5cf6',
      metadata: {
        capital: 'Belmopan',
        capitalCoords: { x: 0.285, y: 0.648 },
      },
    },
    {
      id: 'honduras',
      name: 'Honduras',
      polygon: [
        { x: 0.28, y: 0.67 },
        { x: 0.275, y: 0.69 },
        { x: 0.32, y: 0.70 },
        { x: 0.33, y: 0.68 },
      ],
      color: '#ec4899',
      metadata: {
        capital: 'Tegucigalpa',
        capitalCoords: { x: 0.30, y: 0.685 },
      },
    },
    {
      id: 'el-salvador',
      name: 'El Salvador',
      polygon: [
        { x: 0.27, y: 0.675 },
        { x: 0.268, y: 0.69 },
        { x: 0.29, y: 0.695 },
        { x: 0.295, y: 0.68 },
      ],
      color: '#06b6d4',
      metadata: {
        capital: 'San Salvador',
        capitalCoords: { x: 0.28, y: 0.685 },
      },
    },
    {
      id: 'nicaragua',
      name: 'Nicaragua',
      polygon: [
        { x: 0.30, y: 0.70 },
        { x: 0.295, y: 0.735 },
        { x: 0.34, y: 0.745 },
        { x: 0.35, y: 0.715 },
      ],
      color: '#14b8a6',
      metadata: {
        capital: 'Managua',
        capitalCoords: { x: 0.315, y: 0.72 },
      },
    },
    {
      id: 'costa-rica',
      name: 'Costa Rica',
      polygon: [
        { x: 0.325, y: 0.745 },
        { x: 0.320, y: 0.77 },
        { x: 0.355, y: 0.775 },
        { x: 0.36, y: 0.75 },
      ],
      color: '#f97316',
      metadata: {
        capital: 'San Jose',
        capitalCoords: { x: 0.34, y: 0.76 },
      },
    },
    {
      id: 'panama',
      name: 'Panama',
      polygon: [
        { x: 0.355, y: 0.765 },
        { x: 0.350, y: 0.79 },
        { x: 0.400, y: 0.795 },
        { x: 0.410, y: 0.770 },
      ],
      color: '#84cc16',
      metadata: {
        capital: 'Panama City',
        capitalCoords: { x: 0.385, y: 0.78 },
      },
    },

    // CARIBBEAN (10 countries/territories)
    {
      id: 'cuba',
      name: 'Cuba',
      polygon: [
        { x: 0.48, y: 0.58 },
        { x: 0.47, y: 0.61 },
        { x: 0.58, y: 0.62 },
        { x: 0.59, y: 0.59 },
      ],
      color: '#6366f1',
      metadata: {
        capital: 'Havana',
        capitalCoords: { x: 0.50, y: 0.60 },
      },
    },
    {
      id: 'bahamas',
      name: 'Bahamas',
      polygon: [
        { x: 0.58, y: 0.54 },
        { x: 0.575, y: 0.57 },
        { x: 0.62, y: 0.58 },
        { x: 0.625, y: 0.55 },
      ],
      color: '#fbbf24',
      metadata: {
        capital: 'Nassau',
        capitalCoords: { x: 0.60, y: 0.56 },
      },
    },
    {
      id: 'jamaica',
      name: 'Jamaica',
      polygon: [
        { x: 0.465, y: 0.645 },
        { x: 0.462, y: 0.66 },
        { x: 0.495, y: 0.665 },
        { x: 0.50, y: 0.65 },
      ],
      color: '#a855f7',
      metadata: {
        capital: 'Kingston',
        capitalCoords: { x: 0.48, y: 0.655 },
      },
    },
    {
      id: 'haiti',
      name: 'Haiti',
      polygon: [
        { x: 0.555, y: 0.625 },
        { x: 0.550, y: 0.645 },
        { x: 0.575, y: 0.65 },
        { x: 0.58, y: 0.63 },
      ],
      color: '#22d3ee',
      metadata: {
        capital: 'Port-au-Prince',
        capitalCoords: { x: 0.565, y: 0.638 },
      },
    },
    {
      id: 'dominican-republic',
      name: 'Dominican Republic',
      polygon: [
        { x: 0.580, y: 0.630 },
        { x: 0.578, y: 0.650 },
        { x: 0.625, y: 0.655 },
        { x: 0.630, y: 0.635 },
      ],
      color: '#fb923c',
      metadata: {
        capital: 'Santo Domingo',
        capitalCoords: { x: 0.605, y: 0.645 },
      },
    },
    {
      id: 'puerto-rico',
      name: 'Puerto Rico',
      polygon: [
        { x: 0.635, y: 0.645 },
        { x: 0.633, y: 0.658 },
        { x: 0.660, y: 0.662 },
        { x: 0.663, y: 0.648 },
      ],
      color: '#c084fc',
      metadata: {
        capital: 'San Juan',
        capitalCoords: { x: 0.648, y: 0.655 },
      },
    },
    {
      id: 'antigua-and-barbuda',
      name: 'Antigua and Barbuda',
      polygon: [
        { x: 0.690, y: 0.665 },
        { x: 0.688, y: 0.675 },
        { x: 0.702, y: 0.678 },
        { x: 0.705, y: 0.668 },
      ],
      color: '#fb7185',
      metadata: {
        capital: 'St. John\'s',
        capitalCoords: { x: 0.696, y: 0.672 },
      },
    },
    {
      id: 'barbados',
      name: 'Barbados',
      polygon: [
        { x: 0.725, y: 0.705 },
        { x: 0.723, y: 0.715 },
        { x: 0.735, y: 0.718 },
        { x: 0.738, y: 0.708 },
      ],
      color: '#38bdf8',
      metadata: {
        capital: 'Bridgetown',
        capitalCoords: { x: 0.731, y: 0.712 },
      },
    },
    {
      id: 'grenada',
      name: 'Grenada',
      polygon: [
        { x: 0.675, y: 0.730 },
        { x: 0.673, y: 0.740 },
        { x: 0.685, y: 0.743 },
        { x: 0.688, y: 0.733 },
      ],
      color: '#4ade80',
      metadata: {
        capital: 'St. George\'s',
        capitalCoords: { x: 0.681, y: 0.737 },
      },
    },
    {
      id: 'trinidad-and-tobago',
      name: 'Trinidad and Tobago',
      polygon: [
        { x: 0.650, y: 0.760 },
        { x: 0.648, y: 0.775 },
        { x: 0.670, y: 0.780 },
        { x: 0.673, y: 0.763 },
      ],
      color: '#fb923c',
      metadata: {
        capital: 'Port of Spain',
        capitalCoords: { x: 0.661, y: 0.772 },
      },
    },
  ],
  createdAt: Date.now(),
  updatedAt: Date.now(),
  tags: ['North America', 'Central America', 'Caribbean'],
};

// Generate quiz questions for countries
function generateCountryQuestions() {
  return northAmericaMap.regions.map((region) => ({
    id: `country-${region.id}`,
    type: 'locate' as const,
    prompt: region.name,
    correctRegionId: region.id,
  }));
}

// Generate quiz questions for capitals
function generateCapitalQuestions() {
  return northAmericaMap.regions
    .filter((region) => region.metadata?.capital)
    .map((region) => ({
      id: `capital-${region.id}`,
      type: 'locate' as const,
      prompt: region.metadata!.capital!,
      correctRegionId: region.id,
    }));
}

// Generate quiz questions for both (mixed)
function generateBothQuestions() {
  const questions = [];
  for (const region of northAmericaMap.regions) {
    // Add country question
    questions.push({
      id: `country-${region.id}`,
      type: 'locate' as const,
      prompt: region.name,
      correctRegionId: region.id,
    });
    // Add capital question
    if (region.metadata?.capital) {
      questions.push({
        id: `capital-${region.id}`,
        type: 'locate' as const,
        prompt: region.metadata.capital,
        correctRegionId: region.id,
      });
    }
  }
  // Shuffle questions for variety
  return questions.sort(() => Math.random() - 0.5);
}

// Countries only quiz
export const northAmericaCountriesQuiz: Quiz = {
  id: 'north-america-countries',
  mapId: 'north-central-america',
  name: 'North America: Countries',
  description: 'Locate all 20 countries in North and Central America',
  questions: generateCountryQuestions(),
  settings: {
    allowRetry: true,
    showCorrectAnswers: true,
    scoringMode: 'accuracy',
    passingScore: 80,
  },
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

// Capitals only quiz
export const northAmericaCapitalsQuiz: Quiz = {
  id: 'north-america-capitals',
  mapId: 'north-central-america',
  name: 'North America: Capitals',
  description: 'Locate all 20 capital cities in North and Central America',
  questions: generateCapitalQuestions(),
  settings: {
    allowRetry: true,
    showCorrectAnswers: true,
    scoringMode: 'accuracy',
    passingScore: 75,
  },
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

// Both countries and capitals quiz
export const northAmericaBothQuiz: Quiz = {
  id: 'north-america-both',
  mapId: 'north-central-america',
  name: 'North America: Countries & Capitals',
  description: 'Locate all 20 countries and their capitals (40 questions total)',
  questions: generateBothQuestions(),
  settings: {
    allowRetry: true,
    showCorrectAnswers: true,
    scoringMode: 'accuracy',
    passingScore: 75,
  },
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
