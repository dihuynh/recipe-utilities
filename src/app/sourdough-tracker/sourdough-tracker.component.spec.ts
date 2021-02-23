import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourdoughTrackerComponent } from './sourdough-tracker.component';

describe('SourdoughTrackerComponent', () => {
  let component: SourdoughTrackerComponent;
  let fixture: ComponentFixture<SourdoughTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourdoughTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourdoughTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
