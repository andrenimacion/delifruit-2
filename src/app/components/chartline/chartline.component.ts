import { Component, HostListener, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IndexService } from 'src/app/services/index.service';
import { ReportsService } from 'src/app/services/reports.service';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

@Component({
  selector: 'app-chartline',
  templateUrl: './chartline.component.html',
  styleUrls: ['./chartline.component.css']
})
export class ChartlineComponent implements OnInit {

  title = "Semana por hacienda"
  state = "sxh"
  arr:any = []
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  constructor(private reportsvc:ReportsService, private indexsvc:IndexService, private snackBar: MatSnackBar){}


  ngOnInit(): void {
    setTimeout(() => {
      this.loading_bar1()
    }, 100);
  }
  change(){
    if(this.state == 'sxh'){
      this.state = "hxs"
      this.title = "Hacienda por semana"
      this.loading_bar2()
    }else{
      this.state = "sxh"
      this.title = "Semana por hacienda"
      this.loading_bar1()
    }
  }
  @HostListener("scroll", ['$event'])
  doSomethingOnScroll($event:any){
    let scrollOffset = $event.srcElement.scrollTop;
    console.log("scroll: ", scrollOffset);
    var div = <HTMLDivElement> document.getElementById("total_newtab")
    div.scrollTop = scrollOffset
  }
  loading_bar2(){
    this.indexsvc.loading.emit(true);
    this.reportsvc.load_table1("1", "void", this.state).subscribe({
      next:(x:any)=>{
        this.indexsvc.minmenu.emit(true);
        this.indexsvc.loading.emit(false);
        console.log(x)
        let root = am5.Root.new("chartdiv2");
        this.arr = x
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
        
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX"
        }));
        
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
          behavior: "none"
        }));
        cursor.lineY.set("visible", false);
      
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "hacienda",
          startLocation: 0.5,
          endLocation: 0.5,
          renderer: am5xy.AxisRendererX.new(root, {}),
          tooltip: am5.Tooltip.new(root, {})
        }));
        
        xAxis.data.setAll(x);
        
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        }));
        
        function createSeries(name:any, field:any) {
          let series = chart.series.push(am5xy.LineSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            stacked:true,
            valueYField: field,
            categoryXField: "hacienda",
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: "horizontal",
              labelText: "[bold]{name}[/]\n{categoryX}: {valueY}"
            })
          }));
        
          series.fills.template.setAll({
            fillOpacity: 0.5,
            visible: true
          });
        
          series.data.setAll(x);
          series.appear(1000);
        }
        
        createSeries("Semana 1", "01");
        createSeries("Semana 2", "02");
        createSeries("Semana 3", "03");
        createSeries("Semana 4", "04");
        createSeries("Semana 5", "05");
        createSeries("Semana 6", "06");
        createSeries("Semana 7", "07");
        createSeries("Semana 8", "08");
        createSeries("Semana 9", "09");
        createSeries("Semana 10", "10");
        createSeries("Semana 11", "11");
        createSeries("Semana 12", "12");
        createSeries("Semana 13", "13");
        createSeries("Semana 14", "14");
        createSeries("Semana 15", "15");
        createSeries("Semana 16", "16");
        createSeries("Semana 17", "17");
        createSeries("Semana 18", "18");
        createSeries("Semana 19", "19");
        createSeries("Semana 20", "20");
        createSeries("Semana 21", "21");
        createSeries("Semana 22", "22");
        createSeries("Semana 23", "23");
        createSeries("Semana 24", "24");
        createSeries("Semana 25", "25");
        createSeries("Semana 26", "26");
        createSeries("Semana 27", "27");
        createSeries("Semana 28", "28");
        createSeries("Semana 29", "29");
        createSeries("Semana 30", "30");
        
        chart.set("scrollbarX", am5.Scrollbar.new(root, {
          orientation: "horizontal"
        }));
        
        chart.appear(1000, 100);
        
      }, error:()=>{
        this.indexsvc.loading.emit(false);
        this.openSnackBar("Error al obtener los datos", "Ok")
      }
    })
  }

  loading_bar1(){
    this.indexsvc.loading.emit(true);
    this.reportsvc.load_table1("1", "void", this.state).subscribe({
      next:(x:any)=>{
        this.indexsvc.minmenu.emit(true);
        this.indexsvc.loading.emit(false);
        console.log(x)
        let root = am5.Root.new("chartdiv");
        this.arr = x
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
        
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX"
        }));
        
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
          behavior: "none"
        }));
        cursor.lineY.set("visible", false);
      
        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
          categoryField: "semana",
          startLocation: 0.5,
          endLocation: 0.5,
          renderer: am5xy.AxisRendererX.new(root, {}),
          tooltip: am5.Tooltip.new(root, {})
        }));
        
        xAxis.data.setAll(x);
        
        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        }));
        
        function createSeries(name:any, field:any) {
          let series = chart.series.push(am5xy.LineSeries.new(root, {
            name: name,
            xAxis: xAxis,
            yAxis: yAxis,
            stacked:true,
            valueYField: field,
            categoryXField: "semana",
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: "horizontal",
              labelText: "[bold]{name}[/]\n{categoryX}: {valueY}"
            })
          }));
        
          series.fills.template.setAll({
            fillOpacity: 0.5,
            visible: true
          });
        
          series.data.setAll(x);
          series.appear(1000);
        }
        
        createSeries("Delifruit 1", "delI_1");
        createSeries("Delifruit 2", "delI_2");
        createSeries("Delifruit 3", "delI_3");
        createSeries("Delifruit 4", "delI_4");
        createSeries("Delifruit 5", "del5_5");
        createSeries("Delifruit 6", "delI_6");
        createSeries("Delifruit 7", "delI_7");
        createSeries("Delifruit 8", "delI_8");
        
        chart.set("scrollbarX", am5.Scrollbar.new(root, {
          orientation: "horizontal"
        }));

        let rangeDataItem = xAxis.makeDataItem({
          category: "2001",
          endCategory: "2003"
        });
        
        let range = xAxis.createAxisRange(rangeDataItem);
        
        rangeDataItem.get("grid")?.setAll({
          stroke: am5.color(0x00ff33),
          strokeOpacity: 0.5,
          strokeDasharray: [3]
        });
        
        rangeDataItem.get("axisFill")?.setAll({
          fill: am5.color(0x00ff33),
          fillOpacity: 0.1
        });
      
        
        let rangeDataItem2 = xAxis.makeDataItem({
          category: "2007"
        });
        
        let range2 = xAxis.createAxisRange(rangeDataItem2);
        
        rangeDataItem2.get("grid")?.setAll({
          stroke: am5.color(0x00ff33),
          strokeOpacity: 1,
          strokeDasharray: [3]
        });
        
        chart.appear(1000, 100);
        
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