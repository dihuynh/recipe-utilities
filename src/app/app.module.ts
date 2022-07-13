import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProportionsComponent } from './proportions/proportions.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SourdoughTrackerComponent } from './tracker-page/sourdough-tracker/sourdough-tracker.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CdTimerModule } from 'angular-cd-timer';
import { TrackerPageComponent } from './tracker-page/tracker-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ImportRecipeDialogComponent } from './proportions/import-recipe-dialog/import-recipe-dialog.component';
import { CompareComponent } from './compare/compare.component';
import { ImportRecipesToCompareComponent } from './compare/import-recipes-to-compare/import-recipes-to-compare.component';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    ProportionsComponent,
    SourdoughTrackerComponent,
    TrackerPageComponent,
    ImportRecipeDialogComponent,
    ImportRecipesToCompareComponent,
    CompareComponent
  ],
  imports: [
    MatStepperModule,
    MatIconModule,
    BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatSliderModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    FlexLayoutModule,
    MatSortModule,
    MatGridListModule,
    CdTimerModule
  ],
  exports: [ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
