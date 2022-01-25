import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IndexService } from 'src/app/services/index.service';
import { PackingBudgetService } from 'src/app/services/packing-budget.service';
import { boxandmarkanit } from '../animations';

@Component({
  selector: 'app-boxandmark',
  templateUrl: './boxandmark.component.html',
  styleUrls: ['./boxandmark.component.css'],
  animations: [ boxandmarkanit ]
})
export class BoxandmarkComponent implements OnInit {

  myplaceholder = ""
  titlein = ""
  mtitle = ""
  vtextmenu = "textcolorina"
  vtextmenu2 = "textcolorina"
  statebtn = false
  vsvganit1 = "none"
  vbpath1 = "none"
  vbpath2 = "none"
  vbpath3 = "none"
  vsvganit2 = "none"
  vmpath1 = "none"
  vmpath2 = "none"
  loading = false
  displayedColumns: string[] = ['codigo', 'nombre'];
  arrbox:any = []
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  namebox = new FormControl('', [Validators.required, Validators.minLength(3)]);
  constructor( public dialogRef: MatDialogRef<BoxandmarkComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private packing:PackingBudgetService, private indexsvc:IndexService, private snackBar: MatSnackBar) {} 
  ngOnInit(): void {
    this.changestate()
  } 
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
  get svganit1(){ return this.vsvganit1}
  get bpath1(){ return this.vbpath1}
  get bpath2(){ return this.vbpath2}
  get bpath3(){ return this.vbpath3}
  get textmenu(){ return this.vtextmenu}

  get svganit2(){ return this.vsvganit2}
  get mpath1(){ return this.vmpath1}
  get mpath2(){ return this.vmpath2}
  get textmenu2(){ return this.vtextmenu2}

  

  changestate(){
    if(!this.statebtn){
      this.myplaceholder = "Caja 1"
      this.titlein = "Nombre de la caja"
      this.mtitle = "Tipo de cajas"
      this.loadboxs()
      this.statebtn = true
      this.vsvganit1 = "actived0"
      this.vbpath1 = "hiddenlines"
      this.vbpath2 = "hiddenlines"
      this.vbpath3 = "hiddenlines"

      this.vsvganit2 = "inactive"
      this.vmpath1 = "reiconcolor"
      this.vmpath2 = "reiconcolor"
      setTimeout(() => {
        this.vsvganit1 = "actived"
        this.vtextmenu = "textcoloract"
        this.vtextmenu2 = "textcolorina"
        this.vbpath1 = "iconcolor"
        this.vbpath2 = "iconcolor"
        this.vbpath3 = "iconcolor"

        this.vsvganit2 = "textcolorina"
        this.vmpath1 = "rehiddenlines"
        this.vmpath2 = "rehiddenlines"
        setTimeout(() => {
          this.vsvganit1 = "actived1"
        }, 200);
      }, 400);
    }else{
      this.myplaceholder = "Marca 1"
      this.titlein = "Nombre de la marca"
      this.mtitle = "Marcas"
      this.loadmarks()
      this.vsvganit1 = "inactive"
      this.vbpath1 = "reiconcolor"
      this.vbpath2 = "reiconcolor"
      this.vbpath3 = "reiconcolor"

      this.vsvganit2 = "actived0"
      this.vmpath1 = "hiddenlines"
      this.vmpath2 = "hiddenlines"
      setTimeout(() => {
        this.vtextmenu = "textcolorina"
        this.vtextmenu2 = "textcoloract"
        this.vbpath1 = "rehiddenlines"
        this.vbpath2 = "rehiddenlines"
        this.vbpath3 = "rehiddenlines"

        this.vsvganit2 = "actived"
        this.vmpath1 = "iconcolor"
        this.vmpath2 = "iconcolor"
        setTimeout(() => {
          this.vsvganit2 = "actived1"
        }, 200);
      }, 400);
      this.statebtn = false
    }
  }
  closed(): void {
    this.dialogRef.close();
  }
  loadboxs(){
    this.loading = true
    this.packing.loadbox("c0", "master").subscribe((x)=>{
      this.arrbox = x
      this.loading = false
    })
  }
  loadmarks(){
    this.loading = true
    this.packing.loadbox("009", "master").subscribe((x)=>{
      this.arrbox = x
      this.loading = false
    })
  }
  delete(code:number){
    this.loading = true
    var master = ""
    if(this.statebtn){master = "c0"}else{master = "009"}
    this.packing.deletebox(code, master).subscribe({
      next: (x)=>{
        if(this.statebtn){this.loadboxs()}else{this.loadmarks()}
        this.openSnackBar("Eliminado con exito", "Ok")
      }, error: ()=>{
        this.loading = false
        this.openSnackBar("Error al eliminar", "Ok")
      }
    })
  }
  savebox(){
    if(this.namebox.valid){
      this.loading = true
      var cant = this.arrbox.length + 1
      var name:string = this.namebox.value
      this.namebox.setValue("")
      var temporalname1 = name.slice(0,1).toUpperCase()
      var temporalname2 = name.slice(1).toLocaleLowerCase()
      var code = cant.toString().padStart(3, "0")
      var master = ""
      var codebox = ""
      if(this.statebtn){master = "c0"; codebox = "C_"}else{master = "009";codebox = ""}
      var x = {master: master, codigo: codebox+code, nombre: temporalname1+temporalname2, gestion: "", nomtag:""}
      this.packing.savebox(x).subscribe({
        next: (x)=>{
          if(this.statebtn){this.loadboxs()}else{this.loadmarks()}
          this.openSnackBar("Guardado con exito", "Ok")
        }, error: ()=>{
          this.loading = false
          this.openSnackBar("Error al guardar", "Ok")
        }
      })
    } 
  }
}
