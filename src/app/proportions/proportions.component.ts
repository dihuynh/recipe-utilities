import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Ingredient, DEFAULTS } from './proportions-datasource';
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
  }
}
