import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule }  from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FileUploadModule,
    ToastModule,
    MessagesModule,
  ],
  providers: [MessageService]
})
export class DashboardModule { }
