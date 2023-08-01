import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartComponent } from './components/chart/chart.component';

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
    path: 'chart',
    component: ChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
