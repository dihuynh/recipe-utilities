import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Ingredient, DEFAULTS, FLOUR } from './proportions-datasource';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-proportions',
  templateUrl: './proportions.component.html',
  styleUrls: ['./proportions.component.css']
})
export class ProportionsComponent implements OnInit {
  public dataSource: Ingredient[] = DEFAULTS;

  displayedColumns = ['name', 'weight', 'percentage'];
  public weightFormControl = new FormControl();
  public formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({});
    this.dataSource.forEach((ing: Ingredient) => {
      this.formGroup.addControl(ing.name, new FormControl(ing.weight));
    });

    this.formGroup.valueChanges.subscribe((values: any) => {
      this.updatePercentages(values);
    });
  }

  private updatePercentages(values: any) {
    const flourWeight: number = this.formGroup.controls['Flour'].value;
    Object.keys(this.formGroup.controls).forEach((controlName: string) => {
      console.log('name', controlName);
      if (name !== FLOUR){
        const ingWeight: number = this.formGroup.controls[controlName].value;
        const percentage: number = ingWeight/flourWeight * 100;

        let ing = this.dataSource.find((data: Ingredient) => data.name === controlName);
        ing.percentage = percentage;
      }
    });
  }
}
