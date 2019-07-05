import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireFunctionsModule, FUNCTIONS_ORIGIN, FUNCTIONS_REGION } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AdminComponent } from './admin/admin.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    AdminComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [
    {provide:FUNCTIONS_REGION, useValue:'europe-west1'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
