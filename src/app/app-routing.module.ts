import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProportionsComponent } from './proportions/proportions.component';

const routes: Routes = [
  { path: "proportions", component: ProportionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
