import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { IndexService } from 'src/app/services/index.service';
import { ManageUsersService } from 'src/app/services/manage-users.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  nameimage = "Ingrese imagen"
  weightimage = 0
  ordericon = "expand_less"
  ordertitle = "Ascendente"
  orderstate = false
  ordervar = "ASC"
  arrusers:any = []
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  formmanager = this.formBuilded.group({
    cedula: [, [Validators.required, Validators.minLength(10),Validators.maxLength(10), Validators.pattern('[0-9 ]*')]],
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required, Validators.minLength(6)]],
    name: [, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    fullname: [, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    phone: [, [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')]],
    direccion: [""],
    type: [,Validators.required]
  });
  filters = [
    {name:'cedula',value:"id_ruc"},
    {name:'Nombres',value:"nombres"},
    {name:'Apaellidos',value:"apellidos"},
    {name:'Correo',value:"email"},
    {name:'Fecha',value:"fecha_reg"},
    {name:'Telefono',value:"telefono"}]
  selectfilter = new FormControl("id_ruc");
  loading=false
  state = true
  types:any = [
    {value: 'A', name: 'Administrativo'},
    {value: 'N', name: 'Operativo'},
  ];
  constructor(public dialog: MatDialog,private snackBar: MatSnackBar, private formBuilded:FormBuilder,private indexsvc:IndexService, private manageusersvc:ManageUsersService) { }
  @ViewChild('formDirective') formDirective: any;
  ngOnInit(): void {
    setTimeout(() => {
      this.indexsvc.loading.emit(true);
      this.load()
    }, 60);
  }
  changewin(){
    this.indexsvc.minmenu.emit(this.state);
    this.state = !this.state
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
      //this.search()
    }else{
      //this.loadlist()
    }
  }
  edit(cedula:string, code:string){
    this.indexsvc.loading.emit(true);
    this.manageusersvc.load_imgae(code).subscribe({
      next:(image)=>{
        this.indexsvc.loading.emit(false);
        var arrima:any = image
        this.openedit(arrima[0].img, cedula)
      }, error:()=>{
        this.indexsvc.loading.emit(false);
        this.openSnackBar("Error al obtener la imagen", "Ok")
        this.openedit("", cedula)
      }
    })
  }
  openedit(image:any, cedula:string){
    var data = this.arrusers.find((x:any)=>x.id_ruc == cedula)
    console.log(data)
        const dialogRef = this.dialog.open(EditUserComponent, {
          width: '300px',
          data: {data:data, image: image}
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result == true){
            this.search()
          }
        });
  }
  savedata() {
    if(this.formmanager.valid){
      var image :any= "";
      const filesSelected:any = document.getElementById('img') as HTMLInputElement;
      const fileId = filesSelected.files;
      if (fileId.length > 0) {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          image = fileReader.result;
          this.saved(image)
        };
        fileReader.readAsDataURL(fileId[0]);
      }else{
        this.saved(image)
      }
    }
  }
  upercasenam(name:string):string{
     var namearr = name.split(" ")
     var result = ""
     for(let i = 0; i < namearr.length;i++){
      var namelo = namearr[i].toLowerCase()
      var rest = namelo.slice(1)
      var leter = namelo.slice(0,1).toUpperCase()
      result += leter + rest + " "
     }
     return result
  }
  checkimg(fileInput:any){
    var selectedFiles = fileInput.target.files;
    this.nameimage = selectedFiles[0].name
    var type = selectedFiles[0].type
    var kilobytes = selectedFiles[0].size
    this.weightimage = kilobytes / 1024
    if(this.weightimage > 500){
      this.openSnackBar("Imagen muy pesada, ingrese otra", "Ok")
      selectedFiles[0].value = ""
    }
    if(type != "image/png" && type != "image/jpeg" && type != "image/jpg"){
      console.log(selectedFiles[0].type)
      this.openSnackBar("Fromato de imagen incorrecto", "Ok")
      fileInput = ""
      this.nameimage = "Ingrese imagen"
      selectedFiles[0].value = ""
    }
  }
  saved(image:string){
      if(this.formmanager.valid){
        this.indexsvc.loading.emit(true);
        var codeuser = sessionStorage.getItem("User_Name")
        var objFecha = new Date();
        var dia  = objFecha.getDate();
        var mes  = objFecha.getMonth();
        var anio = objFecha.getFullYear();        
        var codecUserCreate = codeuser?.slice(0,3)+'_'+ this.tGenerate(17)+'_'+dia+mes+anio
        var x = {
          id_ruc: this.formmanager.get("cedula")?.value,
          email: this.formmanager.get("email")?.value,
          pass: this.formmanager.get("password")?.value.trim(),
          fecha_reg: new Date(),
          apellidos: this.upercasenam(this.formmanager.get("fullname")?.value).trim(),
          nombres: this.upercasenam(this.formmanager.get("name")?.value).trim(),
          telefono: this.formmanager.get("phone")?.value,
          img: image,
          codec_user: codecUserCreate,
          direccion:  this.formmanager.get("direccion")?.value.trim(),
          tipo:  this.formmanager.get("type")?.value,
        }
        this.manageusersvc.save(x).subscribe({
          next:(x)=>{  
            var m = {
              img: image,
              codec_user: codecUserCreate
            }
            this.manageusersvc.save_imgae(m).subscribe({
              next:()=>{
                var data = {
                  WebUsu: this.formmanager.get("email")?.value,
                  WebPass:  this.formmanager.get("password")?.value.trim(),
                  TipoMu: this.formmanager.get("type")?.value,
                  CodeUser: codecUserCreate
                }
                this.manageusersvc.access_login(data).subscribe({
                  next:()=>{
                    this.openSnackBar("Guardado con exito", "Ok")
                    this.formDirective.resetForm();
                    const filesSelected:any = document.getElementById('img') as HTMLInputElement;
                    filesSelected.value = ""
                    this.formmanager.reset()
                    this.load()
                    this.nameimage = "Ingrese imagen"
                  }, error:()=>{
                    this.indexsvc.loading.emit(false);
                    this.openSnackBar("Error al dar acceso", "Ok")
                  }
                })
              }, error:()=>{
                this.indexsvc.loading.emit(false);
                this.openSnackBar("Error al guardar la imagen", "Ok")
              }
            })
          }, error:()=>{
            this.indexsvc.loading.emit(false);
            this.openSnackBar("Usuario ya registrado", "Ok")
          }
        })
      }else{
        this.openSnackBar("Verifique los datos ingresados", "Ok")
      }
  }
  load(){
    this.manageusersvc.load("id_ruc", "0").subscribe({
      next:(x)=>{  
        this.arrusers = x
        this.loading = false
        this.indexsvc.loading.emit(false);
      }, error:()=>{
        this.loading = false
        this.indexsvc.loading.emit(false);
        this.openSnackBar("Error al obtener los usuarios", "Ok")
      }
    })
  }
  search(){
    this.loading = true
    var search = <HTMLInputElement> document.getElementById("search")
    if(search.value.length > 0){
      this.manageusersvc.load(this.selectfilter.value, search.value).subscribe({
        next:(x)=>{  
          this.arrusers = x
          this.indexsvc.loading.emit(false);
          this.loading = false
        }, error:()=>{
          this.loading = false
          this.openSnackBar("Error al obtener los usuarios", "Ok")
        }
      })
    }else{
      this.load()
    }
  }
  delete(cedula:string, CodeUser:string){
    this.indexsvc.loading.emit(true);
    this.manageusersvc.remove(cedula).subscribe({
      next:()=>{
        this.manageusersvc.del_access_login("CodeUser", CodeUser).subscribe({
          next:()=>{
            this.search()
            this.openSnackBar("Eliminado con exito", "Ok")
          }, error:()=>{
            this.indexsvc.loading.emit(false);
            this.loading = false
            this.openSnackBar("Error al eliminar", "Ok")
          }
        })
      }, error:()=>{
        this.indexsvc.loading.emit(false);
        this.loading = false
        this.openSnackBar("Error al eliminar", "Ok")
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
  tGenerate(cant: number) {
    let caracteres = "abcdefghijkmnpqrtuvwxyz_ABCDEFGHJKMNPQRTUVWXYZ2346789-";
    let token = "";
    for (let i=0; i<cant; i++) {
      token += caracteres.charAt(Math.floor(Math.random()*caracteres.length));  
    }
    return token; 
  }
}
