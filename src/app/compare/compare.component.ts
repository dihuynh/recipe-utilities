import { ImportRecipesToCompareComponent, RecipesToCompare } from './import-recipes-to-compare/import-recipes-to-compare.component';
import { Ingredient, CompareIngredient, FLOUR } from './../proportions/proportions-datasource';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  displayedColumns = ['name', 'recipe 1', 'recipe 2', 'diff'];
  public dataSource: MatTableDataSource<CompareIngredient>;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  compare() {
    let data: CompareIngredient[] = [];
    const dialogRef = this.dialog.open(ImportRecipesToCompareComponent, {
        height: '400px',
        width: '800px'
    });
    dialogRef.afterClosed().subscribe((recipes: RecipesToCompare) => {
      data = this.setIngredientsToCompare(recipes);
      this.dataSource = new MatTableDataSource(data);
   });
  }

  public setIngredientsToCompare(recipes: RecipesToCompare): CompareIngredient[] {
    const fullRecipes: RecipesToCompare = this.addPercentages(recipes);
    const data: CompareIngredient[] = [];
    fullRecipes.recipe1.forEach(ing1 => {
      const ing2: Ingredient = fullRecipes.recipe2.filter(ing => ing.name === ing1.name)[0];
      const ing2Percentage: string = ing2 === undefined ? '0' : ing2.percentage;
      const diff: number = parseInt(ing1.percentage, 10) - parseInt(ing2Percentage, 10);
      data.push({
        name: ing1.name,
        percentage1: ing1.percentage,
        percentage2: ing2Percentage,
        diff: diff.toString()
      });
    });
    const ingOnlyInRecipe2: Ingredient[] = fullRecipes.recipe2.filter(
      ing => false === this.ingredientInRecipe(recipes.recipe1, ing));
    ingOnlyInRecipe2.forEach(ing => {
      data.push({
        name: ing.name,
        percentage1: '0',
        percentage2: ing.percentage,
        diff: '-' + ing.percentage
      });
    });
    return data;
  }

  private ingredientInRecipe(recipe: Ingredient[], ing: Ingredient): boolean {
    return recipe.find(ingredient => ingredient.name === ing.name) !== undefined;
  }

  private addPercentages(recipes: RecipesToCompare): RecipesToCompare {
    return {
      recipe1: this.addPercentagesToRecipe(recipes.recipe1),
      recipe2: this.addPercentagesToRecipe(recipes.recipe2)
    };

  }

  private addPercentagesToRecipe(ingredients: Ingredient[]): Ingredient[] {
    const flour: Ingredient = ingredients.filter(ing => ing.name.toLowerCase().includes(FLOUR))[0];
    flour.percentage = '100';
    ingredients.filter(ing => !ing.name.includes(FLOUR)).forEach(ing => {
      ing.percentage = this.getPercentage(ing, flour.weight);
    });
    return ingredients;
  }

  private getPercentage(ing: Ingredient, flourWeight: number): string {
    const percentage: number = ing.weight/ flourWeight * 100;
    return percentage.toFixed(0);
  }
}
