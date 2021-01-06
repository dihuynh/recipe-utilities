import { toIngredientsFromRecipeTex } from "./recipe-converter";
import { Ingredient, FLOUR } from "./proportions-datasource";

describe('Recipe converter', () => {

  [
    '50 g flour',
    '50g flour',
    '50  g  flour'
  ].forEach((recipeText: string) => {
    it('should convert text to ingredients', () => {
      const ingredients: Ingredient[] = toIngredientsFromRecipeTex(recipeText);

      expect(ingredients[0].name).toEqual(FLOUR);
      expect(ingredients[0].weight).toEqual(50);
    });
  });

  it('should convert multi word ingredient', () => {
    const recipeText: string = '60g candied orange peel';

    const ingredients: Ingredient[] = toIngredientsFromRecipeTex(recipeText);

    expect(ingredients[0].name).toEqual('candied orange peel');
    expect(ingredients[0].weight).toEqual(60);
  });

  it('should convert multiple lines into multiple ingredients', () => {
    const recipeText: string = '50 g flour \n 100g butter';

    const ingredients: Ingredient[] = toIngredientsFromRecipeTex(recipeText);

    const flour: Ingredient = ingredients[0];
    expect(flour.name).toEqual(FLOUR);
    expect(flour.weight).toEqual(50);

    const butter: Ingredient = ingredients[1];
    expect(butter.name).toEqual('butter');
    expect(butter.weight).toEqual(100);
  });
});
