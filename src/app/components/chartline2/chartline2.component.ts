import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IndexService } from 'src/app/services/index.service';
import { ReportsService } from 'src/app/services/reports.service';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chartline2',
  templateUrl: './chartline2.component.html',
  styleUrls: ['./chartline2.component.css']
})
export class Chartline2Component implements OnInit {

  mdiv = "<div id='chartdiv' style='width: 100%;height: 100%;min-height: 100%;transform: scale(0.9);'></div>"
  deli_in_use = ""
  value_deli = ""
  deli_list:any = []
  arr:any = []
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  constructor(private reportsvc:ReportsService, private indexsvc:IndexService, private snackBar: MatSnackBar){}


  ngOnInit(): void {
    this.load_hacienda()
  }
  load_hacienda(){
    this.reportsvc.getMaster('deli').subscribe({
      next:(e:any)=>{
        for(let i = 0; i < e.length; i++){
          var name = e[i].hacienda.replace("_", " ")
          this.deli_list.push({name: name, value:e[i].hacienda})
        }
        this.deli_in_use = e[0].hacienda
        this.value_deli = e[0].hacienda.replace("_", " ")
        this.loading_bar2()
      },error:()=>{
        this.openSnackBar("Error al obtener los datos", "Ok")
      }
    })
  }
  check_number(){
    for(let i = 0; i < this.arr.length; i++){
      if(this.arr[i].saldo < 0){
        var div = <HTMLDivElement> document.getElementById(this.arr[i].lote)
        div.style.background = "rgba(163, 10, 10, 0.3)"
      }
    }
  }
  change(){
    var div = <HTMLDivElement> document.getElementById("mlista")
    div.style.height = "105px"
  }
  click(value:string){
    var div = <HTMLDivElement> document.getElementById("mlista")
    div.style.height = "0px"
    this.deli_in_use = value
    this.value_deli = value.replace("_", " ")
    this.loading_bar2()
  }
  noslect(){
    var div = <HTMLDivElement> document.getElementById("mlista")
    div.style.height = "0px"
  }
  @HostListener("scroll", ['$event'])
  doSomethingOnScroll($event:any){
    let scrollOffset = $event.srcElement.scrollTop;
    console.log("scroll: ", scrollOffset);
    var div = <HTMLDivElement> document.getElementById("total_newtab")
    div.scrollTop = scrollOffset
  }
  loading_bar2(){
    var element = <HTMLDivElement> document.getElementById("id_canvas")
    element.innerHTML = this.mdiv
    this.indexsvc.loading.emit(true);
    console.log(this.deli_in_use)
    this.reportsvc.load_table1("3", "void", this.deli_in_use).subscribe({
      next:(x:any)=>{
        this.arr = x
        console.log(x)
        setTimeout(() => {
          this.check_number()
        }, 100);
        this.indexsvc.loading.emit(false);
        this.indexsvc.minmenu.emit(true);
        setTimeout(() => {
          let root = am5.Root.new("chartdiv");
          root.setThemes([am5themes_Animated.new(root)]);
      
         let chart = root.container.children.push(am5xy.XYChart.new(root, {
           panX: false,
           panY: false,
           wheelX: "panX",
           wheelY: "zoomX",
           layout: root.verticalLayout
         }));
     
   
         let legend = chart.children.push(
           am5.Legend.new(root, {
             centerX: am5.p50,
             x: am5.p50
           })
         );
     
   
         let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
           categoryField: "lote",
           renderer: am5xy.AxisRendererX.new(root, {
             cellStartLocation: 0.1,
             cellEndLocation: 0.9
           }),
           tooltip: am5.Tooltip.new(root, {})
         }));
     
         xAxis.data.setAll(x);
         
         let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
           renderer: am5xy.AxisRendererY.new(root, {})
         }));
     
         function makeSeries(name:any, fieldName:any) {
           let series = chart.series.push(am5xy.ColumnSeries.new(root, {
             name: name,
             xAxis: xAxis,
             yAxis: yAxis,
             valueYField: fieldName,
             categoryXField: "lote"
           }));
         
           series.columns.template.setAll({
             tooltipText: "{name}, {categoryX}:{valueY}",
             width: am5.percent(90),
             tooltipY: 0
           });
         
           series.data.setAll(x);
           series.appear();
         
           series.bullets.push(function () {
             return am5.Bullet.new(root, {
               locationY: 0,
               sprite: am5.Label.new(root, {
                 text: "{valueY}",
                 fill: root.interfaceColors.get("alternativeText"),
                 centerY: 0,
                 centerX: am5.p50,
                 populateText: true
               })
             });
           });
         
           legend.data.push(series);
     }
     
         makeSeries("Semana 1", "01");
         makeSeries("Semana 2", "02");
         makeSeries("Semana 3", "03");
         makeSeries("Semana 4", "04");
         makeSeries("Semana 5", "05");
         makeSeries("Semana 6", "06");
         makeSeries("Semana 7", "07");
         makeSeries("Semana 8", "08");
         makeSeries("Semana 9", "09");
         makeSeries("Semana 10", "10");
         makeSeries("Semana 11", "11");
         makeSeries("Semana 12", "12");
        }, 100);

      },error:()=>{
        this.indexsvc.loading.emit(false);
        this.openSnackBar("Error al obtener los datos", "Ok")
      }})
    }
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
}
