import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CdTimerComponent } from 'angular-cd-timer';
import { BASIC_STEPS, StepDefinition } from './default-data';

@Component({
  selector: 'sourdough-tracker',
  templateUrl: './sourdough-tracker.component.html',
  styleUrls: ['./sourdough-tracker.component.css']
})
export class SourdoughTrackerComponent implements AfterViewInit {
  public steps: StepDefinition[] = BASIC_STEPS;

  @ViewChildren(CdTimerComponent)
  private timerComponentsChildren: QueryList<CdTimerComponent>;

  private timerComponents: CdTimerComponent[];

  constructor() { }

  ngAfterViewInit() {
    this.timerComponents = this.timerComponentsChildren.toArray();
    this.timerComponents[0].start();
  }

  public next(index: number) {
    this.timerComponents[index+1].start();
  }
}
