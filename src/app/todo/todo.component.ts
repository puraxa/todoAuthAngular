import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(public auth:AngularFireAuth) { }

  ngOnInit() {
    this.auth.auth.currentUser.getIdTokenResult().then(user => {
      console.log(user.claims);
    })
  }

}