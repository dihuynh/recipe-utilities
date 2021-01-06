export interface Ingredient {
  name: string;
  weight: number;
  percentage?: string;
}

export interface Preset {
  name: string;
  recipe: Ingredient[];
}

export const FLOUR: string = "flour";

export const SOURDOUGH_RECIPE: Ingredient[] = [
  { name: FLOUR, weight: 500, percentage: '100' },
  { name: "water", weight: 375, percentage: '75' },
  { name: "levain", weight: 100, percentage: '20' },
  { name: "salt", weight: 10, percentage: '2' }
]

export const BRIOCHE_RECIPE: Ingredient[] = [
  { name: FLOUR, weight: 500 },
  { name: "liquid", weight: 375 },
  { name: "levain", weight: 100 },
  { name: "sugar", weight: 100 },
  { name: "butter", weight: 100 },
  { name: "egg", weight: 10 },
  { name: "salt", weight: 10 }
]

export const WHITE_BREAD_RECIPE: Ingredient[] = [
  { name: FLOUR, weight: 500 },
  { name: "liquid", weight: 375 },
  { name: "levain", weight: 100 },
  { name: "sugar", weight: 100 },
  { name: "butter", weight: 100 },
  { name: "salt", weight: 10 }
]

export const PRESETS: Preset[] = [
  { name: "Sourdough", recipe: SOURDOUGH_RECIPE },
  { name: "Brioche", recipe: BRIOCHE_RECIPE },
  { name: "White bread", recipe: WHITE_BREAD_RECIPE }
];
