import { RecipeConverter } from './recipe-converter';
import { Ingredient, FLOUR } from '../proportions-datasource';

fdescribe('Recipe converter', () => {
  const converter: RecipeConverter = new RecipeConverter();

  const getIngredients = (text: string): Ingredient =>
    converter.convertLine(text);

  [
    '50 g flour',
    '50g flour',
    '50 grams flour',
    '50  g  flour'
  ].forEach((recipeText: string) => {
    it('should convert text to ingredients', () => {
      const ingredient: Ingredient = getIngredients(recipeText);

      expect(ingredient.name).toEqual(FLOUR);
      expect(ingredient.weight).toEqual(50);
    });
  });

  [
    '50 grams all-purpose flour',
    '50 g all-purpose flour'
  ].forEach((recipeText: string) => {
    it('should convert text to ingredients', () => {
      const ingredient: Ingredient = getIngredients(recipeText);

      expect(ingredient.name).toEqual('all-purpose flour');
      expect(ingredient.weight).toEqual(50);
    });
  });

  [
    '1/2 c all purpose flour',
    '2 oz eggs'
  ].forEach((inconvertibleText: string) => {
    it('should return a list of ingredients that cant be converted', () => {
      const result: Ingredient= converter.convertLine(inconvertibleText);
      expect(result).toEqual(undefined);
    });
  });

  [
    {text: '3 c all purpose flour', expectedWeight: 360},
    {text: '3.5 cup all purpose flour', expectedWeight: 420},
    {text: '3.5 cups allpurpose flour', expectedWeight: 420},
    {text: '3.5 c all-purpose flour', expectedWeight: 420}
  ].forEach((value: {text: string; expectedWeight: number}) => {
    it('should convert flour in cups', () => {
      const ingredient: Ingredient = getIngredients(value.text);
      expect(ingredient.name).toMatch(new RegExp(/all[-\s]*purpose\s+flour/));
      expect(ingredient.weight).toEqual(value.expectedWeight);
    });
  });

  it('should convert multi word ingredient', () => {
    const recipeText = '60g candied orange peel';

    const ingredient: Ingredient = getIngredients(recipeText);

    expect(ingredient.name).toEqual('candied orange peel');
    expect(ingredient.weight).toEqual(60);
  });

  it('should convert a single egg into grams', () => {
    const ingredient: Ingredient = getIngredients('1 egg');
    expect(ingredient.name).toEqual('egg');
    expect(ingredient.weight).toEqual(48);
  });

  it('should convert multiple eggs into grams', () => {
    const ingredient: Ingredient = getIngredients('2 eggs');
    expect(ingredient.name).toEqual('eggs');
    expect(ingredient.weight).toEqual(96);
  });

  it('should convert a single egg yolk into grams', () => {
    const ingredient: Ingredient = getIngredients('1 egg yolk');
    expect(ingredient.name).toEqual('egg yolk');
    expect(ingredient.weight).toEqual(18);
  });

  ['2 egg yolks', '2 eggs yolks', '2 yolks'].forEach((line: string) => {
    it('should convert egg yolks into grams', () => {
      const ingredient: Ingredient = getIngredients(line);
      expect(ingredient.name).toEqual(line.substr(2));
      expect(ingredient.weight).toEqual(36);
    });
  });

  it('should convert a single egg white into grams', () => {
    const ingredient: Ingredient = getIngredients('1 egg white');
    expect(ingredient.name).toEqual('egg white');
    expect(ingredient.weight).toEqual(30);
  });

  ['2 egg whites', '2 eggs white'].forEach((line: string) => {
    it('should convert egg whites into grams', () => {
      const ingredient: Ingredient = getIngredients(line);
      expect(ingredient.name).toEqual(line.substr(2));
      expect(ingredient.weight).toEqual(60);
    });
  });
});
