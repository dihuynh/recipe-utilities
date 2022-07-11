import { ImportRecipesToCompareComponent } from './import-recipes-to-compare/import-recipes-to-compare.component';
import { Ingredient, CompareIngredient } from './../proportions/proportions-datasource';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  displayedColumns = ['name', 'recipe 1', 'recipe 2', 'diff'];
  public dataSource: MatTableDataSource<CompareIngredient>;
  constructor(private dialog: MatDialog) { }

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
        diff: '0%'
      },
    ];
    this.dataSource = new MatTableDataSource(data);
    const dialogRef = this.dialog.open(ImportRecipesToCompareComponent, {
        height: '400px',
        width: '800px'
    });
  }
}
