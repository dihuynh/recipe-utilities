export interface Recipe {
  ingredients: Ingredient[];
  baseIngredientName: string;
}

export interface Ingredient {
  name: string;
  weight: number;
  percentage?: string;
}

export interface CompareIngredient {
  name: string;
  percentage1: string;
  percentage2: string;
  diff: string;
}


export const FLOUR = 'flour';

export const SOURDOUGH_RECIPE: Ingredient[] = [
  { name: 'water', weight: 375, percentage: '75' },
  { name: 'bread flour', weight: 500, percentage: '100' },
  { name: 'levain', weight: 100, percentage: '20' },
  { name: 'salt', weight: 10, percentage: '2' }
];
