import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { assert } from 'console';
import { CompareIngredient, Ingredient } from '../proportions/proportions-datasource';

import { CompareComponent } from './compare.component';
import { RecipesToCompare } from './import-recipes-to-compare/import-recipes-to-compare.component';
import { of } from 'rxjs';

describe('CompareComponent', () => {
  let component: CompareComponent;
  let fixture: ComponentFixture<CompareComponent>;
  let afterClosedResult: RecipesToCompare;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareComponent ],
      imports: [
        NoopAnimationsModule,
        MatDialogModule
      ],
      providers: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setIngredientsToCompare should compare percentages from both recipes', () => {
    const recipe1: Ingredient[] = [
      { name: 'flour', weight: 100 },
      { name: 'butter', weight: 10 },
      { name: 'sugar', weight: 10 }
    ];
    const recipe2: Ingredient[] = [
      { name: 'flour', weight: 200 },
      { name: 'butter', weight: 10 },
      { name: 'salt', weight: 20 }
    ];
    afterClosedResult= { recipe1, recipe2 };
    const data: CompareIngredient[] = component.setIngredientsToCompare(afterClosedResult);

    expect(data[0]).toEqual({
      name: 'flour',
      percentage1: '100',
      percentage2: '100',
      diff: '0'
    });
    expect(data[1]).toEqual({
      name: 'butter',
      percentage1: '10',
      percentage2: '5',
      diff: '5'
    });
    expect(data[2]).toEqual({
      name: 'sugar',
      percentage1: '10',
      percentage2: '0',
      diff: '10'
    });
    expect(data[3]).toEqual({
      name: 'salt',
      percentage1: '0',
      percentage2: '10',
      diff: '-10'
    });
  });
});
