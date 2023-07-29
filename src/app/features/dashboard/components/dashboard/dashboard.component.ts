import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  uploadedFiles: any[] = [];
  data: any[] = [];

  constructor(private messageService: MessageService) {}

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
    this.getStateWithHighestVictims();
    this.getStateWithLowestVictims();
  }
  
  public onUpload(event:any) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }      
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
      this.readFile(event.files[0]);
  }

  public groupDataByState():any{
    const groupedData:any = {};

    if(!this.data || this.data.length === 0) return; 

    this.data.forEach((row:any) => {

      const state = row[6];
   
      if(!groupedData[state]){
        groupedData[state] = [];
      }

      groupedData[state].push(row);
    });

    return groupedData;

  }

  public getValueInLastDateByState() {

    const data = this.groupDataByState();

    if (!data || Object.keys(data).length === 0) return;
  
    const valueInLastDateByState:any = {};
  
    for (const state in data) {
      if (data.hasOwnProperty(state)) {
        const stateData = data[state];
        let sumOfLastValues = 0;
  
        for (let i = 0; i < stateData.length; i++) {
          const subArray = stateData[i];
          const lastValue = subArray[subArray.length - 1];
          const parsedValue = parseFloat(lastValue);
  
          if (!isNaN(parsedValue)) {
            sumOfLastValues += parsedValue;
          }
        }
  
        valueInLastDateByState[state] = sumOfLastValues;
      }
    }
  
    return valueInLastDateByState;
  }
  
  public getPopulationByState(): any {
    const data = this.groupDataByState();
  
    if (!data || Object.keys(data).length === 0) return;
  
    const populationByState: any = {};
  
    for (const state in data) {
      if (data.hasOwnProperty(state)) {
        const stateData = data[state];
        let populationSum = 0;

        for (const subArray of stateData) {
          const population = subArray[11];
          const parsedPopulation = parseFloat(population);
  
          if (!isNaN(parsedPopulation)) {
            populationSum += parsedPopulation;
          }
        }
        populationByState[state] = populationSum;
      }
    }
  
    return populationByState;
  }
  
  public getStateWithHighestVictims(): any {
    const data = this.getValueInLastDateByState();

    let maxState = '';
    let maxValue = 0;

    for (const state in data) {
      if (data.hasOwnProperty(state)) {
        const value = data[state];
        if (value > maxValue) {
          maxValue = value;
          maxState = state;
        }
      }
    }    
    return { state: maxState, value: maxValue };
  }

  public getStateWithLowestVictims(): any {
    const data = this.getValueInLastDateByState();

    let minState = '';
    let minValue = 0;
  
    for (const state in data) {
      if (data.hasOwnProperty(state)) {
        const value = data[state];
        if (value <= minValue) {
          minValue = value;
          minState = state;
        }
      }
    }
    
    return { state: minState, value: minValue };

  }

}
