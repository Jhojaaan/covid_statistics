import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { catchError, mergeMap, of } from 'rxjs';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  uploadedFiles: any[] = [];
  data: any[] = [];

  constructor(private messageService: MessageService, private dataService: DataService, private router:Router) {
    
    if(localStorage.getItem('file')){
      this.uploadedFiles.push({name: localStorage.getItem('file')});
      // this.router.navigate(['/dashboard/chart']);
    }

  }

  private readFile(file: File){
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const fileContent = e.target.result;
      this.processCSVData(fileContent);
    };
    reader.readAsText(file);
  }

  private processCSVData(fileContent: string){
    const lines = fileContent.split('\n');
    const regex = /"([^"]*)"/g;
    this.data = lines.map(line => {
      line = line.replace(regex, (m, g1) => g1.replace(/,/g, ' '));
      return line.split(',')
    });
    this.saveData();
  }

  public saveData(){
    this.dataService.saveData(this.data).subscribe(
      (response: any) => {
        localStorage.setItem('file', this.uploadedFiles[0].name);
        this.router.navigate(['/dashboard/chart']);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });

      }
    );
  }


  
  public onUpload(event:any) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }      
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
      this.readFile(event.files[0]);
  }

}
