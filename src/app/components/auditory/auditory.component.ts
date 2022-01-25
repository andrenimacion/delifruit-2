import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AuditoryService } from 'src/app/services/auditory.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-auditory',
  templateUrl: './auditory.component.html',
  styleUrls: ['./auditory.component.css']
})
export class AuditoryComponent implements OnInit {

  total = 0
  itemsPerPage:any = 20
  currentPage:any = 1
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;

  loading = false
  ordericon = "expand_less"
  ordertitle = "Ascendente"
  orderstate = false
  ordervar = "DESC"

  arraylist:any = []
  selectfilter = new FormControl("date");
  filters:any = [{name:"Fecha", value:"date"},{name:"Accion", value:"accion_user"},
  {name:"Modulo", value:"module_codec"}, {name:"Ip", value:"local_net_address"},
  {name:"Codigo", value:"codec_audit"}]
  constructor(private indexsvc:IndexService,private audioriasvc:AuditoryService,  private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.load(this.value_order, "a", this.state_order, "1")
  }
  search(){
    var valuea = <HTMLInputElement> document.getElementById("search")
    if(valuea.value.length > 0){
      this.load(this.selectfilter.value, valuea.value, this.ordervar, "2")
    }else{
      this.load(this.value_order, "a", this.state_order, "1")
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
  delete(id:number){

    
  }
  order(){
    if(this.orderstate){
      this.ordericon = "expand_less"
      this.ordertitle = "Ascendente"
      this.orderstate = false
      this.ordervar = "ASC"
    }else{
      this.ordericon = "expand_more"
      this.ordertitle = "Descendente"
      this.orderstate = true
      this.ordervar = "DESC"
    }
    this.search()
  }
  load(prop:string, data:string, order:string,  state:string, ){
    setTimeout(() => {
      this.indexsvc.loading.emit(true);
      this.audioriasvc.getauditoria(prop, data, order, state).subscribe({
        next:(e)=>{
          this.indexsvc.minmenu.emit(true);
          this.indexsvc.loading.emit(false);
          this.arraylist = e
          this.total = this.arraylist.length
        },error:()=>{
          this.indexsvc.loading.emit(false);
          this.openSnackBar("Error al cargar la auditoria", "Ok")
        }
      })
    }, 80);
  }

  state_order = "DESC" // Si es ASC o DESC
  value_order = "date" // El valor por el q se va a order.. ejemp: id, color, etc
  icon_order = "expand_more" // Es el icono del estado del orden
  changeorder(value:string){
    var element = <HTMLDivElement> document.getElementById(this.value_order)// Quitamos el icono antiguo
    element.innerHTML = ""
    if(this.state_order == "ASC"){
      this.state_order = "DESC";this.icon_order = "expand_less" 
    }else{
      this.state_order = "ASC"; this.icon_order = "expand_more" 
    }
    this.value_order = value
    var element = <HTMLDivElement> document.getElementById(value) // Agregamnos el nuevo icono
    element.innerHTML = this.icon_order
    this.search()// Aqui se llama la api para volver a cargar los datos
  }
  showdate(e:any, date:string){
    if(e.path[0].value == false || e.path[0].value == undefined){
      e.path[0].innerHTML = new DatePipe('en-US').transform(date, 'shortTime')
      e.path[0].value = true
    }else{
      e.path[0].value = false
      e.path[0].innerHTML = new DatePipe('en-US').transform(date, 'shortDate')
    }
  }
}
