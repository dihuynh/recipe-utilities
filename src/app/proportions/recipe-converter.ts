import { IngredientFormValue } from './proportions.component';
import { Ingredient } from './proportions-datasource';

export const PATTERN = new RegExp(/(\d+)\s*g\s+([\w\s]+)/);

const convertLine = (line: string): Ingredient => {
  const results: RegExpExecArray = PATTERN.exec(line.trim());
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




