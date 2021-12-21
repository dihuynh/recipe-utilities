import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ProportionsComponent } from './proportions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProportionsComponentPage } from './proportion-component.page';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatRowHarness } from '@angular/material/table/testing';
import { SOURDOUGH_RECIPE, Ingredient, FLOUR } from './proportions-datasource';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { toRecipeText } from './recipe-converter';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

describe('ProportionsComponent', () => {
  let component: ProportionsComponent;
  let page: ProportionsComponentPage;
  let loader: HarnessLoader;
  let fixture: ComponentFixture<ProportionsComponent>;

  const flourWeight: number = SOURDOUGH_RECIPE[1].weight;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProportionsComponent],
      imports: [
        ReactiveFormsModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatListModule,
        MatSliderModule,
        MatButtonModule,
        MatButtonToggleModule,
        NoopAnimationsModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProportionsComponent);
    component = fixture.componentInstance;
    page = new ProportionsComponentPage(fixture);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  const assertTableShowsSourdoughRecipe = async (): Promise<void> => {
    const rows: MatRowHarness[] = await loader.getAllHarnesses(MatRowHarness);
    expect(rows.length).toEqual(SOURDOUGH_RECIPE.length);
    SOURDOUGH_RECIPE.forEach((ing: Ingredient, i: number) => {
      expect(page.ingredientWeightOnRow(i)).toEqual(ing.weight);
      expect(page.ingredientNameOnRow(i)).toEqual(ing.name);
      expect(page.ingredientPercentageOnRow(i)).toEqual(`${ing.percentage}%`);
    });
  };

  it('should show default sourdough recipe', async () => {
    await assertTableShowsSourdoughRecipe();
  });

  it('changing a non-flour ingredient weight should reflect in changing its percentage', () => {
    SOURDOUGH_RECIPE.forEach((ing: Ingredient, index: number) => {
      if (ing.name.includes(FLOUR) === false) {
        page.setWeightOnRow(index, ing.weight * 2);
        expect(page.ingredientPercentageOnRow(index)).toEqual(`${Number(ing.percentage) * 2}%`);
      }
    });
  });

  it('changing flour weight should change other ingredients percentages', () => {
    page.setWeightOnRow(1, flourWeight / 2);

    SOURDOUGH_RECIPE.forEach((ing: Ingredient, index: number) => {
      if (ing.name.includes(FLOUR) === false) {
        // since flour was halved, each ing should be double the old percentage
        expect(page.ingredientPercentageOnRow(index)).toEqual(`${Number(ing.percentage) * 2}%`);
      }
    });
  });

  it('should add a new ingredient and have correct percentage', async () => {
    const addButton: MatButtonHarness = await loader.getHarness(MatButtonHarness.with({ text: /Add/ }));
    await addButton.click();

    const rows: MatRowHarness[] = await loader.getAllHarnesses(MatRowHarness);
    expect(rows.length).toEqual(SOURDOUGH_RECIPE.length + 1);

    page.setWeightOnRow(SOURDOUGH_RECIPE.length, flourWeight);
    expect(page.ingredientPercentageOnRow(SOURDOUGH_RECIPE.length)).toEqual(`100%`);
  });

  it('should export recipe into plain text value', async () => {
    const nonexistentTextArea: Promise<MatInputHarness> = loader.getHarness(MatInputHarness.with({ selector: 'textarea' }));
    await expectAsync(nonexistentTextArea).toBeRejected();

    const exportButton: MatButtonHarness = await loader.getHarness(MatButtonHarness.with({ text: /Export/ }));
    await exportButton.click();

    const recipeTextArea: MatInputHarness = await loader.getHarness(MatInputHarness.with({ selector: 'textarea' }));
    const actualRecipe: string = await recipeTextArea.getValue();
    expect(actualRecipe).toEqual(toRecipeText(SOURDOUGH_RECIPE));
  });

  xit('should import recipe into table', async () => {
    const recipeInput: MatInputHarness = await loader.getHarness(MatInputHarness.with({ selector: 'textarea' }));
    await recipeInput.setValue(toRecipeText(SOURDOUGH_RECIPE));

    await assertTableShowsSourdoughRecipe();
  });

  it('should be able to scale', async () => {
    const slider: MatSliderHarness = await loader.getHarness(MatSliderHarness);

    await slider.setValue(2);
    SOURDOUGH_RECIPE.forEach((ing: Ingredient, i: number) => {
      expect(page.ingredientWeightOnRow(i)).toEqual(ing.weight * 2);
      expect(page.ingredientPercentageOnRow(i)).toEqual(`${ing.percentage}%`);
    });

    await slider.setValue(.5);
    SOURDOUGH_RECIPE.forEach((ing: Ingredient, i: number) => {
      expect(page.ingredientWeightOnRow(i)).toEqual(ing.weight / 2);
      expect(page.ingredientPercentageOnRow(i)).toEqual(`${ing.percentage}%`);
    });
  });
});
