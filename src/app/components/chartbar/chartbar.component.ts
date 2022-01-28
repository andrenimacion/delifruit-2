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
  selector: 'app-chartbar',
  templateUrl: './chartbar.component.html',
  styleUrls: ['./chartbar.component.css']
})
export class ChartbarComponent implements OnInit {

  mdiv = "<div id='chartdiv' style='width: 100%;height: 100%;min-height: 100%;transform: scale(0.9);'></div>"
  title = "Recusado"
  state = "rec"
  arr:any = []
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  constructor(private reportsvc:ReportsService, private indexsvc:IndexService, private snackBar: MatSnackBar){}


  ngOnInit(): void {
        setTimeout(() => {
          this.load_bar2()
        }, 100);
  }
  change(){
    if(this.state == 'rec'){
      this.state = "cai"
      this.title = "Caidos"
      this.load_bar2()
    }else{
      this.state = "rec"
      this.title = "Recusado"
      this.load_bar2()
    }
  }
  load_bar2(){
    var element = <HTMLDivElement> document.getElementById("id_canvas")
    element.innerHTML = this.mdiv
    this.indexsvc.loading.emit(true);
    this.reportsvc.load_table1("2", "2022", this.state).subscribe({
      next:(x:any)=>{
        setTimeout(() => {
          console.log(x)
          this.arr = x
          this.indexsvc.minmenu.emit(true);
          this.indexsvc.loading.emit(false);
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
          categoryField: "sema",
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
            categoryXField: "sema"
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
    
        makeSeries("Delifruit 1", "delI_1");
        makeSeries("Delifruit 2", "delI_2");
        makeSeries("Delifruit 3", "delI_3");
        makeSeries("Delifruit 4", "delI_4");
        makeSeries("Delifruit 5", "del5_5");
        makeSeries("Delifruit 6", "delI_6");
        makeSeries("Delifruit 7", "delI_7");
        makeSeries("Delifruit 8", "delI_8");
        }, 100);
  }, error:()=>{
        this.indexsvc.loading.emit(false);
        this.openSnackBar("Error al obtener los datos", "Ok")
      }
    })
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
