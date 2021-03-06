export interface StepDefinition {
  title: string;
  duration?: number; // in minutes
}

export const makeWaitStep = (minutes: number): StepDefinition =>
  ({
    title: 'Rest',
    duration: minutes
  });
;

export const BASIC_STEPS: StepDefinition[] = [
  {
    title: 'Autolyse'
  },
  makeWaitStep(60),
  {
    title: 'Levain mix'
  },
  makeWaitStep(30),
  {
    title: 'Salt mix'
  },
  makeWaitStep(30),
  {
    title: 'Lamination'
  },
  makeWaitStep(30),
  {
    title: 'Stretch/Fold'
  },
  makeWaitStep(30),
  {
    title: 'Stretch/Fold'
  },
  makeWaitStep(30),
  {
    title: 'Stretch/Fold',
  },
  makeWaitStep(30),
  {
    title: 'Stretch/Fold',
  },
  makeWaitStep(30),
  {
    title: 'Bulk rest',
  },
  makeWaitStep(60),
  {
    title: 'Preshape'
  },
  makeWaitStep(30)
];

