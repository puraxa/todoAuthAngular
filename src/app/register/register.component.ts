import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage:string;
  showSpinner:boolean = false;
  constructor(public auth:AngularFireAuth, public router:Router) {
    
  }
  ngOnInit() {
  }
  onSubmit = async(formData:NgForm) => {
    try {
      this.showSpinner = true;
      if(formData.value.password != formData.value.checkpw){
        throw new Error('Passwords dont match!');
      }
      await this.auth.auth.createUserWithEmailAndPassword(formData.value.email,formData.value.password);
      this.showSpinner = false;
      this.router.navigate(['todolist']);
    } catch (err) {
      this.showSpinner = false;
      this.errorMessage = err.message;
    }
  }
}
