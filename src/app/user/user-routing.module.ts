import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { CanActivateGuest } from '../common/can-activate-guest';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [CanActivateGuest]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
