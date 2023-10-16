import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from "./signin/signin.component";
import {RegisterComponent} from "./register/register.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {authGuard} from "./_services/auth/auth.guard";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path: 'dashboard', component:  DashboardComponent, canMatch: [authGuard('protected')], title: 'Dashboard'},
  {path: 'signin', component: SigninComponent, canMatch: [authGuard('unprotected')], title: 'Log in'},
  {path: 'signup', component:  RegisterComponent, canMatch: [authGuard('unprotected')], title: 'Sign Up'},
  {path: '**', redirectTo: 'dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
