import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IndexService } from 'src/app/services/index.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { itemsindexAnimation } from '../animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ itemsindexAnimation ]
})
export class LoginComponent implements OnInit {

  vcont = ""
  vbanana = "hidden"
  vtitle = "hiddenti"
  vtext = "hiddente"
 
  arrLogin:any = []
  exit = false
  loading = false
  f = new Date();
  date = this.f.toLocaleString();   
  hide = true
  login = new FormGroup({
    username: new FormControl('gerencia', Validators.minLength(2)),
    password: new FormControl('123456789D', Validators.minLength(4)),
  });
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  constructor(private indexsvc:IndexService, private loginsvc:LoginService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.indexsvc.route.emit({state:true, type: false, rute: ""})
    this.updatedate() 
    this.itemshow()
  }
  updatedate(){
      setTimeout(() => {
        this.f = new Date();
        this.date = this.f.toLocaleString();   
        this.updatedate()
      }, 1000);
  }

  loginf(){
    if(this.login.valid){
      this.indexsvc.loading.emit(true);
      let arrLog: any = {      
        WebUsu:  this.login.get("username")?.value,
        WebPass: this.login.get("password")?.value,
      }
      this.loginsvc.login(arrLog).subscribe({
        next:(x)=>{
          this.indexsvc.loading.emit(false);
          this.arrLogin = x; 
          if(this.arrLogin.tipoMu == "A"){
            let name     = this.arrLogin.webUsu;
            console.log(x)
            let estado   = this.arrLogin.tipoMu;
            let CodeUser = this.arrLogin.codeUser;
            sessionStorage.setItem('User_Name', name);
            sessionStorage.setItem('Estado', estado);
            sessionStorage.setItem('Code_user', CodeUser);
            this.itemshidden()
            this.indexsvc.route.emit({state:false, type: false, rute: "../"});
          }else{
            this.openSnackBar("Usuario no existe", "Ok")
          }  
        }, error:()=>{
          this.indexsvc.loading.emit(false);
          this.openSnackBar("Credenciales Incorrectas", "Ok")
        }
      })
    }else{
      this.openSnackBar("Datos Invalidos", "Ok")
    }
}
  get cont(){ return this.vcont}
  get banana(){ return this.vbanana}
  get mytitle(){ return this.vtitle}
  get mytext(){ return this.vtext}

itemshow(){
  setTimeout(() => {
    this.vtitle = "showti"
    this.vbanana = "show"
    this.vtext = "showte"
  }, 40);
}

itemshidden(){
  this.vcont = "hiddencont"
  this.vbanana = "hidden"
  this.vtitle = "hiddenti"
  this.vtext = "hiddente"
}
openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
    duration: this.durationInSeconds * 1000,
  });
}

}
