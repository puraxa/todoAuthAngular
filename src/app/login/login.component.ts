import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GlobalsService } from '../globals.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage:string;
  showSpinner:boolean = false;
  constructor(public auth: AngularFireAuth, public router:Router, public globals:GlobalsService) { }

  ngOnInit() {
  }
  onSubmit = async(form) => {
    try {
      this.showSpinner = true;
      const user = await this.auth.auth.signInWithEmailAndPassword(form.value.email,form.value.password);
      this.globals.isLoggedIn = true;
      this.showSpinner = false;
      this.router.navigate(['todolist']);
      console.log(form.value);  
    } catch (err) {
      this.showSpinner = false;
      this.errorMessage = err.message;
    }
  }
}
