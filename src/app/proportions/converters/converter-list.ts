import { IngredientConverter } from './ingredient-converter';

const cupRegex = (ingredient: string) => {
  const pattern = '^(?!\/)(\\d+|\\d+\\.\\d+)\\s*(?:c|cup|cups)\\s+([\\w-\\s]*'+ ingredient +')';
  return new RegExp(pattern);
};

const tbsRegex = (ingredient: string) => {
  const pattern = '^(?!\/)(\\d+|\\d+\\.\\d+)\\s*(?:tablespoon|tablespoons|tbs)\\s+([\\w-\\s]*'+ ingredient +')';
  return new RegExp(pattern);
};

// eggs
const eggYolkPattern = new RegExp(/(\d+)\s*([egg|eggs]*[\s]*yolk[s]*)/);
const eggYolkConverter: IngredientConverter = new IngredientConverter(eggYolkPattern, 18);
const eggPattern = new RegExp(/(\d+)\s+(egg[s]*)/);
const wholeEggConverter: IngredientConverter = new IngredientConverter(eggPattern, 48);
const eggWhitePattern = new RegExp(/(\d+)\s*([egg|eggs]* white[s]*)/);
const eggWhiteConverter: IngredientConverter = new IngredientConverter(eggWhitePattern, 30);

// cups
const flourConverter: IngredientConverter = new IngredientConverter(cupRegex('flour'), 120);
const sugarConverter: IngredientConverter = new IngredientConverter(cupRegex('sugar'), 200);
const brownSugarConverter: IngredientConverter = new IngredientConverter(cupRegex('brown sugar'), 216);
const butterConverter: IngredientConverter = new IngredientConverter(cupRegex('butter'), 227);
const waterConverter: IngredientConverter = new IngredientConverter(cupRegex('water'), 236);

// tablespoon
const sugarTbsConverter: IngredientConverter = new IngredientConverter(tbsRegex('sugar'), 12.5);

const mlPattern = new RegExp(/(\d+)\s*(?:ml)\s+([\w\s-]+)/);
const mlConverter: IngredientConverter = new IngredientConverter(mlPattern, 1);

// base
const gramPattern = new RegExp(/(\d+)\s*(?:g|gram|grams)\s+([\w\s-]+)/);
const basicConverter: IngredientConverter = new IngredientConverter(gramPattern, 1);

export const CONVERTERS: IngredientConverter[] = [
  eggYolkConverter,
  eggWhiteConverter,
  wholeEggConverter,
  flourConverter,
  butterConverter,
  brownSugarConverter,
  sugarTbsConverter,
  sugarConverter,
  waterConverter,
  mlConverter,
  basicConverter
];
