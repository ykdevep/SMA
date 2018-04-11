import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from '@app/core/guard/auth.guard';

const router: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {title: 'Iniciar Sesión'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Iniciar Sesión'}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {title: 'Perfil'}
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {title: 'Regístrarse'}
  }

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(router)
  ],
  declarations: [LoginComponent, ProfileComponent, SignupComponent]
})
export class AuthModule { }
