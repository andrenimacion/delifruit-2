import { Injectable } from '@angular/core';
declare var db:any
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage_name = "code"
  constructor() { }
  add(key:string, value:string){
    return new Promise(async (resolve, reject)=>{
      if(db != undefined){
        var result = await db.transaction([this.storage_name], "readrite").objectStore(this.storage_name).put(value, key)
        result.onsuccess = await function(e:any){
          if(e.target.result){
            console.log("Success")
            resolve(true)
          }else{
            console.log("Error")
            resolve(false)
          }
        }
      }
    })
  }
  get(){

  }
  delete(){

  }
}
