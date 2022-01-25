import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  public port: string = environment.port;
  private apiURL = `https://alp-cloud.com:${this.port}/api/`;

  constructor(private http: HttpClient) { }
  
  load(properties: string, dt:string ){
    return this.http.get( this.apiURL + 'US/getUsp/' + properties + '/'  + dt);
  }
  save(data: any){
    return this.http.post( this.apiURL + 'US/SaveUSweb', data);
  }
  update(cedula: string, data:any ){
    return this.http.put( this.apiURL + 'US/putUsp/' + cedula, data);
  }
  remove(cedula: string){
    return this.http.get( this.apiURL + 'US/delUsp/' + cedula);
  }
  save_imgae(data: any){
    return this.http.post( this.apiURL + 'ImgProf/SaveUSIMG', data);
  }
  update_imgae(code: string, data:any ){
    return this.http.put( this.apiURL + 'ImgProf/putUSIMG/' + code, data);
  }
  remove_imgae(code:any ){
    return this.http.get( this.apiURL + 'ImgProf/DELUSIMG/' + code);
  }
  load_imgae(code:any ){
    return this.http.get( this.apiURL + 'ImgProf/GETUSIMG/' + code);
  }
  access_login(model:any ){
    return this.http.post( this.apiURL + 'UserLogin/SaveNewLog', model);
  }
  del_access_login(prop:string, data:string ){
    return this.http.get( this.apiURL + 'UserLogin/DelUserById/' + prop+ '/'  + data);
  }
  update_access_login(id:string, model:any ){
    return this.http.put( this.apiURL + 'UserLogin/UpdateWebUsers/' + id , model);
  }
}
 