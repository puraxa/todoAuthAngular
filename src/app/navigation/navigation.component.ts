import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public auth:AngularFireAuth, public router:Router) { }

  ngOnInit() {
  }
  logout = async() => {
    try {
      await this.auth.auth.signOut();  
      this.router.navigate(['login']);
    } catch (err) {
      console.log(err);
    }
  }
}
