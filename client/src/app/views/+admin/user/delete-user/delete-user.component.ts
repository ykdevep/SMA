import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';

import { deleteUser } from '@app/core/types/user/mutations';
import { users } from '@app/core/types/user/queries';
import { MatSnackBar } from '@angular/material';
 
@Component({
  selector: 'app-delete-user',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="30%" fxFlex.xs="100%" fxFlex.gt-sm="30%">
        <mat-toolbar color="primary">
          Eliminar Usuario          
        </mat-toolbar>
        <mat-card>

            <mat-card-content>
              <h2>¿Estás seguro que desea eliminar Usuario con id {{userId}}?</h2>          
            </mat-card-content>
            <mat-card-actions>
              <a mat-raised-button color="accent" aria-label="back" [routerLink]="['/admin/user/read']">
                <mat-icon>arrow_back</mat-icon>Átras
              </a>
              <button mat-raised-button color="warn" (click)="deleteUser()" aria-label="deleteUser">
                <mat-icon>clear</mat-icon>Eliminar
              </button>
              
            </mat-card-actions>
            
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
  styles: []
})
export class DeleteUserComponent implements OnInit {

  userId: string;
  loading: boolean = false;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.userId = this.activeRoute.snapshot.params['id'];
  }

  deleteUser() {

    this.loading = true;

    this.apollo.mutate({
      mutation: deleteUser,
      variables: {
        'id': this.userId
      },
      refetchQueries: [{
        query: users,
      }],
    }).subscribe(({data}) => {
      this.loading = data.loading;
      this.snackBar.open(`${data.deleteUser.text}`, "X", {duration: 3000});
      this.router.navigate(['/admin/user/read']);
    },
    (error) => {
      this.loading = false;
      this.snackBar.open(error, 'X', { duration: 3000 });
    });
  }
}
