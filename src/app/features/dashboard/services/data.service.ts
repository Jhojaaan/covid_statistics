import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public saveData(data: any) {
    return this.httpClient.post(`${environment.apiUrl}/data`, data);
  }

  public getData() {
    return this.httpClient.get(`${environment.apiUrl}/data`);
  }

  public deleteData(){
    return this.httpClient.delete(`${environment.apiUrl}/data`);
  }

  public groupDataByState(data:any){
    const groupedData:any = {};

    if(!data || data.length === 0) return; 

    data.forEach((row:any) => {

      const state = row[6];
   
      if(!groupedData[state]){
        groupedData[state] = [];
      }

      groupedData[state].push(row);
    });

    return groupedData;

  }

  public getValueInLastDateByState(data:any):any {

    data = this.groupDataByState(data);

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
  
  public getPopulationByState(data:any): any {
    data = this.groupDataByState(data);
  
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
  
  public getStateWithHighestVictims(data:any): any {
    data = this.getValueInLastDateByState(data);

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

  public getStateWithLowestVictims(data:any): any {
    data = this.getValueInLastDateByState(data);

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

  public getPorcentsVictimsVsPopulation(data:any): any {
    const stateByPopulation = this.getPopulationByState(data);
    const victimsByState = this.getValueInLastDateByState(data);

    const porcentsVictimsVsPopulation: any = {};

    for (const state in stateByPopulation) {
      if (stateByPopulation.hasOwnProperty(state)) {
        const population = stateByPopulation[state];
        const victims = victimsByState[state];

        if(population && victims){
          const percentage = (victims / population) * 100;
          porcentsVictimsVsPopulation[state] = parseFloat(percentage.toFixed(4));
        }
      }
    }

    return porcentsVictimsVsPopulation;

  }

  public getStateWithHighestPercentageOfVictims(data:any): any {
    data = this.getPorcentsVictimsVsPopulation(data);

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


}
