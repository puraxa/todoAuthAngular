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
  disabled:boolean = false;
  constructor(public auth: AngularFireAuth, public router:Router, public globals:GlobalsService) { }

  ngOnInit() {
  }
  onSubmit = async(form) => {
    try {
      this.disabled = true;
      this.showSpinner = true;
      const user = await this.auth.auth.signInWithEmailAndPassword(form.value.email,form.value.password);
      this.globals.isLoggedIn = true;
      this.disabled = false;
      this.showSpinner = false;
      this.router.navigate(['todolist']);
    } catch (err) {
      this.disabled = false;
      this.showSpinner = false;
      this.errorMessage = err.message;
    }
  }
}
