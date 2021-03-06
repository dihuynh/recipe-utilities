import { AlarmService } from 'src/app/services/alarm.service';
import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CdTimerComponent } from 'angular-cd-timer';
import { StepDefinition } from '../default-data';

export interface Step {
  timerIndex?: number;
  definition: StepDefinition;
}

@Component({
  selector: 'app-sourdough-tracker',
  templateUrl: './sourdough-tracker.component.html',
  styleUrls: ['./sourdough-tracker.component.css']
})
export class SourdoughTrackerComponent implements OnInit, AfterViewInit {
  @Input()
  public stepDefinitions: StepDefinition[];

  @ViewChildren(CdTimerComponent)
  private timerComponentsChildren: QueryList<CdTimerComponent>;

  public steps: Step[];

  private timerComponents: CdTimerComponent[];

  constructor(private alarmService: AlarmService) { }

  public ngOnInit() {
    let index = 0;
    this.steps = this.stepDefinitions.map((stepDef: StepDefinition) => {
      const step: Step = {
        definition: stepDef
      };
      if (stepDef.duration !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        step.timerIndex = index,
        index++;
      }
      return step;
    });
  }

  public ngAfterViewInit() {
    this.timerComponents = this.timerComponentsChildren.toArray();
    if (this.steps[0].timerIndex === 0) {
      this.timerComponents[0].start();
    }
  }

  public next(currentIndex: number) {
    this.alarmService.reset();
    const nextStep = this.steps[currentIndex + 1];
    if (nextStep.timerIndex !== undefined) {
      this.timerComponents[nextStep.timerIndex].start();
    }
  }

  public playAlarmSound(): void {
    this.alarmService.play();
  }
}
