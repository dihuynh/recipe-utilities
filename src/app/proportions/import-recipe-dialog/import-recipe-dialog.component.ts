import { Ingredient } from './../proportions-datasource';
import { RecipeConverter, ConverterResult } from './../recipe-converter';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-import-recipe-dialog',
  templateUrl: './import-recipe-dialog.component.html',
  styleUrls: ['./import-recipe-dialog.component.css']
})
export class ImportRecipeDialogComponent implements OnInit {

  public recipeText: FormControl = new FormControl();
  public result: string;
  public error: boolean;
  private converter: RecipeConverter = new RecipeConverter();
  private rawRecipeInput: string;

  constructor(public dialogRef: MatDialogRef<ImportRecipeDialogComponent>) { }

  ngOnInit(): void {
  }

  public clearStatus(): void {
    this.error = false;
    this.recipeText.setValue(this.rawRecipeInput);
  }

  public import(): void {
    this.error = false;
    const recipeToImport = this.recipeText.value;
    this.rawRecipeInput = recipeToImport;
    const recipeLines: string[] = recipeToImport.split('\n');
    const lineResult: string[] = [];
    const ingredients: Ingredient[] = [];
    recipeLines.forEach((line: string) => {
      const convertedLine: Ingredient = this.converter.convertLine(line);
      const valid: boolean = convertedLine ? true : false;
      if (valid) {
        lineResult.push(`✅ ${line}`);
        ingredients.push(convertedLine);
      } else {
        lineResult.push(`❌ ${line}`);
        this.error = true;
      }
    });
    this.recipeText.setValue(lineResult.join(`\n`));
    if (!this.error) {
      this.dialogRef.close(ingredients);
    }
  }
}

export interface ResultLine {
  line: string;
  valid: boolean;
}
