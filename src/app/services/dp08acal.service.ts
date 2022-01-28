import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Dp08acalService {
  public port: string = environment.port;
  private apiURL = `https://alp-cloud.com:${this.port}/api/`;

  constructor(private http: HttpClient, public router: Router) { }

  getSemanas( order: string, anio: string, properties: string ) {
    return this.http.get( this.apiURL + 'dp08acal/getDp08acal/' + order + '/' + anio + '/' + properties )
  }



}
