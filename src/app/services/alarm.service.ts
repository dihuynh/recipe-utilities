export class AlarmService {
  private alarm: HTMLAudioElement;

  constructor() {
    this.alarm = new Audio('../../assets/alert.ogg');
  }

  public play(): void {
    this.alarm.volume = 1;
    this.alarm.play();
  }

  public reset(): void {
    this.alarm.pause();
    this.alarm.load();
  }
}
