import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RecipeConverter, toIngredientText } from 'src/app/proportions/converters/recipe-converter';
import { Ingredient } from 'src/app/proportions/proportions-datasource';

@Component({
  selector: 'app-import-recipes-to-compare',
  templateUrl: './import-recipes-to-compare.component.html'
})
export class ImportRecipesToCompareComponent implements OnInit {

  public recipe1Text: FormControl = new FormControl();
  public recipe1Result: ImportRecipeResult;
  public recipe2Text: FormControl = new FormControl();
  public recipe2Result: ImportRecipeResult;
  public result: string;
  public error: boolean;
  private converter: RecipeConverter = new RecipeConverter();

  constructor(public dialogRef: MatDialogRef<ImportRecipesToCompareComponent, RecipesToCompare>) { }

  ngOnInit(): void {
  }

  public clearStatus(): void {
    this.error = false;
  }

  public compare(): void {
    this.error = false;
    this.recipe1Result = this.processRecipeText(this.recipe1Text.value);
    this.recipe2Result = this.processRecipeText(this.recipe2Text.value);
    this.recipe1Text.setValue(this.recipe1Result.convertedRecipe);
    this.recipe2Text.setValue(this.recipe2Result.convertedRecipe);
    this.error = this.recipe1Result.failedResults.length > 0
      || this.recipe2Result.failedResults.length > 0;
    if (!this.error) {
      this.dialogRef.close({
        recipe1: this.recipe1Result.ingredients,
        recipe2: this.recipe2Result.ingredients,
      });
    }
  }

  private processRecipeText(rawText: string): ImportRecipeResult {
    const recipeLines: string[] = rawText.split('\n').filter(line => line.trim().length !== 0);
    const lineResult: string[] = [];
    const ingredients: Ingredient[] = [];
    const failedResults: string[] = [];
    recipeLines.forEach((line: string) => {
      const convertedLine: Ingredient = this.converter.convertLine(line);
      const valid: boolean = convertedLine ? true : false;
      if (valid) {
        lineResult.push(toIngredientText(convertedLine));
        ingredients.push(convertedLine);
      } else {
        failedResults.push(line);
      }
    });
    return {
      failedResults,
      ingredients,
      convertedRecipe: lineResult.join(`\n`)
    };
  }
}

export interface ResultLine {
  line: string;
  valid: boolean;
}

export interface ImportRecipeResult {
  failedResults: string[];
  ingredients: Ingredient[];
  convertedRecipe: string;
}

export interface RecipesToCompare {
  recipe1: Ingredient[];
  recipe2: Ingredient[];
}
