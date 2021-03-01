import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CdTimerComponent } from 'angular-cd-timer';
import { BASIC_STEPS, StepDefinition } from './default-data';

export interface Step {
  timerIndex?: number;
  definition: StepDefinition;
}

@Component({
  selector: 'sourdough-tracker',
  templateUrl: './sourdough-tracker.component.html',
  styleUrls: ['./sourdough-tracker.component.css']
})
export class SourdoughTrackerComponent implements OnInit, AfterViewInit {
  public steps: Step[];
  private alarm: HTMLAudioElement;

  @ViewChildren(CdTimerComponent)
  private timerComponentsChildren: QueryList<CdTimerComponent>;

  private timerComponents: CdTimerComponent[];

  constructor() { }

  ngOnInit() {
    let index = 0;
    this.steps = BASIC_STEPS.map((stepDef: StepDefinition) => {
      let step: Step = {
        definition: stepDef
      };
      if (stepDef.duration) {
        step.timerIndex = index,
        index++;
      }
      return step;
    });
    this.alarm = new Audio('../../assets/alert.ogg');
  }

  ngAfterViewInit() {
    this.timerComponents = this.timerComponentsChildren.toArray();
  }

  public next(currentIndex: number) {
    this.resetAlarm();
    let nextStep = this.steps[currentIndex + 1];
    if (nextStep.timerIndex !== undefined) {
      this.timerComponents[nextStep.timerIndex].start();
    }
  }

  private resetAlarm() {
    this.alarm.pause();
    this.alarm.load();
  }

  public playAlarmSound(): void {
    this.alarm.volume = 1;
    this.alarm.play();
  }
}
