import { IngredientConverter } from './ingredient-converter';

const cupRegex = (ingredient: string) => {
  const pattern = '^(?!\/)(\\d+|\\d+\\.\\d+)\\s*(?:c|cup|cups)\\s+([\\w-\\s]*'+ ingredient +')';
  return new RegExp(pattern);
};

const tbsRegex = (ingredient: string) => {
  const pattern = '^(?!\/)(\\d+|\\d+\\.\\d+)\\s*(?:tablespoon|tablespoons|tbs)\\s+('+ ingredient +')';
  return new RegExp(pattern);
};

const tspRegex = (ingredient: string) => {
  const pattern = '^(?!\/)(\\d+|\\d+\\.\\d+)\\s*(?:teaspoon|teaspoons|tsp)\\s+('+ ingredient +')';
  return new RegExp(pattern);
};

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
const saltTbsConverter: IngredientConverter = new IngredientConverter(tbsRegex('salt'), 10);

// teaspoon
const bakingPowderTspConverter: IngredientConverter = new IngredientConverter(tspRegex('baking powder'), 4);
const bakingSodaTspConverter: IngredientConverter = new IngredientConverter(tspRegex('baking soda'), 4);
const saltTspConverter: IngredientConverter = new IngredientConverter(tspRegex('salt'), 3);

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
  bakingPowderTspConverter,
  bakingSodaTspConverter,
  saltTbsConverter,
  saltTspConverter,
  waterConverter,
  basicConverter
];
