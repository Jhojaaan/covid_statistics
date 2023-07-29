import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'info',
    component: DashboardComponent
  },{
    path: '',
    redirectTo: 'info',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'info',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
