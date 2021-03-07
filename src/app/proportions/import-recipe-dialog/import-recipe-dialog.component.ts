import { RecipeConverter } from './../recipe-converter';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Ingredient } from '../proportions-datasource';

@Component({
  selector: 'app-import-recipe-dialog',
  templateUrl: './import-recipe-dialog.component.html',
  styleUrls: ['./import-recipe-dialog.component.css']
})
export class ImportRecipeDialogComponent implements OnInit {

  public recipeText: FormControl = new FormControl();
  public convertedRecipe: Ingredient[];
  public failedIngredient: Ingredient[];

  private converter: RecipeConverter = new RecipeConverter();

  constructor() { }

  ngOnInit(): void {
  }

  public import(): void {
    this.converter.convert(this.recipeText.value);
  }

}
