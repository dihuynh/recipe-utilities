import { ComponentFixture } from "@angular/core/testing";
import { ProportionsComponent } from "./proportions.component";
import { MatTableHarness } from '@angular/material/table/testing';
import { HarnessLoader } from "@angular/cdk/testing";
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import { By } from "@angular/platform-browser";

export class ProportionsComponentPage {

  public setWeightOnRow(index: number, newWeight: number): void {
    let element: HTMLInputElement = this.getWeightInputOnRow(index);
    element.value = newWeight.toString();
    element.dispatchEvent(new Event('input'));
    element.dispatchEvent(new Event('blur'));
    this.fixture.detectChanges();
  }

  private getNameInputOnRow(index: number): HTMLInputElement {
    return this.fixture.debugElement.query(By.css(`input#name-input-${index}`)).nativeElement;
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

  constructor(private fixture: ComponentFixture<ProportionsComponent>) {
   }

}