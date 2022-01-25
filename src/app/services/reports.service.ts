import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  public port: string = environment.port;
  private apiURL = `https://alp-cloud.com:${this.port}/api/`;

  constructor(private http: HttpClient) { }
  
  load_table1(ot: string, anio:string,tip:string ){
    return this.http.get( this.apiURL + 'reportes/GetInformes/' + ot + '/'  + anio+ '/'  + tip);
  }
  getMaster(nomtag: string) {  
    return this.http.get( this.apiURL + 'control_alp_master_tabla/geMasterB/' + nomtag);
  }
  getMaster2(master: string) {  
    return this.http.get( this.apiURL + 'control_alp_master_tabla/getLotesByHac/' + master);
  }

}
