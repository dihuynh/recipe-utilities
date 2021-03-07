import { IngredientFormValue } from './proportions.component';
import { Ingredient } from './proportions-datasource';
import { Injectable } from '@angular/core';

export class IngredientConverter {

  constructor(private pattern: RegExp,
    private multiplier: number){
  }

  public match(line: string): Ingredient {
    const match: RegExpMatchArray | null = line.match(this.pattern);
    if (match !== null && match !== undefined) {
      return this.getResult(line, match);
    }
    return undefined;
  }

  public getResult(line: string, result: RegExpMatchArray) {
    if (result.length < 2) {
      console.log('Cannot convert this line', line);
      return undefined;
    }
    return {
      name: result[2],
      weight: Number(result[1]) * this.multiplier
    };
  }
}

export interface ConverterResult {
  ingredients?: Ingredient[];
  errors?: string[];
}

@Injectable()
export class RecipeConverter {
  private eggYolkPattern = new RegExp(/(\d+)\s*([egg|eggs]*[\s]*yolk[s]*)/);
  private eggYolkConverter: IngredientConverter = new IngredientConverter(this.eggYolkPattern, 18);

  private eggPattern = new RegExp(/(\d+)\s+(egg[s]*)/);
  private wholeEggConverter: IngredientConverter = new IngredientConverter(this.eggPattern, 48);

  private eggWhitePattern = new RegExp(/(\d+)\s*([egg|eggs]* white[s]*)/);
  private eggWhiteConverter: IngredientConverter = new IngredientConverter(this.eggWhitePattern, 30);

  private gramPattern = new RegExp(/(\d+)\s*g\s+([\w\s]+)/);
  private basicConverter: IngredientConverter = new IngredientConverter(this.gramPattern, 1);

  public convert(recipeText: string): ConverterResult {
    const lines: string[] = recipeText.split('\n');
    const errors: string[] = [];
    const ingredients: Ingredient[] = [];

    lines.forEach((line: string) => {
      const convertedLine: Ingredient = this.convertLine(line.trim());
      if (convertedLine) {
        ingredients.push(convertedLine);
      } else {
        errors.push(line);
      }
    });
    return {
      ingredients,
      errors
    };
  };

  private convertLine(line: string): Ingredient {
    let results: Ingredient = this.eggYolkConverter.match(line);
    if (results !== undefined) {
      return results;
    }

    results = this.eggWhiteConverter.match(line);
    if (results !== undefined) {
      return results;
    }

    results = this.wholeEggConverter.match(line);
    if (results !== undefined) {
      return results;
    }

    return this.basicConverter.match(line);
  }
}

export const toRecipeText =
(ingredients: { name: string; weight: number }[]): string =>
  ingredients
    .map((ing: IngredientFormValue) => ing.weight + ' g ' + ing.name)
    .join('\n');

