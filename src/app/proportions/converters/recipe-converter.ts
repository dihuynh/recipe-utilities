import { CONVERTERS } from './converter-list';
import { Injectable } from '@angular/core';
import { Ingredient } from '../proportions-datasource';

@Injectable()
export class RecipeConverter {

  public convertLine(line: string): Ingredient {
    let results: Ingredient;
    for (const converter of CONVERTERS) {
      results = converter.match(line);
      if (results !== undefined) {
        break;
      }
    }
    return results;
  }
}

export const toRecipeText =
(ingredients: Ingredient[]): string =>
  ingredients
    .map((ing: Ingredient) => `${ing.percentage}%, ${ing.weight}g ${ing.name}`)
    .join('\n');

