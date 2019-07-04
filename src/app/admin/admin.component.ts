import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  data;
  constructor(public fns: AngularFireFunctions) { 
  }
  getUsers = this.fns.httpsCallable('getUsers');

  ngOnInit() {
    this.getUsers({uid:'jnLDiiMjOVYfczsmuMllm4dSzxM2'}).toPromise().then(nesto=>console.log(nesto));
  }

}
