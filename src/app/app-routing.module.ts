import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo, canActivate, customClaims} from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent }  from './admin/admin.component';
import { TodoComponent } from './todo/todo.component';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

const redirectLoggedIn = redirectLoggedInTo(['todolist']);
const redirectUnauthorized = redirectUnauthorizedTo(['login']);
const nesto = pipe(customClaims,map(claims => claims.admin === true));

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login', component: LoginComponent, ...canActivate(redirectLoggedIn)},
  {path:'register', component: RegisterComponent, ...canActivate(redirectLoggedIn)},
  {path:'todolist',component: TodoComponent, ...canActivate(redirectUnauthorized)},
  {path:'admin', component: AdminComponent, ...canActivate(nesto)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
