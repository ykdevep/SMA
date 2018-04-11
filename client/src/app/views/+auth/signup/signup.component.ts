import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { Apollo } from 'apollo-angular';
import { AuthService } from '@app/core/services/auth.service';
import { signupUser } from '@app/core/types/user/mutations.ts'

@Component({
  selector: 'app-signup',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="100%" fxFlex.gt-sm="30%">
        <mat-toolbar color="primary">
          <h2>Regístrar cuenta de Usuario</h2>
        </mat-toolbar>
        <mat-card>
          <form [formGroup]="signupForm" #f="ngForm" (ngSubmit)="onSignup()" class="example-form">
            <mat-card-content>
              <mat-form-field class="full-width">
                <input matInput required type="email" placeholder="Correo" formControlName="email">
              </mat-form-field>

              <mat-form-field class="full-width">
                <input matInput required type="text" placeholder="Nombre" formControlName="firstname">
              </mat-form-field>

              <mat-form-field class="full-width">
                <input matInput required type="text" placeholder="Apellidos" formControlName="lastname">
              </mat-form-field>

              <mat-form-field class="full-width">
                <input matInput [matDatepicker]="picker" placeholder="Fecha de nacimiento" formControlName="birthdate">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker startView="year"></mat-datepicker>
              </mat-form-field>

              <mat-form-field class="full-width">
                <input matInput required type="password" placeholder="Contraseña" formControlName="password">
              </mat-form-field>

              <mat-form-field class="full-width">
                <input matInput required type="password" placeholder="Repetir Contraseña" formControlName="repeat_password">
              </mat-form-field>

              <div *ngIf="signupForm.value.password != signupForm.value.repeat_password">
                <div class="warn">                  
                  <h4>Las contraseñas no coinciden, la misma debe poseer letras y números y un mínimo de 6 carácteres</h4>                  
                </div>
              </div>

            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" type="submit" [disabled]="(!signupForm.valid) || (signupForm.value.password != signupForm.value.repeat_password)" aria-label="login">
                <mat-icon>lock</mat-icon>Entrar
              </button>
            </mat-card-actions>
            </form>
        </mat-card>
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
    .warn {
      background: #e53935;
      color: white;
      padding: 5px;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private apollo: Apollo,
    private router: Router,
    private authService: AuthService ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]],
      repeat_password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]]
    });
  }

  onSignup(){
    this.loading = true;
    
    this.apollo.mutate({
      mutation: signupUser,
      variables: {
          'user': {
            'birthdate': this.signupForm.value.birthdate,
            'email': this.signupForm.value.email,
            'password': this.signupForm.value.password,
            'firstname': this.signupForm.value.firstname,
            'lastname': this.signupForm.value.lastname,
          },
      }
    }).subscribe(({data}) => {
      this.loading = data.loading;
      this.snackBar.open(`Bienvenido a SEMEAT`, 'X', {duration: 3000});
      this.authService.singup(data.signupUser.token);
      
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
