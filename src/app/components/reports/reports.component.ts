import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Chart, ChartConfiguration, ChartData, ChartOptions, ChartType, ChartTypeRegistry } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IndexService } from 'src/app/services/index.service';
import { ReportsService } from 'src/app/services/reports.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  constructor(private reportsvc:ReportsService, private indexsvc:IndexService, private snackBar: MatSnackBar){}
  ngOnInit(): void {
    setTimeout(() => {
      this.load_bar1()
    }, 50);
  }
  load_bar1(){
    this.indexsvc.loading.emit(true);
    this.reportsvc.load_table1("1", "void", "sxh").subscribe({
      next:(x)=>{
        this.indexsvc.loading.emit(false);
        this.indexsvc.minmenu.emit(true);
        this.change_bar(x)
      }, error:()=>{
        this.openSnackBar("Error al obtener los datos", "Ok")
      }
    })
  }
  change_bar(data:any){
    console.log(data)
    var ctx:HTMLCanvasElement  = <HTMLCanvasElement> document.getElementById('bar1');                                                                                                                                                                                                               
    var newcan:any = ctx.getContext("2d")
    var bar_data:any = {type: 'line' ,data: {labels:[], datasets:[]},options: {responsive: true, plugins: {legend: {position: 'top'}, title:{display: true,text: 'Semana por hacienda' } },scales:{y:{type:'linear', display: true,position: 'left'}, y1: { type: 'linear',display: true,position: 'right', grid: { drawOnChartArea: false}}}}}
      for(var i = 0; i < data.length; i++){
        bar_data.data.labels.push(data[i].semana)
        var dataset:any = {label:data[i].color_codec, backgroundColor:data[i].color + "BF", borderColor: data[i].color, data:[],yAxisID: 'y',}
        dataset.data.push(data[i].delI_1)
        dataset.data.push(data[i].delI_2)
        dataset.data.push(data[i].delI_3)
        dataset.data.push(data[i].delI_4)
        dataset.data.push(data[i].delI_5)
        dataset.data.push(data[i].delI_6)
        dataset.data.push(data[i].delI_7)
        dataset.data.push(data[i].delI_8)
        dataset.data.push(data[i].delI_9)
        dataset.data.push(data[i].delI_10)
        bar_data.data.datasets.push(dataset)
        if((i + 1) == data.length){
          console.log(bar_data)
          var myChart = new Chart(newcan, bar_data);
         }
    }
  }


    openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
//   load_hac(){
//     this.reportsvc.getMaster('deli','master',  "ASC").subscribe({
//       next:(HACIE)=>{  
//         console.log(HACIE)
//       }, error:()=>{
//         this.openSnackBar("Error al obtener los datos", "Ok")
//       }
//     })
//   }
//   change_data(){
//     this.pieChartData.labels = []
//     this.pieChartData.datasets[0].data = []

//   }
//   loadlotes(master:string, index:number){
//     this.reportsvc.getMaster2(master).subscribe({
//       next:(LOTES)=>{
//         this.ArrHaciendas[index].lotes = LOTES
//       }, error:()=>{
//         this.openSnackBar("Error al obtener los datos", "Ok")
//       }
//     })
//   }
//   change_bar(data:any){
//     console.log(data)
//     this.barChartLabels = []
//     this.barChartData[0].backgroundColor = []
//     for(let i = 0;i < data.length;i++){
//       this.barChartLabels.push(data[i].semana)
//       this.barChartData[0].backgroundColor.push(data[i].color)
//       if((i + 1) == data.length){this.shwo_bar = true}
//     }
//   }


//   @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

//   public pieChartOptions: ChartConfiguration['options'] = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//       }
//     }
//   };
//   public pieChartData: ChartData<'pie', number[], string | string[]> = {
//     labels: [],
//     datasets: [ { data: [ ] } ]
//   };
//   public pieChartType: ChartType = 'pie';

//   barChartOptions: ChartOptions = {
//     responsive: true,
//   };
//   public barChartLabels: any[] = [];
//   public barChartType: ChartType = 'bar';
//   public barChartLegend = true;
//   public barChartPlugins = [];

//   public barChartData: any[] = [ { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits',  backgroundColor: [] }];
//   public barChartColors: any[] = [
//     { backgroundColor: 'red' },
//     { backgroundColor: 'green' },
//   ]

// change(){
//   
// }
}