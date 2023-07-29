import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) {}

  private readFile(file: File){
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const fileContent = e.target.result;
      console.log(fileContent);
    };
    reader.readAsText(file);
  }

  
  public onUpload(event:any) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }
      console.log(event);
      
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
      this.readFile(event.files[0]);
  }

}
