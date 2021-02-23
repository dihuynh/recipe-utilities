import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProportionsComponent } from './proportions/proportions.component';
import { SourdoughTrackerComponent } from './sourdough-tracker/sourdough-tracker.component';

const routes: Routes = [
  { path: "proportions", component: ProportionsComponent },
  { path: "tracker", component: SourdoughTrackerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
