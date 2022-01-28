import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Prcor01Service {

  public port: string = environment.port;
  private apiURL = `https://alp-cloud.com:${this.port}/api/`;

  constructor(private http: HttpClient, public router: Router) { }

  getPr01() {
    return this.http.get( this.apiURL + 'Prcor01/gePrController' );
  }

  delPr01( ID: number ) {
    return this.http.get( this.apiURL + 'Prcor01/DELPrController/' + ID );
  }

  savePr01( model: any [] ) {
    return this.http.post( this.apiURL + 'Prcor01/savePrcor01', model );
  }

  updPr01( id: number, model: any [] ) {
    return this.http.put( this.apiURL + 'Prcor01/UpdatePrcor01/' + id, model );
  }

}
