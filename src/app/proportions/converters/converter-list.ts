import { IngredientConverter } from './ingredient-converter';

export const eggYolkPattern = new RegExp(/(\d+)\s*([egg|eggs]*[\s]*yolk[s]*)/);
export const eggYolkConverter: IngredientConverter = new IngredientConverter(eggYolkPattern, 18);

export const eggPattern = new RegExp(/(\d+)\s+(egg[s]*)/);
export const wholeEggConverter: IngredientConverter = new IngredientConverter(eggPattern, 48);

export const eggWhitePattern = new RegExp(/(\d+)\s*([egg|eggs]* white[s]*)/);
export const eggWhiteConverter: IngredientConverter = new IngredientConverter(eggWhitePattern, 30);

export const gramPattern = new RegExp(/(\d+)\s*(?:g|gram|grams)\s+([\w\s-]+)/);
export const basicConverter: IngredientConverter = new IngredientConverter(gramPattern, 1);
