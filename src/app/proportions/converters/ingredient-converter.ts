import { Ingredient } from '../proportions-datasource';

export class IngredientConverter {
  private fractionPattern = new RegExp('(\\d*)\\s*(\\d+)\\/(\\d+)');

  constructor(private pattern: RegExp,
    private multiplier: number){
  }

  public match(line: string): Ingredient {
    if (this.containsFraction(line)) {
      line = this.convertFractionToDecimal(line);
    }
    const match: RegExpMatchArray | null = line.match(this.pattern);
    if (match !== null && match !== undefined) {
      return this.getResult(line, match);
    }
    return undefined;
  }

  public getResult(line: string, result: RegExpMatchArray) {
    if (result.length < 2 || Number.isNaN(result[1])) {
      console.log('Cannot convert this line', line);
      return undefined;
    }
    return {
      name: result[2],
      weight: Number(result[1]) * this.multiplier
    };
  }

  private convertFractionToDecimal(line: string) {
    const fractionMatch: RegExpMatchArray | null = line.match(this.fractionPattern);
    const fractionString = fractionMatch[0];
    const wholeValue = Number(fractionMatch[1]);
    const nominatorValue = Number(fractionMatch[2]);
    const denominatorValue = Number(fractionMatch[3]);
    const fractionValue = (wholeValue + nominatorValue / denominatorValue).toFixed(2);
    line = line.replace(fractionString, fractionValue);
    return line;
  }

  private containsFraction(line: string) {
    return line.includes('/');
  }
}
