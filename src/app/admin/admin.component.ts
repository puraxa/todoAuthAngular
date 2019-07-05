import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  uid:string;
  userInfo;
  constructor(public fns: AngularFireFunctions, public http:HttpClient, public auth:AngularFireAuth) { 
  }
  getUsers = this.fns.httpsCallable('getUsers');

  ngOnInit() {
    this.auth.idTokenResult.subscribe(nesto=>{
      this.uid = nesto.claims.user_id;
      this.http.post('https://europe-west1-todo-11f67.cloudfunctions.net/getUsers',JSON.stringify({uid: this.uid})).subscribe(users => {
        this.userInfo = users;
      });
    });
    
  }
  setAdmin = (uid) => {
    this.userInfo = null;
    this.http.post('https://europe-west1-todo-11f67.cloudfunctions.net/setAdmin',JSON.stringify({uid:uid, adminUid: this.uid})).subscribe(response => {
      this.http.post('https://europe-west1-todo-11f67.cloudfunctions.net/getUsers',JSON.stringify({uid: this.uid})).subscribe(users => {
        this.userInfo = users;
      });
    });
  }
  removeAdmin = (uid) => {
    this.userInfo = null;
    this.http.post('https://europe-west1-todo-11f67.cloudfunctions.net/removeAdmin',JSON.stringify({uid:uid, adminUid: this.uid})).subscribe(response => {
      this.http.post('https://europe-west1-todo-11f67.cloudfunctions.net/getUsers',JSON.stringify({uid: this.uid})).subscribe(users => {
        this.userInfo = users;
      });
    });
  }
}
