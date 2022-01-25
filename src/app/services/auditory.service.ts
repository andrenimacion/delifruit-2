import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuditoryService {

  public port: string = environment.port;
  private apiURL = `https://alp-cloud.com:${this.port}/api`;

  constructor(private http: HttpClient) { }
  
  getauditoria( prop: string, data:string, order:string, state:string) {
    return this.http.get( this.apiURL + '/AUD/getAudit/' + prop +'/' + data +'/' + order+'/' + state )
  }
}
