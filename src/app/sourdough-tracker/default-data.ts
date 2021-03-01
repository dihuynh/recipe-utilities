export interface StepDefinition {
  title: string;
  duration?: number; // in minutes
}

export function makeWaitStep(minutes: number): StepDefinition {
  return {
    title: 'Rest',
    duration: minutes
  }
}

export const BASIC_STEPS: StepDefinition[] = [
  {
    title: 'Autolyse'
  },
  makeWaitStep(.05),
  {
    title: 'Levain mix'
  },
  makeWaitStep(.05),
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

