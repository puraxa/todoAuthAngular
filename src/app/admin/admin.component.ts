import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  token:string;
  userInfo;
  constructor(public fns: AngularFireFunctions, public http:HttpClient, public auth:AngularFireAuth, public router:Router) { 
  }
  getUsers = this.fns.httpsCallable('getUsers');
  
  ngOnInit() {
    this.auth.idTokenResult.subscribe(nesto=>{
      console.log(nesto.token);
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
      this.http.post('https://europe-west1-todo-11f67.cloudfunctions.net/getUsers',JSON.stringify({token: this.token})).subscribe(users => {
        this.userInfo = users;
      });
    });
  }
}
