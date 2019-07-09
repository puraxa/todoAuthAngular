import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  token:string;
  id:string;
  userInfo;
  constructor(public fns: AngularFireFunctions, public http:HttpClient, public auth:AngularFireAuth, public router:Router) { 
  }
  getUsers = this.fns.httpsCallable('getUsers');
  
  ngOnInit() {
    this.auth.idTokenResult.subscribe(nesto=>{
      this.id = nesto.claims.user_id;
      this.token = nesto.token;
      this.http.post('https://europe-west1-todo-11f67.cloudfunctions.net/getUsers',JSON.stringify({token: this.token})).subscribe(users => {
        this.userInfo = users;
      });
    });
  }
  setAdmin = (uid) => {
    this.userInfo = null;
    this.http.post('https://europe-west1-todo-11f67.cloudfunctions.net/setAdmin',JSON.stringify({uid:uid, token: this.token})).subscribe(response => {
      this.http.post('https://europe-west1-todo-11f67.cloudfunctions.net/getUsers',JSON.stringify({token: this.token})).subscribe(users => {
        this.userInfo = users;
      });
    });
  }
  removeAdmin = (uid) => {
    this.userInfo = null;
    this.http.post('https://europe-west1-todo-11f67.cloudfunctions.net/removeAdmin',JSON.stringify({uid:uid, token: this.token})).subscribe(nesto => {
      if(this.id == uid){
        this.auth.auth.currentUser.getIdToken(true);
        this.router.navigate(['todolist']);
        return;
      }else{
        this.http.post('https://europe-west1-todo-11f67.cloudfunctions.net/getUsers',JSON.stringify({token: this.token})).subscribe(users => {
          this.userInfo = users;
        });
      }
    });
  }
}
