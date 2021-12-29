import { IngredientConverter } from './ingredient-converter';

const eggYolkPattern = new RegExp(/(\d+)\s*([egg|eggs]*[\s]*yolk[s]*)/);
const eggYolkConverter: IngredientConverter = new IngredientConverter(eggYolkPattern, 18);

const eggPattern = new RegExp(/(\d+)\s+(egg[s]*)/);
const wholeEggConverter: IngredientConverter = new IngredientConverter(eggPattern, 48);

const eggWhitePattern = new RegExp(/(\d+)\s*([egg|eggs]* white[s]*)/);
const eggWhiteConverter: IngredientConverter = new IngredientConverter(eggWhitePattern, 30);

const flourPattern = new RegExp(/^(?!\/)(\d+|\d+\.\d+)\s*(?:c|cup|cups)\s+([\w-\s]*flour)/);
const flourConverter: IngredientConverter = new IngredientConverter(flourPattern, 120);

const gramPattern = new RegExp(/(\d+)\s*(?:g|gram|grams)\s+([\w\s-]+)/);
const basicConverter: IngredientConverter = new IngredientConverter(gramPattern, 1);

export const CONVERTERS: IngredientConverter[] = [
  eggYolkConverter,
  eggWhiteConverter,
  wholeEggConverter,
  flourConverter,
  basicConverter
];
