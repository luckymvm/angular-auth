import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigninComponent} from "./signin/signin.component";
import {RegisterComponent} from "./register/register.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {authGuard} from "./_services/auth/auth.guard";

const routes: Routes = [
  {path: 'dashboard', component:  DashboardComponent, canMatch: [authGuard('protected')]},
  {path: 'signin', component: SigninComponent, canMatch: [authGuard('unprotected')]},
  {path: 'signup', component:  RegisterComponent, canMatch: [authGuard('unprotected')]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
