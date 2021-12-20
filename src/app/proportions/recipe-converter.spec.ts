import { RecipeConverter, ConverterResult } from './recipe-converter';
import { Ingredient, FLOUR } from './proportions-datasource';

describe('Recipe converter', () => {
  const converter: RecipeConverter = new RecipeConverter();

  const getIngredients = (text: string): Ingredient[] =>
    converter.convert(text).ingredients;

  [
    '50 g flour',
    '50g flour',
    '50 grams flour',
    '50  g  flour'
  ].forEach((recipeText: string) => {
    it('should convert text to ingredients', () => {
      const ingredients: Ingredient[] = getIngredients(recipeText);

      expect(ingredients[0].name).toEqual(FLOUR);
      expect(ingredients[0].weight).toEqual(50);
    });
  });

  [
    '50 grams all-purpose flour',
    '50 g all-purpose flour'
  ].forEach((recipeText: string) => {
    it('should convert text to ingredients', () => {
      const ingredients: Ingredient[] = getIngredients(recipeText);

      expect(ingredients[0].name).toEqual('all-purpose flour');
      expect(ingredients[0].weight).toEqual(50);
    });
  });

  [
    '1/2 c all purpose flour',
    '2 oz eggs'
  ].forEach((inconvertibleText: string) => {
    it('should return a list of ingredients that cant be converted', () => {
      const result: ConverterResult = converter.convert(inconvertibleText);
      expect(result.errors).toEqual([inconvertibleText]);
    });
  });

  it('should convert multi word ingredient', () => {
    const recipeText = '60g candied orange peel';

    const ingredients: Ingredient[] = getIngredients(recipeText);

    expect(ingredients[0].name).toEqual('candied orange peel');
    expect(ingredients[0].weight).toEqual(60);
  });

  it('should convert multiple lines into multiple ingredients', () => {
    const recipeText = '50 g flour \n 100g butter';

    const ingredients: Ingredient[] = getIngredients(recipeText);

    const flour: Ingredient = ingredients[0];
    expect(flour.name).toEqual(FLOUR);
    expect(flour.weight).toEqual(50);

    const butter: Ingredient = ingredients[1];
    expect(butter.name).toEqual('butter');
    expect(butter.weight).toEqual(100);
  });

  it('should convert a single egg into grams', () => {
    const ingredients: Ingredient[] = getIngredients('1 egg');
    expect(ingredients[0].name).toEqual('egg');
    expect(ingredients[0].weight).toEqual(48);
  });

  it('should convert multiple eggs into grams', () => {
    const ingredients: Ingredient[] = getIngredients('2 eggs');
    expect(ingredients[0].name).toEqual('eggs');
    expect(ingredients[0].weight).toEqual(96);
  });

  it('should convert a single egg yolk into grams', () => {
    const ingredients: Ingredient[] = getIngredients('1 egg yolk');
    expect(ingredients[0].name).toEqual('egg yolk');
    expect(ingredients[0].weight).toEqual(18);
  });

  ['2 egg yolks', '2 eggs yolks', '2 yolks'].forEach((line: string) => {
    it('should convert egg yolks into grams', () => {
      const ingredients: Ingredient[] = getIngredients(line);
      expect(ingredients[0].name).toEqual(line.substr(2));
      expect(ingredients[0].weight).toEqual(36);
    });
  });

  it('should convert a single egg white into grams', () => {
    const ingredients: Ingredient[] = getIngredients('1 egg white');
    expect(ingredients[0].name).toEqual('egg white');
    expect(ingredients[0].weight).toEqual(30);
  });

  ['2 egg whites', '2 eggs white'].forEach((line: string) => {
    it('should convert egg yolks into grams', () => {
      const ingredients: Ingredient[] = getIngredients(line);
      expect(ingredients[0].name).toEqual(line.substr(2));
      expect(ingredients[0].weight).toEqual(60);
    });
  });
});
