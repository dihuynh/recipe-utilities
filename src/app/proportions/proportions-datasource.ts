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

export const EXAMPLE: Ingredient[] = [
  { name: "Flour", weight: 0, percentage: 100 }
]
