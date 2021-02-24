export interface Step {
  title: string;
  startTime?: Date;
  startingDuration: number; // in minutes
  actualDuration: number // in minutes
}

export const BASIC_STEPS: Step[] = [
  {
    title: 'Autolyse',
    startingDuration: 360,
    actualDuration: 0,
  },
  {
    title: 'Levain mix',
    startingDuration: 30,
    actualDuration: 0,
  },
  {
    title: 'Salt mix',
    startingDuration: 30,
    actualDuration: 0,
  },
  {
    title: 'Lamination',
    startingDuration: 30,
    actualDuration: 0,
  },
  {
    title: 'Stretch/Fold',
    startingDuration: 30,
    actualDuration: 0,
  },
  {
    title: 'Stretch/Fold',
    startingDuration: 30,
    actualDuration: 0,
  },
  {
    title: 'Stretch/Fold',
    startingDuration: 30,
    actualDuration: 0,
  },
  {
    title: 'Stretch/Fold',
    startingDuration: 30,
    actualDuration: 0,
  },
  {
    title: 'Bulk rest',
    startingDuration: 60,
    actualDuration: 0,
  },
  {
    title: 'Preshape',
    startingDuration: 30,
    actualDuration: 0,
  }
];

