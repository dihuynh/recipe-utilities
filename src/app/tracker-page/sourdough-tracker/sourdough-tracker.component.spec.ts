import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatStepperHarness } from '@angular/material/stepper/testing';
import { SourdoughTrackerComponent } from './sourdough-tracker.component';

describe('SourdoughTrackerComponent', () => {
  let component: SourdoughTrackerComponent;
  let fixture: ComponentFixture<SourdoughTrackerComponent>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SourdoughTrackerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourdoughTrackerComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  it('should render the stepper based on provided steps', async () => {
    component.stepDefinitions = [{
      title: "Test",
      duration: 1
    }];
    fixture.detectChanges();

    let stepperHarness: MatStepperHarness = await loader.getHarness(MatStepperHarness);
  });
});
