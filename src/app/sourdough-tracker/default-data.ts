export interface StepDefinition {
  title: string;
  durationInMinutes: number;
}

export const BASIC_STEPS: StepDefinition[] = [
  {
    title: 'Autolyse',
    durationInMinutes: 180
  },
  {
    title: 'Levain mix',
    durationInMinutes: 30
  },
  {
    title: 'Salt mix',
    durationInMinutes: 30
  },
  {
    title: 'Lamination',
    durationInMinutes: 30
  },
  {
    title: 'Stretch/Fold',
    durationInMinutes: 30
  },
  {
    title: 'Stretch/Fold',
    durationInMinutes: 30
  },
  {
    title: 'Stretch/Fold',
    durationInMinutes: 30
  },
  {
    title: 'Stretch/Fold',
    durationInMinutes: 30
  },
  {
    title: 'Bulk rest',
    durationInMinutes: 60
  },
  {
    title: 'Preshape',
    durationInMinutes: 30
  }
];

