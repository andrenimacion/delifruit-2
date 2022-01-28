import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  constructor() { }


  startDB () {
    if (!window.indexedDB) {
      console.log(" Your browser doesn't support a stable version of IndexedDB. " +
                  " Such and such feature will not be available. ");
    }
  }

}
