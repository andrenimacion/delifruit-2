import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IndexService } from 'src/app/services/index.service';
import { ReportsService } from 'src/app/services/reports.service';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  loading = false
  arr:any = []
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  constructor(private reportsvc:ReportsService, private indexsvc:IndexService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading_pie1()
    }, 100);
  }

  loading_pie1(){
    var div = <HTMLDivElement> document.getElementById("cont1")
    div.style.height = div.clientWidth + "px"
    this.indexsvc.loading.emit(true);
    this.reportsvc.getMaster('deli').subscribe({
      next:(x:any)=>{  
        this.arr = x
        this.indexsvc.minmenu.emit(true);
        this.indexsvc.loading.emit(false);
        console.log(x)
        var root = am5.Root.new("chartdiv");
        var chart = root.container.children.push( 
          am5percent.PieChart.new(root, {
            layout: root.verticalLayout
          }) 
        );
        var series = chart.series.push(
          am5percent.PieSeries.new(root, {
            name: "Series",
            valueField: "cant_codigo",
            categoryField: "hacienda"
          })
        );
        series.data.setAll(x);
        var legend = chart.children.push(am5.Legend.new(root, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          layout: root.horizontalLayout
        }));

      legend.data.setAll(series.dataItems);
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
