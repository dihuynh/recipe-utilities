import { Component, OnInit } from '@angular/core';
import { Ingredient, DEFAULTS, FLOUR } from './proportions-datasource';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-proportions',
  templateUrl: './proportions.component.html',
  styleUrls: ['./proportions.component.css']
})
export class ProportionsComponent implements OnInit {
  public dataSource: MatTableDataSource<Ingredient>;

  displayedColumns = ['name', 'weight', 'percentage'];
  public weightFormControl = new FormControl();
  public formGroup: FormGroup;
  public recipeText: string = '';
  private ingredients: Ingredient[] = DEFAULTS;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({});
    this.dataSource = new MatTableDataSource(this.ingredients);
    this.ingredients.forEach((ing: Ingredient) => {
      this.formGroup.addControl(ing.name, new FormControl(ing.weight));
    });

    this.formGroup.valueChanges.subscribe((values) => {
      this.updatePercentages(values);
    });
  }

  public add() {
    this.ingredients.push({ name: '', weight: 0, percentage: '0' });
    this.dataSource = new MatTableDataSource(this.ingredients);
  }

  public export() {
    this.recipeText = '';
    Object.keys(this.formGroup.value).forEach((ingName: string) => {
      this.recipeText += this.formGroup.controls[ingName].value + ' g ' + ingName + '<br />';
    });
  }

  private updatePercentages(values) {
    const flourWeight: number = values[FLOUR];

    Object.keys(values).forEach((controlName: string) => {
      if (name !== FLOUR) {
        const ingWeight: number = this.formGroup.controls[controlName].value;
        const percentage: number = ingWeight / flourWeight * 100;

        let ing = this.ingredients.find((data: Ingredient) => data.name === controlName);
        ing.percentage = percentage.toFixed(2);
      }
    });
  }
}
