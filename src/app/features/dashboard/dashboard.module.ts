import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule }  from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessageService } from 'primeng/api';
import { ChartComponent } from './components/chart/chart.component';
import { DataService } from './services/data.service';
import { NgChartsModule } from 'ng2-charts';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    DashboardComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FileUploadModule,
    ToastModule,
    MessagesModule,
    NgChartsModule,
    CardModule
  ],
  providers: [MessageService, DataService]
})
export class DashboardModule { }
