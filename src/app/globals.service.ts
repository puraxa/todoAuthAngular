import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  isAdmin:boolean;
  isLoggedIn:boolean = false;
  constructor(public auth:AngularFireAuth) { }
  checkLoggedIn = () => {
    this.auth.idTokenResult.subscribe(nesto=> {
      this.isAdmin = nesto.claims.admin;
      if(nesto){
        return this.isLoggedIn = true;
      }
      this.isLoggedIn = false;
    });
  }
}
