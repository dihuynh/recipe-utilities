export interface Ingredient {
  name: string;
  weight: number;
}

export interface Preset {
  name: string;
  recipe: Ingredient[];
}

export const FLOUR: string = "Flour";

export const SOURDOUGH_RECIPE: Ingredient[] = [
  { name: FLOUR, weight: 500 },
  { name: "Water", weight: 375 },
  { name: "Levain", weight: 100 },
  { name: "Salt", weight: 10 }
]

export const BRIOCHE_RECIPE: Ingredient[] = [
  { name: FLOUR, weight: 500 },
  { name: "Liquid", weight: 375 },
  { name: "Levain", weight: 100 },
  { name: "Sugar", weight: 100 },
  { name: "Butter", weight: 100 },
  { name: "Egg", weight: 10 },
  { name: "Salt", weight: 10 }
]

export const WHITE_BREAD_RECIPE: Ingredient[] = [
  { name: FLOUR, weight: 500 },
  { name: "Liquid", weight: 375 },
  { name: "Levain", weight: 100 },
  { name: "Sugar", weight: 100 },
  { name: "Butter", weight: 100 },
  { name: "Salt", weight: 10 }
]

export const PRESETS: Preset[] = [
  { name: "Sourdough", recipe: SOURDOUGH_RECIPE },
  { name: "Brioche", recipe: BRIOCHE_RECIPE },
  { name: "White bread", recipe: WHITE_BREAD_RECIPE }
];
