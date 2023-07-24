import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppExecutivesComponent } from './app-executives/app-executives.component';
import { AppExecutivesGroupComponent } from './app-executives-group/app-executives-group.component';

const routes: Routes = [
  {path: '', redirectTo: 'executive_group', pathMatch: 'full'},
  {path: 'executive_group', component: AppExecutivesGroupComponent},
  {path: 'executive', component: AppExecutivesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
