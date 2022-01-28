import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  vtexttitlte = "hiddenti"
  menus = [ 
      { 
        icon: "local_shipping",
        title: "Presupuesto de embalaje", 
        visible: false, 
        select:false},
      { icon: "content_cut",
        title: "Digitalizador orden de corte",
        visible: false},
      { icon: "precision_manufacturing",
        title: "Transporte de caja",
        visible: false},
      { icon: "bus_alert",
        title: "Control de contenedores",
        visible: false},
      { 
        icon: "summarize", 
        title: "Reporte", 
        visible: false
      },
      { 
        icon: "pageview",
        title: "Auditoria",
        visible: false
      },
      { 
        icon: "manage_accounts",
        title: "Usuario",
        visible: false},
      { 
        icon: "logout",
        title: "Cerrar sessión",
        visible: true
      },
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

  constructor(private indexsvc:IndexService,public dialog: MatDialog, private route:ActivatedRoute) { }

  ngOnInit(): void {

    var path = this.route.snapshot.routeConfig?.path
    if(path == null || path == ""){path = "local_shipping"}
    
    this.menus.find((x)=>x.icon == path)!.select = true

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
      var div = <HTMLDivElement> document.getElementById(this.antid);  div.style.height = "40px"
    }
    if(id != "logout"){
      this.antid = id
      var div = <HTMLDivElement> document.getElementById(this.antid)
     if(this.dbclick){
        div.style.height = "40px"
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
        div.style.height = "80px"
     }
    }else{
      this.logaut()
    }
  }
  changesettings(id:string){
    if(id == "local_shipping"){
      this.crudbox()
    }
  }
  minmenu(state:boolean){
    this.statemenu = state
    for(let i = 0; i < this.menus.length; i++){
      var div = <HTMLDivElement> document.getElementById(this.menus[i].icon + "icon")
      var icon = <HTMLDivElement> document.getElementById(this.menus[i].icon + "mast")
      if( this.statemenu && icon != null){
        div.style.animation = "animationicon .2s ."+i+"s ease-in both"
        icon.style.animation = "animationicon .2s ."+i+1+"s ease-in both"
      } else if(icon != null){
        div.style.animation = "animationiconex .2s ."+i+"s ease-in both"
        icon.style.animation = "animationiconex .2s ."+i+1+"s ease-in both"
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
}
