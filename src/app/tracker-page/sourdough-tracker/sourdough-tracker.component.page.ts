import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CdTimerComponent } from 'angular-cd-timer';
import { SourdoughTrackerComponent } from './sourdough-tracker.component';

export class SourdoughTrackerComponentPage  {
  constructor(private fixture: ComponentFixture<SourdoughTrackerComponent>) {
  }

  public cdTimerComponent(): CdTimerComponent {
    return this.fixture.debugElement.query(By.directive(CdTimerComponent)).componentInstance;
  }
}
