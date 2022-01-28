import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Chart, ChartConfiguration, ChartData, ChartOptions, ChartType, ChartTypeRegistry } from 'chart.js';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { IndexService } from 'src/app/services/index.service';
import { ReportsService } from 'src/app/services/reports.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  arr:any = []
  state_doc = "sxh"
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  constructor(private reportsvc:ReportsService, private indexsvc:IndexService, private snackBar: MatSnackBar){}
  ngOnInit(): void {
    setTimeout(() => {
      this.load_deli()
      this.chang_newbare()
    }, 50);
  }
  change_state_do(){
    if(this.state_doc == "sxh"){this.state_doc = "hxs"}else{this.state_doc = "sxh"}
    this.load_bar1(this.state_doc)
  }
  load_deli(){
    this.indexsvc.loading.emit(true);
    this.reportsvc.getMaster('deli').subscribe({
      next:(HACIE:any)=>{  
        this.change_pipe1(HACIE)
      }, error:()=>{
        this.openSnackBar("Error al obtener los datos", "Ok")
      }
    })
  }
  change_pipe1(data:any){
    var mdata:any = { labels: [],datasets: [{label: 'Dataset 1', data: []}]};
    var ctx:HTMLCanvasElement  = <HTMLCanvasElement> document.getElementById('bar2');                                                                                                                                                                                                               
    var newcan:any = ctx.getContext("2d")
    this.arr = []
    for(var i = 0; i < data.length; i++){
      this.arr.push(data[i].hacienda)
      mdata.labels.push(data[i].hacienda)
      mdata.datasets[0].data.push(data[i].cant_codigo)
      if((i + 1) == data.length){
        this.load_bar1(this.state_doc)
        var config:any = { type: 'pie', data: mdata, options: {
          plugins: {
            tooltip: {
              callbacks: {
                title: (tooltipItems:any) => {
                  var title = tooltipItems[0].parsed.y
                  if (title !== null) {
                    title = "Cantidad de lotes"
                  }
                  return title
                },
              },
            },
          }
        }};
        var myChart = new Chart(newcan, config);
       }
    }
  }
  load_bar1(data:string){
    this.indexsvc.loading.emit(true);
    this.reportsvc.load_table1("1", "void", data).subscribe({
      next:(x)=>{
        console.log(x)
        this.indexsvc.loading.emit(false);
        this.indexsvc.minmenu.emit(true);
        if(this.state_doc == "sxh"){this.change_bar(x)}else{this.change_bar1(x)}
      }, error:()=>{
        this.openSnackBar("Error al obtener los datos", "Ok")
      }
    })
  }
  change_bar1(data:any){
    var ctx:HTMLCanvasElement  = <HTMLCanvasElement> document.getElementById('bar3');                                                                                                                                                                                                               
    var newcan:any = ctx.getContext("2d")
    var bar_data:any = {type: 'line' ,data: {labels:["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42"], datasets:[]},options: {responsive: true, plugins: {legend: {position: 'top'} },scales:{y:{type:'linear', display: true,position: 'left'}, y1: { type: 'linear',display: true,position: 'right', grid: { drawOnChartArea: false}}}}}
    for(var i = 0; i < data.length; i++){
      var dataset:any = {label: this.arr[i], data:[],yAxisID: 'y',}
      dataset.data.push(data[i]["01"])
      dataset.data.push(data[i]["02"])
      dataset.data.push(data[i]["02"])
      dataset.data.push(data[i]["04"])
      dataset.data.push(data[i]["05"])
      dataset.data.push(data[i]["06"])
      dataset.data.push(data[i]["07"])
      dataset.data.push(data[i]["08"])
      dataset.data.push(data[i]["09"])
      dataset.data.push(data[i]["10"])
      dataset.data.push(data[i]["11"])
      dataset.data.push(data[i]["12"])
      dataset.data.push(data[i]["13"])
      dataset.data.push(data[i]["14"])
      dataset.data.push(data[i]["15"])
      dataset.data.push(data[i]["16"])
      dataset.data.push(data[i]["17"])
      dataset.data.push(data[i]["18"])
      dataset.data.push(data[i]["19"])
      dataset.data.push(data[i]["20"])
      dataset.data.push(data[i]["21"])
      dataset.data.push(data[i]["22"])
      dataset.data.push(data[i]["23"])
      dataset.data.push(data[i]["24"])
      dataset.data.push(data[i]["25"])
      dataset.data.push(data[i]["26"])
      dataset.data.push(data[i]["27"])
      dataset.data.push(data[i]["28"])
      dataset.data.push(data[i]["29"])
      dataset.data.push(data[i]["30"])
      bar_data.data.datasets.push(dataset)
      console.log(bar_data)
      if((i + 1) == data.length){
        var myChart = new Chart(newcan, bar_data);
       }
    }
}
chang_newbare(){
  var root = am5.Root.new("chartdiv"); 
  
  var chart = root.container.children.push( 
    am5xy.XYChart.new(root, {
      panY: false,
      wheelY: "zoomX",
      layout: root.verticalLayout
    }) 
  );
  
  // Define data
  var data = [{ 
    category: "Research", 
    value1: 1000, 
    value2: 588 
  }, { 
    category: "Marketing", 
    value1: 1200, 
    value2: 1800 
  }, { 
    category: "Sales", 
    value1: 850, 
    value2: 1230 
  }];
  
  // Craete Y-axis
  let yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
      })
    })
  );
  
  // Create X-Axis
  var xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.2,
        renderer: am5xy.AxisRendererX.new(root, {
      }),
      categoryField: "category"
    })
  );
  xAxis.data.setAll(data);
  
  // Create series
  var series1 = chart.series.push( 
    am5xy.ColumnSeries.new(root, { 
      name: "Series", 
      xAxis: xAxis, 
      yAxis: yAxis, 
      valueYField: "value1", 
      categoryXField: "category",
      tooltip: am5.Tooltip.new(root, {})
    }) 
  );
  series1.data.setAll(data);
  
  var series2 = chart.series.push( 
    am5xy.ColumnSeries.new(root, { 
      name: "Series", 
      xAxis: xAxis, 
      yAxis: yAxis, 
      valueYField: "value2", 
      categoryXField: "category" 
    }) 
  );
  series2.data.setAll(data);
  
  // Add legend
  var legend = chart.children.push(am5.Legend.new(root, {})); 
  legend.data.setAll(chart.series.values);
}
  change_bar(data:any){
    var ctx:HTMLCanvasElement  = <HTMLCanvasElement> document.getElementById('bar1');                                                                                                                                                                                                               
    var newcan:any = ctx.getContext("2d")
    var bar_data:any = {type: 'line' ,data: {labels:this.arr, datasets:[]},options: {responsive: true, plugins: {legend: {position: 'top'} },scales:{y:{type:'linear', display: true,position: 'left'}, y1: { type: 'linear',display: true,position: 'right', grid: { drawOnChartArea: false}}}}}
      for(var i = 0; i < data.length; i++){
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
        console.log(bar_data)
        if((i + 1) == data.length){
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