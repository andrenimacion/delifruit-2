import { COMPILER_OPTIONS, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IndexService } from 'src/app/services/index.service';
import { PackingBudgetService } from 'src/app/services/packing-budget.service';
import Swal from 'sweetalert2';
import { RequiredPasswordComponent } from '../required-password/required-password.component';

@Component({
  selector: 'app-packing-budget',
  templateUrl: './packing-budget.component.html',
  styleUrls: ['./packing-budget.component.css']
})
export class PackingBudgetComponent implements OnInit {

  ordericon = "expand_less"
  ordertitle = "Ascendente"
  orderstate = false
  ordervar = "ASC"
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  idtodelet = ""
  nameuser = "Lorena"
  username = "Lorena"
  module = "Presupuesto de embalaje"
  searchvalue:any = ""
  codhacienda = ""
  namelote = ""
  formpacking = this.formBuilded.group({
    hacienda: ['', Validators.required],
    lote: ['', Validators.required],
    semana: ['', Validators.required],
    caja: ['', Validators.required],
    cantidad: ['', Validators.required],
    marca: ['', Validators.required],
    destino: ['', Validators.required],
    import: ['', Validators.required],
  });
  filters = [
    {name:'Hacienda',value:"cod_hacienda"},
    {name:'Lote',value:"cod_lote"},
    {name:'Semana',value:"semana"},
    {name:'Tipo de caja',value:"t_caja"},
    {name:'Cantidad',value:"cantidad"},
    {name:'Marca',value:"marca"},
    {name:'Destino',value:"destino"},
    {name:'Export',value:"exp_imp"}]
  displayedColumns: string[] = ['Hacienda', 'Lote', 'Semana', 'Tipo','Cantidad', 'Marca', 'Destino', 'Export', 'Codigo'];
  selectfilter = new FormControl("cod_hacienda");

  arraylist:any =[]
  haciendas:any = []
  lotes:any = []
  semanas:any = []
  arraybox:any = []
  arraymarks:any = []
  loading=false
  state = true

  constructor( private snackBar: MatSnackBar,public dialog: MatDialog,private indexsvc:IndexService, private formBuilded:FormBuilder, private packingsvc:PackingBudgetService) { }
  @ViewChild('formDirective') formDirective: any;

  ngOnInit(): void {
    setTimeout(() => {
      this.loadalldata()
      this.loadlist()
    }, 800);
    this.indexsvc.getload.subscribe((data)=>{
      if(data == 1){
        this.loadalldata()
      }
    })
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
    var valuea = <HTMLInputElement> document.getElementById("search")
    if(valuea.value.length > 0){
      this.search()
    }else{
      this.loadlist()
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
  loadlist(){ 
    this.loading = true
    this.packingsvc.load("cod_hacienda", "d", this.ordervar).subscribe({
      next: (e)=>{
        this.loading = false
        this.arraylist = e
      }, error:()=>{
        this.loading = false
        this.openSnackBar("Error al cargar el historial", "Ok")
      }
    })
  }
  search(){ 
    var valuea = <HTMLInputElement> document.getElementById("search")
    if(valuea.value.length > 0){
      this.loading = true
      this.packingsvc.load(this.selectfilter.value, valuea.value, this.ordervar).subscribe({
        next: (e)=>{
          this.loading = false
          this.arraylist = e
        }, error:()=>{
          this.loading = false
          this.openSnackBar("Error al cargar el historial", "Ok")
        }
      })
    }else{
      this.loadlist()
    }
  }
  delete(id:string){
    this.idtodelet = id
    var state = localStorage.getItem('verify_del');
    if(state == null || state == "false"){
      const dialogRef = this.dialog.open(RequiredPasswordComponent, {
        width: '300px',
        data: {name: this.nameuser, username: this.username, module: this.module},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result == true){
          this.packingsvc.delete(this.idtodelet).subscribe({
            next: (x)=>{
              this.loadlist()
              this.openSnackBar("Eliminado con exito", "Ok")
            },error:()=>{
              this.openSnackBar("Error al eliminar", "Ok")
            }})
        }
      });
    }else{
      this.packingsvc.delete(this.idtodelet).subscribe({
        next: (x)=>{
          this.loadlist()
          this.openSnackBar("Eliminado con exito", "Ok")
        },error:()=>{
          this.openSnackBar("Error al eliminar", "Ok")
        }})
    }
  }
  loadalldata(){
    this.indexsvc.loading.emit(true);
    this.packingsvc.loadestates("HCIE_GR", "b").subscribe({
      next: (x)=>{
        this.haciendas = x
        this.packingsvc.loadweeks("ASC", "2022", "anio").subscribe({
          next: (xa)=>{
            this.semanas = xa
            this.packingsvc.loadbox("c0", "master").subscribe({
              next:(xe)=>{
                this.arraybox = xe
                this.packingsvc.loadbox("009", "master").subscribe({
                  next:(d)=>{
                    this.arraymarks = d
                    this.indexsvc.loading.emit(false);
                  }, error: ()=>{
                    this.indexsvc.loading.emit(false);
                this.openSnackBar("Fallo al cargar las marcas", "Ok")
                  }})
              }, error: ()=>{
                this.indexsvc.loading.emit(false);
                this.openSnackBar("Fallo al cargar los tipos", "Ok")
              }})
          }, error:(x)=>{
            this.indexsvc.loading.emit(false);
            this.openSnackBar("Fallo al cargar las semanas", "Ok")
          } 
        })
      }, error:(x)=>{
        this.indexsvc.loading.emit(false);
        this.openSnackBar("Fallo al cargar las haciendas", "Ok")
      } 
    })
  }
  changewin(){
    this.indexsvc.minmenu.emit(this.state);
    this.state = !this.state
  }
  chanelots(data:string, code:string){
    this.codhacienda = data.replace("_", " ")
    this.packingsvc.loadlots(data, "a").subscribe((x)=>{
      this.lotes = x
    })
  }
  asignamelot(value:string){
    this.namelote = value
  }
  checklots(){
    if(this.lotes.length == 0){
      this.openSnackBar("Seleciona una hacienda", "Ok")
    }
  }
  savedata(){
    console.log(this.formpacking.valid && this.codhacienda.trim().length > 1)
    console.log(this.formpacking.value)
    if(this.formpacking.valid && this.codhacienda.trim().length > 1){
      this.indexsvc.loading.emit(true);
      var x = {
        cod_hacienda: this.codhacienda.trim(),
        cod_lote: this.formpacking.get("lote")?.value,
        name_lote: this.namelote ,
        semana: this.formpacking.get("semana")?.value,
        t_caja: this.formpacking.get("caja")?.value,
        marca: this.formpacking.get("marca")?.value,
        peso: 0,
        cantidad: this.formpacking.get("cantidad")?.value,
        tp_peso: "KG",
        destino: this.formpacking.get("destino")?.value,
        exp_imp: this.formpacking.get("import")?.value,
        codigo: ""
       } 
     this.packingsvc.save(x).subscribe({
       next:()=>{
        this.loadlist()
        this.indexsvc.loading.emit(false);
        this.openSnackBar("Guardado con exito", "Ok")
        this.formDirective.resetForm();
        this.formpacking.reset()
       },error: ()=>{
        this.indexsvc.loading.emit(false);
        this.openSnackBar("Erro al guardar", "Ok")
       }
     })
    }else{
      this.openSnackBar("Verifique los datos ingresados", "Ok")
    }
  }
}
