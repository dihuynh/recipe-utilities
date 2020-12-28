import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { ProportionsComponent } from './proportions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('ProportionsComponent', () => {
  let component: ProportionsComponent;
  let fixture: ComponentFixture<ProportionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProportionsComponent ],
      imports: [
        ReactiveFormsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatSliderModule,
        MatButtonModule,
        MatButtonToggleModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProportionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
