import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';

import { updateUser } from '@app/core/types/user/mutations';
import { user, users } from '@app/core/types/user/queries';

@Component({
  selector: 'app-update-user',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="30%" fxFlex.xs="100%" fxFlex.gt-sm="30%">
        <mat-toolbar color="primary">
          <h2>Modificar Usuario</h2>
        </mat-toolbar>
        <mat-card>
          <form [formGroup]="updateUserForm" #f="ngForm" (ngSubmit)="updateUser()" class="form">
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

              <div *ngIf="updateUserForm.value.password != updateUserForm.value.repeat_password">
                <div class="warn">                  
                    <h4>Las contraseñas no coinciden, la misma debe poseer letras y números y un mínimo de 6 carácteres</h4>                  
                </div>
              </div>

            </mat-card-content>
            <mat-card-actions>
              <a mat-raised-button color="accent" aria-label="back" [routerLink]="['/admin/user/read']">
                <mat-icon>arrow_back</mat-icon>Átras
              </a>
              <button mat-raised-button color="primary" type="submit" [disabled]="(!updateUserForm.valid) || (updateUserForm.value.password != updateUserForm.value.repeat_password)" aria-label="addUser">
                <mat-icon>border_color</mat-icon>Usuario
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
export class UpdateUserComponent implements OnInit {

  updateUserForm: FormGroup;
  loading: boolean = false;
  hide: boolean = true;
  userId: string;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private apollo: Apollo,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.updateUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]],
      repeat_password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]],
      roles: ['', Validators.required],
    });

    this.userId = this.activeRoute.snapshot.params["id"];

    this.loading = true;

    this.apollo.watchQuery<any>({
      query: user,
      variables: {
        'id': this.userId,
      },
      fetchPolicy: 'network-only',
    })
      .valueChanges
      .subscribe(({ data }) => {
        this.loading = false;
        this.updateUserForm.setValue(
          {
            email: data.user.email,
            firstname: data.user.firstname,
            lastname: data.user.lastname,
            birthdate: new Date(data.user.birthdate),
            password: data.user.password,
            repeat_password: data.user.password,
            roles: data.user.roles,
          });

      }, (error) => {
        this.loading = false;
        this.snackBar.open(error, 'X', { duration: 3000 });
      });
  }

  updateUser() {
    this.loading = true;

    this.apollo.mutate({
      mutation: updateUser,
      variables: {
        'user': {
          'birthdate': this.updateUserForm.value.birthdate,
          'email': this.updateUserForm.value.email,
          'password': this.updateUserForm.value.password,
          'firstname': this.updateUserForm.value.firstname,
          'lastname': this.updateUserForm.value.lastname,
          'roles': this.updateUserForm.value.roles,
        },
        'id': this.userId,
      },
      refetchQueries: [
        {
          query: users,
        },
      ],
    }).subscribe(({ data }) => {
      this.loading = data.loading;
      this.router.navigate(['/admin', 'user', 'read']);
      this.snackBar.open(`Usuario ${data.updateUser.firstname} actualizado correctamente!`, 'X', { duration: 3000 });

    }, (error) => {
      this.loading = false;
      this.snackBar.open(error, 'X', { duration: 3000 });
    });
  }

}
