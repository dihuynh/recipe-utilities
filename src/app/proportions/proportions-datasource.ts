import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export interface Ingredient {
  name: string;
  weight: number;
  percentage: number;
}

export const DEFAULTS : Ingredient[] = [
  { name: "Flour", weight: 0, percentage: 100 },
  { name: "Water", weight: 0, percentage: 0 },
  { name: "Yeast", weight: 0, percentage: 0 },
  { name: "Salt", weight: 0, percentage: 0 }
]
