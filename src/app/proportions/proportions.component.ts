import { Component, OnInit } from '@angular/core';
import {Ingredient, FLOUR, PRESETS, Preset, Recipe} from './proportions-datasource';
import { FormControl, FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { toRecipeText, RecipeConverter } from './converters/recipe-converter';
import { MatDialog } from '@angular/material/dialog';
import { ImportRecipeDialogComponent } from './import-recipe-dialog/import-recipe-dialog.component';

export interface IngredientFormValue {
  name: string;
  weight: number;
}

export interface FormGroupValue {
  array: IngredientFormValue[];
}

@Component({
  selector: 'app-proportions',
  templateUrl: './proportions.component.html',
  styleUrls: ['./proportions.component.css']
})
export class ProportionsComponent implements OnInit {
  public dataSource: MatTableDataSource<Ingredient>;

  displayedColumns = ['name', 'weight', 'percentage'];
  public scaleFormControl = new FormControl(1);
  public ingredientsFormArray: FormArray;
  public presetFormControl: FormControl = new FormControl();
  public formGroup: FormGroup;
  public recipeText: FormControl = new FormControl();
  public presets: Preset[] = PRESETS;

  private ingredientsAtBaseScale: Map<string, number> = new Map();
  private flourFormGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.ingredientsFormArray = this.fb.array([], { updateOn: 'blur' });
    this.formGroup = this.fb.group({
      array: this.ingredientsFormArray,
      preset: this.presetFormControl
    });
    this.updateWhenPresetChanges();
    this.updateWhenScaleChanges();
    this.updateWhenWeightChanges();
    this.presetFormControl.setValue([PRESETS[0]]);
  }

  public add(): void {
    this.ingredientsFormArray.push(this.fb.group({
      name: [''],
      weight: [0]
    }));
    this.updateDataSource(this.ingredientsFormArray.value);
  }

  public export(): void {
    const ingredients: Ingredient[] = this.ingredientsFormArray.value;
    ingredients.forEach((ing: Ingredient) => {
      ing.percentage = this.getPercentage(ing.weight);
    });
    this.recipeText.setValue(toRecipeText(ingredients));
  }

  public import(): void {
    const dialogRef = this.dialog.open(ImportRecipeDialogComponent, {
        height: 'auto',
        width: '600px'
    });
    dialogRef.afterClosed().subscribe((recipe: Recipe) => {
      this.setIngredients(recipe.ingredients);
    });
  }

  private updateWhenWeightChanges() {
    this.ingredientsFormArray.valueChanges.subscribe((formArrayValue: IngredientFormValue[]) => {
      this.updateDataSource(this.toIngredientsFromFormValues(formArrayValue));
    });
  }

  private toIngredientsFromFormValues(ingredients: IngredientFormValue[]): Ingredient[] {
    return ingredients.map((ing: IngredientFormValue) => ({
        name: ing.name,
        weight: ing.weight,
        percentage: '0'
      } as Ingredient));
  }

  private updateWhenScaleChanges() {
    this.scaleFormControl.valueChanges.subscribe((scale: number) => {
      this.ingredientsFormArray.controls.forEach((group: FormGroup) => {
        group.controls['weight'].setValue(this.ingredientsAtBaseScale.get(group.controls['name'].value) * scale);
      });
    });
  }

  private updateWhenPresetChanges() {
    this.presetFormControl.valueChanges.subscribe((newPreset: Preset[]) => {
      this.setIngredients(newPreset[0].recipe);
    });
  }

  private setIngredients(recipe: Ingredient[]): void {
    this.ingredientsFormArray.controls = [];
    this.addIngredientFromRecipe(recipe);
    this.updateDataSource(recipe);
    this.setBaseScale();
  }

  private updateDataSource(ingredients: Ingredient[]) {
    ingredients.forEach((ing: Ingredient) => {
      ing.percentage = this.getPercentage(ing.weight);
    });
    this.dataSource = new MatTableDataSource(ingredients);
  }

  private addIngredientFromRecipe(recipe: Ingredient[]): void {
    recipe.forEach((ing: Ingredient) => {
      const formGroup: FormGroup = this.fb.group({
        name: [ing.name],
        weight: [ing.weight]
      });
      this.ingredientsFormArray.push(formGroup);
      this.setFlourFormGroup(ing, formGroup);
    });
  }

  private setFlourFormGroup(ing: Ingredient, formGroup: FormGroup): void {
    if (ing.name.includes(FLOUR)) {
      this.flourFormGroup = formGroup;
    }
  }

  private getPercentage(ingWeight: number): string {
    if (this.flourFormGroup.value.weight === 0) {
      return '';
    }
    const percentage: number = ingWeight / this.flourFormGroup.value.weight * 100;
    return percentage.toFixed(0);
  }

  private setBaseScale(): void {
    this.ingredientsFormArray.value.forEach((value: IngredientFormValue) => {
      this.ingredientsAtBaseScale.set(value.name, value.weight);
    });
  }
}
