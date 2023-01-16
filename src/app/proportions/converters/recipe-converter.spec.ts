import { RecipeConverter } from './recipe-converter';
import { Ingredient } from '../proportions-datasource';

class TestIngredient {
  constructor(
    public line: string,
    public expectedWeight: number,
    public expectedName: string){
    }
}

describe('Recipe converter', () => {
  const converter: RecipeConverter = new RecipeConverter();

  const getIngredients = (text: string): Ingredient =>
    converter.convertLine(text);

  [
    new TestIngredient('50 g flour', 50, 'flour'),
    new TestIngredient('50 grams flour', 50, 'flour'),
    new TestIngredient('50  g  flour', 50, 'flour'),
    new TestIngredient('50 grams all-purpose flour', 50, 'all-purpose flour'),
    new TestIngredient('50 g all-purpose flour', 50, 'all-purpose flour'),

    new TestIngredient('3 c all purpose flour', 360, 'all purpose flour'),
    new TestIngredient('3.5 cup all purpose flour', 420, 'all purpose flour'),
    new TestIngredient('3.5 cups bread flour', 420, 'bread flour'),

    new TestIngredient('1 c sugar', 200, 'sugar'),
    new TestIngredient('1.5 cup white sugar', 300, 'white sugar'),
    new TestIngredient('1 tbs sugar', 12.5, 'sugar'),
    new TestIngredient('1 tablespoon sugar', 12.5, 'sugar'),

    new TestIngredient('1 c brown sugar', 216, 'brown sugar'),
    new TestIngredient('1.5 cup packed brown sugar', 324, 'packed brown sugar'),

    new TestIngredient('1 c butter', 227, 'butter'),
    new TestIngredient('2 cups french butter', 454, 'french butter'),

    new TestIngredient('2 egg whites', 60, 'egg whites'),
    new TestIngredient('2 eggs white', 60, 'eggs white'),
    new TestIngredient('2 egg yolks', 36, 'egg yolks'),
    new TestIngredient('2 eggs yolk', 36, 'eggs yolk'),
    new TestIngredient('2 yolks', 36, 'yolks'),
    new TestIngredient('2 eggs', 96, 'eggs'),
    new TestIngredient('2 large eggs', 96, 'eggs'),

    new TestIngredient('1 c water', 236, 'water'),

    new TestIngredient('1 teaspoon baking soda', 4, 'baking soda'),
    new TestIngredient('2 tsp baking powder', 8, 'baking powder'),
    new TestIngredient('3 tsp baking soda', 12, 'baking soda'),

    new TestIngredient('4 tsp salt', 12, 'salt'),
    new TestIngredient('1 tablespoon salt', 10, 'salt'),
    new TestIngredient('2 tbs salt', 20, 'salt'),

    new TestIngredient('60g candied orange peel', 60, 'candied orange peel')
  ].forEach((value: TestIngredient) => {
    it(`should convert ${value.line} to ${value.expectedWeight} ${value.expectedName}`, () => {
      const ingredient: Ingredient = getIngredients(value.line);
      expect(ingredient).toBeTruthy();
      expect(ingredient.name).toEqual(value.expectedName);
      expect(ingredient.weight).toEqual(value.expectedWeight);
    });
  });

  [
    '2 oz eggs'
  ].forEach((inconvertibleText: string) => {
    it('should return a list of ingredients that cant be converted', () => {
      const result: Ingredient= converter.convertLine(inconvertibleText);
      expect(result).toEqual(undefined);
    });
  });

  [
    new TestIngredient('1/2 c flour', 60, 'flour'),
    new TestIngredient('2 1/4 C flour', 270, 'flour'),
  ].forEach((value: TestIngredient) => {
    it(`should convert fractions ${value.line} to ${value.expectedWeight} ${value.expectedName}`, () => {
      const ingredient: Ingredient = getIngredients(value.line);
      expect(ingredient).toBeTruthy();
      expect(ingredient.name).toEqual(value.expectedName);
      expect(ingredient.weight).toEqual(value.expectedWeight);
    });
  });
});
