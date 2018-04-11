import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { Apollo } from 'apollo-angular';

import { AuthService } from '@app/core/services/auth.service';
import { myInitialQ } from '@app/core/types/user/queries.ts'
import { loginUser } from '@app/core/types/user/mutations.ts'


@Component({
  selector: 'app-login',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="100%" fxFlex.gt-sm="30%">
        <form [formGroup]="loginForm" #f="ngForm" (ngSubmit)="onLogin()" class="form">
          <mat-toolbar color="primary">
            <h2>Iniciar Sesión</h2>
          </mat-toolbar>
          <mat-card class="card">
            <mat-card-header >
            </mat-card-header>
            <mat-card-content>
              <mat-form-field class="full-width">
                <input matInput required type="email" placeholder="Email" formControlName="email">
              </mat-form-field>

              <mat-form-field class="full-width">
                <input matInput required [type]="hide ? 'password' : 'text'" placeholder="Contraseña" formControlName="password">
                <mat-icon matSuffix  (click)="hide = !hide">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>
              </mat-form-field>
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" type="submit" [disabled]="!loginForm.valid" aria-label="login">
                <mat-icon>lock</mat-icon>Entrar
              </button>
              <span class="spacer"></span>
            </mat-card-actions>
          </mat-card>
        </form>
        <div class="loading">
            <div [hidden]="!loading">
                <mat-progress-bar mode="indeterminate"></mat-progress-bar>
            </div>
        </div>
        <br />
      </div>
    </div>    
  `,
  styles: [`    

    .full-width {
      width: 100%;
    }

    .mat-icon {
      cursor: pointer;
    }

    .mat-card-avatar {
      height: 130px;
      width: 130px;
    }
    
    .header-image {
      background-image: url('assets/logo.png');
      background-size: cover;
    }
    
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  hide = true;
  users: any;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private apollo: Apollo,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {

    this.loading = true;

    this.apollo.mutate({
      mutation: loginUser,
      variables: {
        'user': {'email': this.loginForm.value.email, 'password': this.loginForm.value.password}
      },
    }).subscribe(({data}) => {
      this.loading = data.loading;
      this.snackBar.open(`Bienvenido a SEMEAT`, 'X', {duration: 3000});
      this.authService.login(data.signinUser.token);
      
      if (this.authService.isStudent()) {
        this.router.navigate(['dashboard', 'questionnaire']);      
      } else if (this.authService.isSpecialist) {
        this.router.navigate(['dashboard', 'login']);      
      } else if (this.authService.isAdmin()){
        this.router.navigate(['dashboard', 'login']);      
      } else {
        this.router.navigate(['auth', 'login']);      
      }
      
    }, (error) => {
      this.loading = false;
      this.snackBar.open(error, 'X', {duration: 3000});
    });
  }
}
