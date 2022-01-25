import { DatePipe } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ManageUsersService } from 'src/app/services/manage-users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  id_use = "0"
  isupdate = false
  oldimage:any = ""
  oldcedula = ""
  state = false
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilded:FormBuilder, private manageusersvc:ManageUsersService,private snackBar: MatSnackBar) {}

    closed(): void {
    this.dialogRef.close(this.isupdate);
  }
  types:any = [
    {value: 'A', name: 'Administrativo'},
    {value: 'N', name: 'Operativo'},
  ];
  horizontalPosition: MatSnackBarHorizontalPosition= 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  ngOnInit(): void {
    var people = <HTMLDivElement> document.getElementById("people")
    if(this.data.image != null && this.data.image.length > 20){
      people.style.backgroundImage = "url('"+ this.data.image +"')"
      this.oldimage = this.data.image 
    }
    if(this.data.data != null){
      this.id_use = this.data.data.id
      this.formmanager.get("name")?.setValue(this.data.data.nombres)
      this.formmanager.get("fullname")?.setValue(this.data.data.apellidos)
      this.formmanager.get("email")?.setValue(this.data.data.email)
      this.formmanager.get("phone")?.setValue(this.data.data.telefono)
      this.formmanager.get("cedula")?.setValue(this.data.data.id_ruc)
      this.formmanager.get("type")?.setValue(this.data.data.tipo)
      this.oldcedula = this.formmanager.get("cedula")?.value
      this.formmanager.get("password")?.setValue(this.data.data.pass)
      this.formmanager.get("direccion")?.setValue(this.data.data.direccion)
      this.formmanager.get("type")?.setValue(this.data.data.tipo)
      this.formmanager.get("date")?.setValue( new DatePipe('en-US').transform(this.data.data.fecha_reg, 'medium'))
       this.formmanager.get("date")?.disable()
    }
  }
  formmanager = this.formBuilded.group({
    cedula: [, [Validators.required, Validators.minLength(10), Validators.pattern('[0-9 ]*')]],
    email: [, [Validators.required, Validators.email]],
    password: [, [Validators.required, Validators.minLength(6)]],
    name: [, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    fullname: [, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
    phone: [, [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')]],
    date: [],
    direccion: [],
    type: [],
  });
  @HostListener("scroll", ['event'])
  mscroll(event:any){
    var y = event.srcElement.scrollTop;
    var opacity = <HTMLDivElement> document.getElementById("opacity")
    if(y <= 0){
      opacity.style.opacity = `0`
    }else if(y > 0 && y < 75){
      opacity.style.opacity = `0.2`
    }else if(y > 75 && y < 150){
      opacity.style.opacity = `0.5`
    }else if(y > 150 && y < 225){
      opacity.style.opacity = `0.8`
    }else if(y > 225 && y < 300){
      opacity.style.opacity = `1`
    }
    if(y > 120 && y < 400){
      var element1 = <HTMLDivElement> document.getElementById("element2")
      element1.style.animationName = "conta"
    }else if(y > 400){
      var element1 = <HTMLDivElement> document.getElementById("element3")
      element1.style.animationName = "conta"
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
  save(){
    this.state = true
    var x = {
      id_ruc: this.formmanager.get("cedula")?.value,
      email: this.formmanager.get("email")?.value,
      pass: this.formmanager.get("password")?.value.trim(),
      apellidos: this.upercasenam(this.formmanager.get("fullname")?.value).trim(),
      nombres: this.upercasenam(this.formmanager.get("name")?.value).trim(),
      telefono: this.formmanager.get("phone")?.value,
      fecha_reg: this.data.data.fecha_reg,
      codec_user: this.data.data.codec_user,
      direccion: this.formmanager.get("direccion")?.value,
      tipo: this.formmanager.get("type")?.value,
    }
    this.manageusersvc.update(this.oldcedula, x).subscribe({
      next:(x)=>{  
        var data = {
          id:  this.id_use,
          WebUsu: this.formmanager.get("email")?.value,
          WebPass:  this.formmanager.get("password")?.value.trim(),
          TipoMu: this.formmanager.get("type")?.value,
          CodeUser: this.data.data.codec_user
        }
        this.manageusersvc.update_access_login(this.id_use, data).subscribe({
          next:()=>{
            this.openSnackBar("Actualizado con exito", "Ok")
            this.state = false
            this.isupdate = true
          }, error:()=>{
            this.state = true
            this.openSnackBar("Error al actualizar el usuario", "Ok")
          }
        })
      }, error:()=>{
        this.state = true
        this.openSnackBar("Error al actualizar el usuario", "Ok")
      }
    })
  }
  changes(){
    this.state = true
  }
  changeimg(){
    const filesSelected:any = document.getElementById('mimg') as HTMLInputElement;
    const fileId = filesSelected.files;
    if (fileId.length > 0) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        var mimage = fileReader.result;
        var people = <HTMLDivElement> document.getElementById("people")
        people.style.backgroundImage = "url('"+ mimage +"')"
        var m = {
          img: mimage,
          codec_user: this.data.data.codec_user,
        }
        this.manageusersvc.update_imgae(this.data.data.codec_user, m).subscribe({
          next:()=>{
            this.openSnackBar("Foto actualizada con exito", "Ok")
          }, error:()=>{
            this.openSnackBar("Error al actualizar la foto", "Ok")
          }
        })
      };
      fileReader.readAsDataURL(fileId[0]);
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
