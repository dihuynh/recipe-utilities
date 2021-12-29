import { Ingredient } from '../proportions-datasource';

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
