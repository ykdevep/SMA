import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator, MatSort, MatTableDataSource, MatPaginatorIntl } from '@angular/material';

import { Apollo } from 'apollo-angular/Apollo';
import gql from 'graphql-tag';

import { User } from '@app/core/models/user.model';
import { users } from '@app/core/types/user/queries';

@Component({
  selector: 'app-read-user',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="80%" fxFlex.xs="80%" fxFlex.gt-sm="80%">
        <h2>Listado de Usuarios</h2>
      </div>
      <div class="item" fxFlex="10%" fxFlex.xs="10%" fxFlex.gt-sm="10%">
        <a mat-raised-button color="accent" [routerLink]="['/admin/user/create']"><mat-icon>person</mat-icon>Insertar Usuario</a>
      </div>
    </div>
    
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="90%" fxFlex.xs="100%" fxFlex.gt-sm="90%">
        <div class="container mat-elevation-z8">
            <div class="header">
              <mat-form-field>
                <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filtrado">
              </mat-form-field>
            </div>
            <mat-table #table [dataSource]="dataSource" matSort>
              
              <!-- firstname Column -->
              <ng-container matColumnDef="firstname">
                <mat-header-cell *matHeaderCellDef mat-sort-header> <h4>Nombre</h4> </mat-header-cell>
                <mat-cell *matCellDef="let row"> {{row.firstname}} </mat-cell>
              </ng-container>

              <!-- lastname Column -->
              <ng-container matColumnDef="lastname">
                <mat-header-cell *matHeaderCellDef mat-sort-header><h4>Apellidos</h4></mat-header-cell>
                <mat-cell *matCellDef="let row" >{{row.lastname}}</mat-cell>
              </ng-container>

              <!-- email Column -->
              <ng-container matColumnDef="email">
                <mat-header-cell *matHeaderCellDef mat-sort-header><h4>Correo</h4></mat-header-cell>
                <mat-cell *matCellDef="let row" >{{row.email}}</mat-cell>
              </ng-container>

              <!-- birthdate Column -->
              <ng-container matColumnDef="birthdate">
                <mat-header-cell *matHeaderCellDef mat-sort-header><h4>Fecha de nacimiento</h4></mat-header-cell>
                <mat-cell *matCellDef="let row" >{{row.birthdate | date}}</mat-cell>
              </ng-container>

              <!-- birthdate Column -->
              <ng-container matColumnDef="roles">
                <mat-header-cell *matHeaderCellDef mat-sort-header><h4>Roles</h4></mat-header-cell>
                <mat-cell *matCellDef="let row" >{{row.roles}}</mat-cell>
              </ng-container>

              <!-- crudOptions Column -->
              <ng-container matColumnDef="crudOptions">
                <mat-header-cell *matHeaderCellDef mat-sort-header><h4>Editar</h4>- --- -<h4>Eliminar</h4></mat-header-cell>
                <mat-cell *matCellDef="let row" >
                  <a mat-button [routerLink]="['/admin', 'user', 'update', row._id]"><mat-icon>mode_edit</mat-icon></a>
                  <a mat-button color="warn" [routerLink]="['/admin', 'user', 'delete', row._id]"><mat-icon>clear</mat-icon></a>
                </mat-cell>
              </ng-container>

              <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
              <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
          </mat-table>

          <div fxLayout="row" fxLayout.xs="column" fxLayoutAlign="start center" fxLayoutGap="0px" fxLayoutGap.xs="0">
            <div fxFlex="100%" fxFlex.gt-sm="100%">
              <mat-paginator [pageSizeOptions]="[10, 50, 100]"></mat-paginator>
            </div>
        </div>
        <div class="loading">
            <div [hidden]="!loading">
                <mat-progress-bar mode="indeterminate"></mat-progress-bar>
            </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .header {
      min-height: 45px;
      padding: 5px 8px 0;
    }

    .mat-paginator, .mat-paginator-page-size .mat-select-trigger {
      font-size: 12px;
    }

    .mat-form-field {
      font-size: 14px;
      width: 100%;
    }

    .spacer {
      flex: 1 1 auto;
    }

    button.chip {
      margin-left: 4px;
    }

    .container {
      display: flex;
      flex-direction: column;
      max-height: 830px;
      min-width: 300px;
    }

    .mat-table {
      overflow: auto;
      max-height: 740px;
    }

    .mat-column-select {
      overflow: visible;
    }

    .mat-header-cell.mat-sort-header-sorted {
      color: black;
    }
  `]
})
export class ReadUserComponent implements OnInit, AfterViewInit {

  displayedColumns = ['firstname', 'lastname', 'email', 'birthdate', 'roles', 'crudOptions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  loading: boolean = false;
  cont: number = 0;
  
  constructor(
    private apollo: Apollo
  ) {
    this.dataSource = new MatTableDataSource([]);   
    
   }

  ngOnInit() {
    this.loading = true;
    this.apollo.watchQuery<any>({
      query: users,
      fetchPolicy: 'network-only',
    })
      .valueChanges
      .subscribe(({data}) => {
        this.loading = data.loading;
        this.dataSource.data = data.users;
      });
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

