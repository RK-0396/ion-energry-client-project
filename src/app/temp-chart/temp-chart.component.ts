import { Component, OnInit,Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import axios from 'axios';
import * as moment from 'moment';
@Component({
  selector: 'app-temp-chart',
  templateUrl: './temp-chart.component.html',
  styleUrls: ['./temp-chart.component.css']
})
export class TempChartComponent implements OnInit {
  chartTitle: string = "";
  enableChart: boolean = false;
  BASE_URL='http://localhost:3000';
  constructor() { }
  @Input() linechartData:any;
  listOfTs : []=[];
  tempDtataVal:[]=[];
  lineChartData: ChartDataSets[] = [];
  lineChartLabels: Label[] = [];
  ngOnInit(): void {
    console.log(this.linechartData)
     this.initializeData();
  }

  // async fetchData() {

  //   this.chartTitle = linechartData.;
    
  //   this.listOfTs = results.data.measurements.map((tempDtata:any) => { return  new Date(tempDtata.ts).toDateString()})

  //   this.tempDtataVal = results.data.measurements.map((tempDtata:any) => {return tempDtata.val})
  //   this.initializeData();
  // }

initializeData(){
  this.lineChartData = [
    { data: this.linechartData.tempDtataVal as [], label: this.linechartData.chartTitle },
  ];
  this.lineChartLabels = this.linechartData.listOfTs as [];
  this.enableChart = true;
  }
  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(100,0,0,50)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

}
