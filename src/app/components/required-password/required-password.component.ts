import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-required-password',
  templateUrl: './required-password.component.html',
  styleUrls: ['./required-password.component.css']
})
export class RequiredPasswordComponent implements OnInit {

  loading = false
  name = ""
  username = ""
  module = ""
  hide = false
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  password = new FormControl("", [Validators.required, Validators.minLength(4)]);
  constructor(
    public dialogRef: MatDialogRef<RequiredPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private loginsvc:LoginService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.name = this.data.name
    this.username = this.data.username
    this.module = this.data.module
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
  closed(){
    this.dialogRef.close();
  }
  validate(){
    var username = sessionStorage.getItem("User_Name")
    console.log(username)
    if(this.password.valid && username != null){
      this.loading = true
      let arrLog: any = {      
        WebUsu:  username,
        WebPass: this.password.value,
      }
      this.loginsvc.login(arrLog).subscribe({
        next:(x)=>{
          this.loading = false
          localStorage.setItem('verify_del', "true");
          this.dialogRef.close(true);
        }, error:()=>{
          this.loading = false
          this.openSnackBar("Credenciales Incorrectas", "Ok")
        }
      })
    }else{
      this.openSnackBar("Datos Invalidos", "Ok")
    }
  }
}
