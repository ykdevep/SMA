import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { Apollo } from 'apollo-angular';
import { AuthService } from '@app/core/services/auth.service';
import { User } from '@app/core/models/user.model';
import { updateProfile } from '@app/core/types/user/mutations.ts'
import { currentUser } from '@app/core/types/user/queries.ts'


@Component({
  selector: 'app-profile',
  template: `
  <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="100%" fxFlex.gt-sm="30%">
        <mat-toolbar color="primary">
          <h2>Actualizar perfil</h2>
        </mat-toolbar>
      <mat-card>
        <form [formGroup]="profileForm" #f="ngForm" (ngSubmit)="onProfile()" class="form">
          <mat-card-content>

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

          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" type="submit" [disabled]="!profileForm.valid" aria-label="login">
              <mat-icon>lock</mat-icon>Actualizar
            </button>
          </mat-card-actions>
          </form>
      </mat-card>
      <div class="loading">
        <div [hidden]="!loading">
            <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  loading = false;
  token: string;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private apollo: Apollo ) {
      this.token = this.authService.getToken();
     }

  ngOnInit() {

    this.profileForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
    });

    this.loading = true;

    this.apollo.watchQuery<any>({
      query: currentUser,
      fetchPolicy: 'network-only',
    })
    .valueChanges
    .subscribe(({data}) => {
      this.loading = false;
      this.profileForm.setValue(
        {
          firstname: data.currentUser.firstname,
          lastname: data.currentUser.lastname,
          birthdate: new Date(data.currentUser.birthdate),
        });
      
    }, (error) => {
      this.loading = false;
      this.snackBar.open(error, 'X', {duration: 3000});
    });

  }

  onProfile() {
    this.loading = true;
    
    this.apollo.mutate({
      mutation: updateProfile,
      variables: {
        'user': {
          'firstname': this.profileForm.value.firstname,
          'lastname': this.profileForm.value.lastname,
          'birthdate': this.profileForm.value.birthdate,
        },          
      }
    }).subscribe(({data}) => {
      this.loading = false;
      this.authService.profile(data.profileUser.token);

      if (this.authService.isStudent()) {
        this.router.navigate(['dashboard', 'questionnaire']);      
      } else if (this.authService.isSpecialist) {
        this.router.navigate(['dashboard', 'login']);      
      } else if (this.authService.isAdmin()){
        this.router.navigate(['dashboard', 'login']);      
      } else {
        this.router.navigate(['auth', 'login']);      
      }
      this.snackBar.open(`Perfil actualizado`, 'X', {duration: 3000});
    }, (error) => {
      this.loading = false;
      this.snackBar.open(error, 'X', {duration: 3000});
    });
  }
}
