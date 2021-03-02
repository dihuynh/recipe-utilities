import { TrackerPageComponent } from './tracker-page/tracker-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProportionsComponent } from './proportions/proportions.component';

const routes: Routes = [
  { path: "proportions", component: ProportionsComponent },
  { path: "tracker", component: TrackerPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
