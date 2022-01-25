import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class IndexService { 

  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  getload = new EventEmitter<number>()
  minmenu = new EventEmitter<boolean>()
  loading = new EventEmitter<boolean>()
  route = new EventEmitter<any>()
  public port: string = environment.port;
  private apiURL = `https://alp-cloud.com:${this.port}/api`;

  constructor(private http: HttpClient, public router: Router) { }
  
  load(model: any ){
    return this.http.get( this.apiURL + '/RecuData01/SaveRecuData01', model);
  }

}