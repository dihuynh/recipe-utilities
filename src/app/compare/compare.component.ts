import { Ingredient, CompareIngredient } from './../proportions/proportions-datasource';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  displayedColumns = ['name', 'recipe 1', 'recipe 2', 'diff'];
  public dataSource: MatTableDataSource<CompareIngredient>;
  constructor() { }

  ngOnInit(): void {
    const data: CompareIngredient[] = [
      {
        name: 'butter',
        percentage1: '10%',
        percentage2: '20%',
        diff: '10%'
      },
      {
        name: 'salt',
        percentage1: '20%',
        percentage2: '20%',
        diff: '10%'
      },
    ];
    this.dataSource = new MatTableDataSource(data);
  }
}
