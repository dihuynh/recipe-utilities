import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { BASIC_STEPS } from './default-data';
import { SourdoughTrackerComponent } from './sourdough-tracker/sourdough-tracker.component';

import { TrackerPageComponent } from './tracker-page.component';

describe('TrackerPageComponent', () => {
  let component: TrackerPageComponent;
  let fixture: ComponentFixture<TrackerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerPageComponent, MockComponent(SourdoughTrackerComponent) ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerPageComponent);
    component = fixture.componentInstance;
    component.definitions = BASIC_STEPS;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
