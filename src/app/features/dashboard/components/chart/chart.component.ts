import { Component, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MessageService } from 'primeng/api';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {

  public data: any[] = [];
  public stateWithHighestVictimsValue: { state: string; value: number} = { state: '', value: 0 };
  public stateWithLowestVictimsValue: { state: string; value: number} = { state: '', value: 0 };
  public stateWithHighestPercentageOfVictimsValue: { state: string; value: number} = { state: '', value: 0 }; 


  public pieChartData: ChartConfiguration<'pie'>['data'] ={
    datasets: [{
      data: [],
      label: ''
    }],
    labels: []
  };
  public pieChartLabels: string[] = [];
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };



  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private router: Router
  ) {
    if(!localStorage.getItem('file')){    
      this.router.navigate(['/dashboard']);
    }
  }

  @ViewChild(BaseChartDirective) chartPie: BaseChartDirective | undefined;

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.data = response[0];
          this.percentageOfVictimsByState();
          this.stateWithHighestVictimsValue = this.dataService.getStateWithHighestVictims(this.data);
          this.stateWithLowestVictimsValue = this.dataService.getStateWithLowestVictims(this.data);
          this.stateWithHighestPercentageOfVictimsValue = this.dataService.getStateWithHighestPercentageOfVictims(this.data);
        }
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      }
    );
  }

  private genereateRandomColor(): string {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`;
    return randomColor;
  }

  public stateWithHighestVictims(): void {
    if (!this.data || this.data.length === 0) return;

    const { state, value } = this.dataService.getStateWithHighestVictims(
      this.data
    );
    console.log(state, value);
  }

  public stateWithLowestVictims(): void {
    if (!this.data || this.data.length === 0) return;

    const { state, value } = this.dataService.getStateWithLowestVictims(
      this.data
    );
    console.log(state, value);
  }

  public stateWithHighestPercentageOfVictims(): void {
    if (!this.data || this.data.length === 0) return;

    const { state, value } =
      this.dataService.getStateWithHighestPercentageOfVictims(this.data);
    console.log(state, value);
  }

  public percentageOfVictimsByState(): void {
    if (!this.data || this.data.length === 0) return;

    const data = this.dataService.getPorcentsVictimsVsPopulation(this.data);
    
    
    if(!data) return;

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        let element = data[key];
        element = parseFloat(element);
        this.pieChartData.datasets.push( {data: [element], label: key, backgroundColor: this.genereateRandomColor()});
        this.pieChartLabels.push(key);
        
      }
    }
    this.chartPie?.update();

    console.log(this.pieChartLabels);
    


  }


}
