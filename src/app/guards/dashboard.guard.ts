import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IndexService } from '../services/index.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(private router:Router, private indexsvc:IndexService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var session = sessionStorage.getItem("User_Name")
      if(session == null || session == undefined){
        this.router.navigate(["/login"]) 
        return false;
      }else{
        return true
      }
    }
  
}
