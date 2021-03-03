import { ComponentFixture } from '@angular/core/testing';
import { ProportionsComponent } from './proportions.component';
import { By } from '@angular/platform-browser';

export class ProportionsComponentPage {

  constructor(private fixture: ComponentFixture<ProportionsComponent>) {
   }

  public setWeightOnRow(index: number, newWeight: number): void {
    const element: HTMLInputElement = this.getWeightInputOnRow(index);
    element.value = newWeight.toString();
    element.dispatchEvent(new Event('input'));
    element.dispatchEvent(new Event('blur'));
    this.fixture.detectChanges();
  }

  public ingredientPercentageOnRow(index: number): string {
    return this.fixture.debugElement.query(By.css(`#percentage-${index}`)).nativeElement.innerText;
  }

  public getWeightInputOnRow(i: number): HTMLInputElement {
    return this.fixture.debugElement.query(By.css(`input#weight-input-${i}`)).nativeElement;
  }

  public ingredientNameOnRow(i: number): string {
    return this.getNameInputOnRow(i).value;
  }

  public ingredientWeightOnRow(i: number): number {
    return Number(this.getWeightInputOnRow(i).value);
  }

  private getNameInputOnRow(index: number): HTMLInputElement {
    return this.fixture.debugElement.query(By.css(`input#name-input-${index}`)).nativeElement;
  }
}
