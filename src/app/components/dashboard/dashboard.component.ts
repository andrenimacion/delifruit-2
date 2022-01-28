import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IndexService } from 'src/app/services/index.service';
import { dashanit } from '../animations';
import { BoxandmarkComponent } from '../boxandmark/boxandmark.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [ dashanit ]
})
export class DashboardComponent implements OnInit {

  path:any = ""
  iconmaestro = "settings"
  textmaestro = "Mestro"
  vtexttitlte = "hiddenti"
  menus = [ 
      {icon: "local_shipping", title: "Presupuesto de embalaje", visible: false, select:false},
      {icon: "content_cut", title: "Digitalizador orden de corte", visible: false},
      {icon: "precision_manufacturing", title: "Transporte de caja", visible: false},
      {icon: "bus_alert", title: "Control de contenedores", visible: false},
      {icon: "summarize", title: "Reporte", visible: false},
      {icon: "pageview", title: "Auditoria", visible: false},
      {icon: "manage_accounts", title: "Usuario", visible: false},
      {icon: "logout", title: "Cerrar sessión", visible: true},
  ]
  antid = ""
  dbclick = true
  exit = false
  nameuser = "Lorena" 
  saludo = ""
  varshowmenu = false
  statemenu = false
  f = new Date();
  date = this.f.toLocaleString();  
  hora = this.f.getHours()
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  constructor(private indexsvc:IndexService,public dialog: MatDialog, private route:ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(navigator.onLine) {
     console.log("hay")
  } else {
    this.openSnackBar("Sin conexion a internet", "ok")

  }
    this.path = this.route.snapshot.routeConfig?.path
    if(this.path == null || this.path == ""){this.path = "local_shipping"}
    var path2 = this.path.split("/")
    this.menus.find((x)=>x.icon == path2[0])!.select = true
    setTimeout(() => {
      this.vtexttitlte = "showti"
    }, 10);
    this.indexsvc.route.emit({state:true, type: true, rute: ""})
    if(this.hora <= 12 && this.hora >= 0){
      this.saludo = "Buenos Dias"
    }else if(this.hora <= 18 && this.hora >= 13){
      this.saludo = "Buenas Tardes"
    }else if(this.hora <= 24 && this.hora >= 18){
      this.saludo = "Buenas noches"
    } 
    this.indexsvc.minmenu.subscribe((data)=>{
      this.minmenu(data)
    })
    this.nameuser = sessionStorage.getItem("User_Name") || "Identificate"
  }
  get texttitlte(){return this.vtexttitlte}
  crudbox(): void {
    const dialogRef = this.dialog.open(BoxandmarkComponent, {
      width: '400px',
      data: {name: ""},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.indexsvc.getload.emit(1);
    });
  }
  opensubmenu(id:string, select:any){
    if(this.antid != ""){
      var div = <HTMLDivElement> document.getElementById(this.antid);  div.style.height = "42px"
    }
    if(id != "logout"){
      this.antid = id
      var div = <HTMLDivElement> document.getElementById(this.antid)
     if(this.dbclick){
        div.style.height = "42px"
        this.dbclick = false
        if(select == undefined || select == false ){
         // this.vtexttitlte = "hiddenti"
          this.exit = true
          this.indexsvc.route.emit({state:false, type: false, rute: id})
        }
        setTimeout(() => {
            this.dbclick = true
        }, 500);
     }else{
      if(id == "summarize"){
        div.style.height = "220px"
        this.iconmaestro = "pie_chart"
        this.textmaestro = "Hacienda y lotes"
      }else{
        div.style.height = "88px"
        this.iconmaestro = "settings"
        this.textmaestro = "Mestro"
      }
     }
    }else{
      this.logaut()
    }
  }
  changesettings(id:string){
    if(id == "local_shipping"){
      this.crudbox()
    }else if(id == "summarize" && "summarize" != this.path){
      this.indexsvc.route.emit({state:false, type: false, rute: "/summarize"})
    }else if(id == "summarize0" && "summarize/chartline" != this.path){
      this.indexsvc.route.emit({state:false, type: false, rute: "/summarize/chartline"})
    }else if(id == "summarize1" && "summarize/chartbar" != this.path){
      this.indexsvc.route.emit({state:false, type: false, rute: "/summarize/chartbar"})
    }else if(id == "summarize2" && "summarize/chartline2" != this.path){
      this.indexsvc.route.emit({state:false, type: false, rute: "/summarize/chartline2"})
    }
  }
  minmenu(state:boolean){
    this.statemenu = state
    for(let i = 0; i < this.menus.length; i++){
      var div = <HTMLDivElement> document.getElementById(this.menus[i].icon + "icon")
      var icon = <HTMLDivElement> document.getElementById(this.menus[i].icon + "mast")
      var icon1 = <HTMLDivElement> document.getElementById(this.menus[i].icon + "mast1")
      var icon2 = <HTMLDivElement> document.getElementById(this.menus[i].icon + "mast2")
      var icon3 = <HTMLDivElement> document.getElementById(this.menus[i].icon + "mast3")
      if( this.statemenu && icon != null){
        div.style.animation = "animationicon .2s ."+i+"s ease-in both"
        icon.style.animation = "animationicon .2s ."+i+1+"s ease-in both"
        icon1.style.animation = "animationicon .2s ."+i+2+"s ease-in both"
        icon2.style.animation = "animationicon .2s ."+i+3+"s ease-in both"
        icon3.style.animation = "animationicon .2s ."+i+4+"s ease-in both"
      }else if(icon != null){
        div.style.animation = "animationiconex .2s ."+i+"s ease-in both"
        icon.style.animation = "animationiconex .2s ."+i+1+"s ease-in both"
        icon1.style.animation = "animationiconex .2s ."+i+2+"s ease-in both"
        icon2.style.animation = "animationiconex .2s ."+i+3+"s ease-in both"
        icon3.style.animation = "animationiconex .2s ."+i+4+"s ease-in both"
      }
    }
  }
  showmenu(){
    this.varshowmenu = !this.varshowmenu
  }
  updatedate(){
      setTimeout(() => {
        this.f = new Date();
        this.date = this.f.toLocaleString();   
        this.updatedate()
      }, 1000);
  }
  logaut(){
    sessionStorage.removeItem("User_Name")
    sessionStorage.removeItem("Estado")
    sessionStorage.removeItem("Code_user")
    sessionStorage.removeItem("verify_del")
    this.indexsvc.loading.emit(true);
    setTimeout(() => {
          this.vtexttitlte = "hiddenti"
          this.exit = true
          this.indexsvc.route.emit({state:false, type: false, rute: "/login"})
    }, 1000);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
