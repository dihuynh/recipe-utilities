import { CdTimerComponent } from 'angular-cd-timer';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatStepperHarness, MatStepHarness } from '@angular/material/stepper/testing';
import { SourdoughTrackerComponent } from './sourdough-tracker.component';
import { MatStepperModule, MatStepperNext } from '@angular/material/stepper';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { SourdoughTrackerComponentPage } from './sourdough-tracker.component.page';
import { AlarmService } from 'src/app/services/alarm.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

describe('SourdoughTrackerComponent', () => {
  let component: SourdoughTrackerComponent;
  let fixture: ComponentFixture<SourdoughTrackerComponent>;
  let loader: HarnessLoader;
  let page: SourdoughTrackerComponentPage;
  const alarmService: Spy<AlarmService> = createSpyFromClass(AlarmService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SourdoughTrackerComponent,
        MockComponent(CdTimerComponent)
      ],
      imports: [
        MatStepperModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AlarmService, useValue: alarmService }
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourdoughTrackerComponent);
    page = new SourdoughTrackerComponentPage(fixture);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  it('should render the stepper based on provided steps', async () => {
    component.stepDefinitions = [{
      title: 'Test',
      duration: 1
    }];
    fixture.detectChanges();

    const stepperHarness: MatStepperHarness = await loader.getHarness(MatStepperHarness);
    const stepsInStepper: MatStepHarness[] = await stepperHarness.getSteps();
    expect(stepsInStepper.length).toEqual(1);
    await expectAsync(stepsInStepper[0].getLabel()).toBeResolvedTo('Test');

    expect(page.cdTimerComponent().startTime).toEqual(60);
  });

  it('when the user clicks next into a step with a timer, the timer is automatically started', async () => {
    component.stepDefinitions = [
      {
        title: 'Step 1',
      },
      {
        title: 'Step 2',
        duration: 1
      }];
    fixture.detectChanges();

    const timer: CdTimerComponent = page.cdTimerComponent();
    spyOn(timer, 'start');

    const nextButtonNativeEl = fixture.debugElement.queryAll(By.directive(MatStepperNext))[0].nativeElement;
    nextButtonNativeEl.click();
    fixture.detectChanges();

    expect(alarmService.reset).toHaveBeenCalledTimes(1);
    expect(timer.start).toHaveBeenCalledTimes(1);
  });

  // can't test because we can't spy on the mocked out component before the first fixture.detectChanges
  // which is where the start method is called
  xit('when first step has a timer, start it automatically' , () => {
    component.stepDefinitions = [
      {
        title: 'Step 1',
        duration: 1
      }
    ];
    fixture.detectChanges();

    const timer: CdTimerComponent = page.cdTimerComponent();
    spyOn(timer, 'start');
    fixture.detectChanges();

    expect(timer.start).toHaveBeenCalledTimes(1);
  });

  it('when the timer finishes, sound the alarm', () => {
    component.stepDefinitions = [
      {
        title: 'Step 1',
        duration: 1
      }];
    fixture.detectChanges();

    const timer: CdTimerComponent = page.cdTimerComponent();
    timer.onComplete.emit();

    expect(alarmService.play).toHaveBeenCalledTimes(1);
  });
});
