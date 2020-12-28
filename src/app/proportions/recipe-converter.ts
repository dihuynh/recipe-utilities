import { IngredientFormValue } from "./proportions.component";
import { Ingredient } from "./proportions-datasource";

export const PATTERN: RegExp = new RegExp(/(\d+)\s*g\s+([\w\s]+)/);

export function toRecipeText(ingredients: IngredientFormValue[]): string {
  return ingredients
    .map((ing: IngredientFormValue) => ing.weight + ' g ' + ing.name)
    .join('\n');
}

export function toIngredients(recipeText: string): Ingredient[] {
  let lines: string[] = recipeText.split('\n');
  return lines.map((line: string) => {
    return convertLine(line);
  });
}

function convertLine(line: string): Ingredient {
  let results: RegExpExecArray = PATTERN.exec(line.trim());
  return {
    name: results[2],
    weight: Number(results[1])
  };
}



