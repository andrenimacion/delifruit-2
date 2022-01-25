import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WeeksControlsService {

  public port: string = environment.port;
  private apiURL = `https://alp-cloud.com:${this.port}/api`;

  constructor(private http: HttpClient, public router: Router) { }
  
  load(model: any ){
    return this.http.get( this.apiURL + '/RecuData01/SaveRecuData01', model);
  }
  save(model: any ){
    return this.http.put( this.apiURL + '/RecuData01/SaveRecuData01', model);
  }
  edit(model: any ){
    return this.http.post( this.apiURL + '/RecuData01/SaveRecuData01', model);
  }
  delete(model: any ){
    return this.http.get( this.apiURL + '/RecuData01/SaveRecuData01', model);
  }
}