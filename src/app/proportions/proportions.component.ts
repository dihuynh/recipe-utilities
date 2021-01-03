import { Component, OnInit } from '@angular/core';
import { Ingredient, FLOUR, PRESETS, Preset } from './proportions-datasource';
import { FormControl, FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { toRecipeText, toIngredients } from './recipe-converter';

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
  public PRESETS: Preset[] = PRESETS;

  private ingredientsAtBaseScale: Map<string, number> = new Map();
  private flourFormGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.ingredientsFormArray = this.fb.array([]);
    this.formGroup = this.fb.group({
      array: this.ingredientsFormArray
    });
    this.updateIngredientsWhenPresetChanges();
    this.updateIngredientsWhenScaleChanges();
    this.presetFormControl.setValue(PRESETS[0]);
  }

  private updateIngredientsWhenScaleChanges() {
    this.scaleFormControl.valueChanges.subscribe((scale: number) => {
      this.ingredientsFormArray.controls.forEach((group: FormGroup) => {
        group.controls['weight'].setValue(this.ingredientsAtBaseScale.get(group.controls['name'].value) * scale);
      });
    });
  }

  private updateIngredientsWhenPresetChanges() {
    this.presetFormControl.valueChanges.subscribe((newPreset: Preset) => {
      this.setIngredients(newPreset.recipe);
    });
  }

  private setIngredients(recipe: Ingredient[]): void {
    this.ingredientsFormArray.controls = [];
    this.addIngredientFromRecipe(recipe);
    this.dataSource = new MatTableDataSource(recipe);
  }

  private addIngredientFromRecipe(recipe: Ingredient[]): void {
    recipe.forEach((ing: Ingredient) => {
      let formGroup: FormGroup = this.fb.group({
        name: [ing.name],
        weight: [ing.weight]
      });
      this.ingredientsFormArray.push(formGroup);
      this.setFlourFormGroup(ing, formGroup);
    });
  }

  private setFlourFormGroup(ing: Ingredient, formGroup: FormGroup): void {
    if (ing.name === FLOUR) {
      this.flourFormGroup = formGroup;
    }
  }

  public add(): void {
    this.ingredientsFormArray.push(this.fb.group({
      name: [''],
      weight: [0]
    }));
    this.dataSource = new MatTableDataSource(this.ingredientsFormArray.value);
  }

  public export(): void {
    this.recipeText.setValue(toRecipeText(this.ingredientsFormArray.value));
  }

  public import(): void {
    this.setIngredients(toIngredients(this.recipeText.value));
  }

  public getIngredientFormGroup(index: number): FormGroup {
    return this.ingredientsFormArray.controls[index] as FormGroup;
  }

  public getPercentage(index: number): string {
    const formGroup: IngredientFormValue = this.ingredientsFormArray.controls[index].value;
    if (this.flourFormGroup.value.weight === 0) {
      return '';
    }
    const ingWeight: number = formGroup.weight;
    const percentage: number = ingWeight / this.flourFormGroup.value.weight * 100;
    return percentage.toFixed(0);
  }

  public setBaseScale(): void {
    this.ingredientsFormArray.value.forEach((value: IngredientFormValue) => {
      this.ingredientsAtBaseScale.set(value.name, value.weight);
    });
  }
}
