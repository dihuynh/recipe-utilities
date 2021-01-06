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
import { SOURDOUGH_RECIPE, Ingredient } from './proportions-datasource';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { toRecipeText } from './recipe-converter';
import { MatSliderHarness } from '@angular/material/slider/testing';

describe('ProportionsComponent', () => {
  let component: ProportionsComponent;
  let page: ProportionsComponentPage;
  let loader: HarnessLoader;
  let fixture: ComponentFixture<ProportionsComponent>;
  const nonFlourIngredients: Ingredient[] = SOURDOUGH_RECIPE.slice(1);
  const flourWeight: number = SOURDOUGH_RECIPE[0].weight;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProportionsComponent],
      imports: [
        ReactiveFormsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatSliderModule,
        MatButtonModule,
        MatButtonToggleModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProportionsComponent);
    component = fixture.componentInstance;
    page = new ProportionsComponentPage(fixture);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should show default sourdough recipe', async () => {
    await assertTableShowsSourdoughRecipe();
  });

  it('changing a non-flour ingredient weight should reflect in changing its percentage', () => {
    nonFlourIngredients.forEach((ing: Ingredient, index: number) => {
      // index + 1 because array doesnt include flour
      page.setWeightOnRow(index + 1, ing.weight * 2);
      expect(page.ingredientPercentageOnRow(index + 1)).toEqual(`${Number(ing.percentage) * 2}%`);
    });
  });

  it('changing flour weight should change other ingredients percentages', () => {
    page.setWeightOnRow(0, flourWeight / 2);

    nonFlourIngredients.forEach((ing: Ingredient, index: number) => {
      // since flour was halved, each ing should be double the old percentage
      // index + 1 because array doesnt include flour
      expect(page.ingredientPercentageOnRow(index + 1)).toEqual(`${Number(ing.percentage) * 2}%`);
    });
  });

  it('should add a new ingredient and have correct percentage', async () => {
    const addButton: MatButtonHarness = await loader.getHarness(MatButtonHarness.with({ text: 'Add' }));
    await addButton.click();

    let rows: MatRowHarness[] = await loader.getAllHarnesses(MatRowHarness);
    expect(rows.length).toEqual(SOURDOUGH_RECIPE.length + 1);

    page.setWeightOnRow(SOURDOUGH_RECIPE.length, flourWeight);
    expect(page.ingredientPercentageOnRow(SOURDOUGH_RECIPE.length)).toEqual(`100%`);
  });

  it('should export recipe into plain text value', async () => {
    const exportButton: MatButtonHarness = await loader.getHarness(MatButtonHarness.with({ text: 'Export' }));
    await exportButton.click();

    const recipeInput: MatInputHarness = await loader.getHarness(MatInputHarness.with({ selector: 'textarea' }));
    const actualRecipe: string = await recipeInput.getValue();
    expect(actualRecipe).toEqual(toRecipeText(SOURDOUGH_RECIPE));
  });

  it('should import recipe into table', async () => {
    const recipeInput: MatInputHarness = await loader.getHarness(MatInputHarness.with({ selector: 'textarea' }));
    await recipeInput.setValue(toRecipeText(SOURDOUGH_RECIPE));

    await assertTableShowsSourdoughRecipe();
  });

  it('should be able to scale', async () => {
    let slider: MatSliderHarness = await loader.getHarness(MatSliderHarness);

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

  const assertTableShowsSourdoughRecipe = async (): Promise<void> => {
    let rows: MatRowHarness[] = await loader.getAllHarnesses(MatRowHarness);
    expect(rows.length).toEqual(SOURDOUGH_RECIPE.length);
    SOURDOUGH_RECIPE.forEach((ing: Ingredient, i: number) => {
      expect(page.ingredientWeightOnRow(i)).toEqual(ing.weight);
      expect(page.ingredientNameOnRow(i)).toEqual(ing.name);
      expect(page.ingredientPercentageOnRow(i)).toEqual(`${ing.percentage}%`);
    });
  }
});
