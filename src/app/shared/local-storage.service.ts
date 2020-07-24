import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
   }

   get(key: string): any {
     if (this.isLocalStorageSupported) {
       return JSON.parse(this.localStorage.getItem(key));
     }
   }

   set(key: string, value: any): boolean {
     if (this.isLocalStorageSupported) {       
       console.log('localStorage set(): ', JSON.stringify(value))
       this.localStorage.setItem(key, JSON.stringify(value));
       return true;
     }
     return false;
   }

   remove(key: string): boolean {
     if (this.isLocalStorageSupported) {
       console.log('remove called')
       this.localStorage.removeItem(key);
       return true;
     }
     return false;
   }

   get isLocalStorageSupported(): boolean {
     return !!this.localStorage;
   }
}
