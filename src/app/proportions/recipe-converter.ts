import { IngredientFormValue } from './proportions.component';
import { Ingredient } from './proportions-datasource';

export const GRAM_PATTERN = new RegExp(/(\d+)\s*g\s+([\w\s]+)/);
export const EGG_PATTERN = new RegExp(/(\d+)\s+(egg[s]*)/);
export const EGG_YOLK_PATTERN = new RegExp(/(\d+)\s*([egg|eggs]* yolk[s]*)/);
export const EGG_WHITE_PATTERN = new RegExp(/(\d+)\s*([egg|eggs]* white[s]*)/);

const eggResult = (results: RegExpMatchArray): Ingredient =>
  ({
    name: results[2],
    weight: Number(results[1]) * 57
  });

const eggYolkResult = (results: RegExpMatchArray): Ingredient =>
  ({
    name: Number(results[1]) === 1 ? 'egg yolk' : 'egg yolks',
    weight: Number(results[1]) * 18
  });

const eggWhiteResult = (results: RegExpMatchArray): Ingredient =>
  ({
    name: Number(results[1]) === 1 ? 'egg white' : 'egg whites',
    weight: Number(results[1]) * 40
  });

const convertLine = (line: string): Ingredient => {
  let results: RegExpMatchArray | null = line.match(EGG_YOLK_PATTERN);
  if (results !== undefined && results !== null) {
    return eggYolkResult(results);
  }

  results = line.match(EGG_WHITE_PATTERN);
  if (results !== undefined && results !== null) {
    return eggWhiteResult(results);
  }

  results = line.match(EGG_PATTERN);
  if (results !== undefined && results !== null) {
    return eggResult(results);
  }

  results = GRAM_PATTERN.exec(line.trim());
  return {
    name: results[2],
    weight: Number(results[1])
  };
};

export const toRecipeText =
(ingredients: { name: string; weight: number }[]): string =>
  ingredients
    .map((ing: IngredientFormValue) => ing.weight + ' g ' + ing.name)
    .join('\n');


export const toIngredientsFromRecipeTex = (recipeText: string): Ingredient[] => {
  const lines: string[] = recipeText.split('\n');
  return lines.map((line: string) => convertLine(line));
};

export const toIngredientsFromFormValues = (ingredients: IngredientFormValue[]): Ingredient[] =>
  ingredients.map((ing: IngredientFormValue) => ({
      name: ing.name,
      weight: ing.weight,
      percentage: '0'
    } as Ingredient));

