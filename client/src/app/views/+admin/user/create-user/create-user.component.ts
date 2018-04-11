import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';
import { Apollo } from 'apollo-angular';

import { addUser } from '@app/core/types/user/mutations';
import { users } from '@app/core/types/user/queries';

@Component({
  selector: 'app-create-user',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="30%" fxFlex.xs="100%" fxFlex.gt-sm="30%">
        <mat-toolbar color="primary">
          <h2>Insertar Usuario</h2>
        </mat-toolbar>
        <mat-card>
          <form [formGroup]="addUserForm" #f="ngForm" (ngSubmit)="addUser()" class="form">
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

              <mat-form-field  class="full-width">
                <mat-select placeholder="Escoja un Rol" formControlName="roles" multiple>
                  <mat-option value="Administrador">Administrador</mat-option>
                  <mat-option value="Especialista">Especialista</mat-option>
                  <mat-option value="Estudiante">Estudiante</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field class="full-width">
                <input matInput required [type]="hide ? 'password' : 'text'" placeholder="Contraseña" formControlName="password">
                <mat-icon matSuffix  (click)="hide = !hide">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>              
              </mat-form-field>

              <mat-form-field class="full-width">
                <input matInput required [type]="hide ? 'password' : 'text'" placeholder="Repetir Contraseña" formControlName="repeat_password">
                <mat-icon matSuffix  (click)="hide = !hide">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>
              </mat-form-field>              

              <div *ngIf="addUserForm.value.password != addUserForm.value.repeat_password">
                <div class="warn">                  
                    <h4>Las contraseñas no coinciden, la misma debe poseer letras y números y un mínimo de 6 carácteres</h4>                  
                </div>
              </div>

            </mat-card-content>
            <mat-card-actions>
              <a mat-raised-button color="accent" aria-label="back" [routerLink]="['/admin/user/read']">
                <mat-icon>arrow_back</mat-icon>Átras
              </a>
              <button mat-raised-button color="primary" type="submit" [disabled]="(!addUserForm.valid) || (addUserForm.value.password != addUserForm.value.repeat_password)" aria-label="addUser">
                <mat-icon>add</mat-icon>Usuario
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
    .full-width{
      width: 100%;
    }
    .mat-icon {
      cursor: pointer;
    }
    .warn {
      background: #e53935;
      color: white;
      padding: 5px;
    }
  `]
})
export class CreateUserComponent implements OnInit {

  addUserForm: FormGroup;
  loading: boolean = false;
  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private apollo: Apollo,
    private router: Router,
  ) { }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      email: ['', [ Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]],
      repeat_password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]],
      roles: ['', Validators.required],
    });
  }

  addUser() {
    this.loading = true;
    
    this.apollo.mutate({
      mutation: addUser,
      variables: {
          'user': {
            'birthdate': this.addUserForm.value.birthdate,
            'email': this.addUserForm.value.email,
            'password': this.addUserForm.value.password,
            'firstname': this.addUserForm.value.firstname,
            'lastname': this.addUserForm.value.lastname,
            'roles': this.addUserForm.value.roles,
          },
      },
      refetchQueries: [
        {
          query: users,
        },
      ],
    }).subscribe(({data}) => {
      this.loading = data.loading;
      this.addUserForm.reset();
      this.snackBar.open(`Usuario ${data.addUser.firstname} adicionado correctamente!`, 'X', {duration: 3000});      
      
    }, (error) => {
      this.loading = false;
      this.snackBar.open(error, 'X', {duration: 3000});
    });
  }

}
