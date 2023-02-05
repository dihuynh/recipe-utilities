import { toIngredientText } from '../converters/recipe-converter';
import {FLOUR, Ingredient, Recipe} from '../proportions-datasource';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RecipeConverter } from '../converters/recipe-converter';

@Component({
  selector: 'app-import-recipe-dialog',
  templateUrl: './import-recipe-dialog.component.html'
})
export class ImportRecipeDialogComponent implements OnInit {

  public recipeText: FormControl = new FormControl();
  public baseIngredient: FormControl = new FormControl();
  public result: string;
  public failedConversionError: boolean;
  public baseIngredientMissingError: boolean;
  public failedResults: string[] = [];
  private converter: RecipeConverter = new RecipeConverter();
  private rawRecipeInput: string;

  constructor(public dialogRef: MatDialogRef<ImportRecipeDialogComponent>) { }

  ngOnInit(): void {
    this.baseIngredient.setValue(FLOUR);
  }

  public import(): void {
    this.failedConversionError = false;
    this.failedResults = [];
    this.rawRecipeInput = this.recipeText.value;
    const recipeLines: string[] = this.rawRecipeInput.split('\n').filter(line => line.trim().length !== 0);
    const recipe = this.buildRecipe(recipeLines);
    if (!this.failedConversionError && !this.baseIngredientMissingError) {
      this.dialogRef.close(recipe);
    }
  }

  private buildRecipe(recipeLines: string[]) {
    const recipe: Recipe = {
      ingredients: [],
      baseIngredientName: this.baseIngredient.value
    };
    recipeLines.forEach((line: string) => {
      recipe.ingredients.push(this.convertLine(line));
    });
    this.baseIngredientMissingError = this.checkBaseIngredientExist(recipe);
    return recipe;
  }

  private convertLine(line: string) {
    const convertedLine: Ingredient = this.converter.convertLine(line);
    if (!!convertedLine) {
      return convertedLine;
    } else {
      this.failedResults.push(line);
      this.failedConversionError = true;
    }
  }

  private checkBaseIngredientExist(recipe: Recipe): boolean {
    const result = recipe.ingredients.find((ingredient) => recipe.baseIngredientName === ingredient.name);
    // eslint-disable-next-line eqeqeq
    return result == undefined;
  }
}
