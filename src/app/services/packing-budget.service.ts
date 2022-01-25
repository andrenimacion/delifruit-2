import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PackingBudgetService {

  public port: string = environment.port;
  private apiURL = `https://alp-cloud.com:${this.port}/api/`;

  constructor(private http: HttpClient, public router: Router) { }
  
  loadestates(data: string, opt:string ){
    return this.http.get( this.apiURL + 'control_alp_master_tabla/FilterDataModuleGBarCode/' + data + '/'  + opt);
  }
  loadlots(data: string, opt:string ){
    return this.http.get( this.apiURL + 'control_alp_master_tabla/FilterDataModuleGBarCode/' + data + '/'  + opt);
  }
  loadweeks(order: string , anio:string, prop:string){
    return this.http.get( this.apiURL + 'dp08acal/getDp08acal/' + order +'/'+ anio +'/'+ prop );
  }
  savebox(data:any){
    return this.http.post( this.apiURL + 'control_alp_master_tabla/save_alp_master', data );
  }
  loadbox(nomtag:string, properties:string){
    return this.http.get( this.apiURL + 'control_alp_master_tabla/geMaster/' + nomtag + '/' + properties + '/ASC');
  }
  deletebox(id:number, master:string){
    return this.http.get( this.apiURL + 'control_alp_master_tabla/delMasterData/' + master + '/' + id);
  }
  load(filter: string, proper:string, order:string ){
    return this.http.get( this.apiURL + 'ccorte/GetCorte/'+filter+'/'+proper+'/'+order);
  }
  save(model: any ){
    return this.http.post( this.apiURL + 'ccorte/saveCorte', model);
  }
  edit(model: any ){
    return this.http.post( this.apiURL + '/RecuData01/SaveRecuData01', model);
  }
  delete(id: string ){
    return this.http.get( this.apiURL + 'ccorte/delCorte/'+id);
  }
}