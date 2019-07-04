import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public auth:AngularFireAuth, public router:Router, public globals:GlobalsService) { }

  ngOnInit() {
  }
  logout = async() => {
    try {
      await this.auth.auth.signOut();  
      this.globals.isLoggedIn = false;
      this.router.navigate(['login']);
    } catch (err) {
      console.log(err);
    }
  }
}
