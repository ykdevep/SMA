import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { IExercise } from '@app/core/models/exercise.model';

const exercises = gql`
  query exercises {
    exercises {
      attention {
        name
      }
      dificulty {
        name
      }
      hits
      howlers
      omit
      errors
      points
      time
      createdOn
    }
  }
`;

@Component({
  selector: 'app-result',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="98%" fxFlex.xs="100%" fxFlex.gt-sm="98%">

        <h2>Resultados</h2>

        <mat-tab-group class="tab-group">
          <mat-tab label="Selectiva">
            <div *ngIf="exerciseSelectiva.length > 0">
              <h2 mat-menu-item >Detección de números grandes y chicos</h2>
              <mat-grid-list cols="8" rowHeight="2:1">  

                <mat-grid-tile>Fecha</mat-grid-tile>
                <mat-grid-tile>Nivel</mat-grid-tile>  
                <mat-grid-tile>Correctos</mat-grid-tile>  
                <mat-grid-tile>Omitidos</mat-grid-tile>  
                <mat-grid-tile>Equivocaciones</mat-grid-tile> 
                <mat-grid-tile>Errores</mat-grid-tile>
                <mat-grid-tile>Puntos</mat-grid-tile>
                <mat-grid-tile>Tiempo</mat-grid-tile>               

              </mat-grid-list>
              
              <mat-grid-list cols="8" rowHeight="2:1" *ngFor="let exercise of exerciseSelectiva">              
                <mat-grid-tile>{{exercise.createdOn | date}}</mat-grid-tile> 
                <mat-grid-tile>{{exercise.dificulty.name}}</mat-grid-tile>               
                <mat-grid-tile>{{exercise.hits}}</mat-grid-tile>
                <mat-grid-tile>{{exercise.omit}}</mat-grid-tile>
                <mat-grid-tile>{{exercise.howlers}}</mat-grid-tile>    
                <mat-grid-tile>{{exercise.errors}}</mat-grid-tile>
                <mat-grid-tile>{{exercise.points}}</mat-grid-tile>
                <mat-grid-tile>{{exercise.time / 100 | number : "1.1-2"}} segundos</mat-grid-tile>
              </mat-grid-list>
            </div>

          </mat-tab>
          <mat-tab label="Sostenida">
            <div *ngIf="exerciseSostenida.length > 0">
              <h2 mat-menu-item >Rastreo Flechas</h2>
              
              <mat-grid-list cols="8" rowHeight="2:1">  
                <mat-grid-tile>Fecha</mat-grid-tile>
                <mat-grid-tile>Nivel</mat-grid-tile>  
                <mat-grid-tile>Correctos</mat-grid-tile>  
                <mat-grid-tile>Omitidos</mat-grid-tile>  
                <mat-grid-tile>Equivocaciones</mat-grid-tile> 
                <mat-grid-tile>Errores</mat-grid-tile>
                <mat-grid-tile>Puntos</mat-grid-tile>
                <mat-grid-tile>Tiempo</mat-grid-tile>
              </mat-grid-list>
              
              <mat-grid-list cols="8" rowHeight="2:1" *ngFor="let exercise of exerciseSostenida">              
                <mat-grid-tile>{{exercise.createdOn | date}}</mat-grid-tile> 
                <mat-grid-tile>{{exercise.dificulty.name}}</mat-grid-tile>               
                <mat-grid-tile>{{exercise.hits}}</mat-grid-tile>
                <mat-grid-tile>{{exercise.omit}}</mat-grid-tile>
                <mat-grid-tile>{{exercise.howlers}}</mat-grid-tile>    
                <mat-grid-tile>{{exercise.errors}}</mat-grid-tile>
                <mat-grid-tile>{{exercise.points}}</mat-grid-tile>
                <mat-grid-tile>{{exercise.time / 100 | number : "1.1-2"}} segundos</mat-grid-tile>
              </mat-grid-list>
            </div>

          </mat-tab>
          <mat-tab label="Enfocada">
            <h2 mat-menu-item >Direccionalidad</h2>
            
            <div *ngIf="exerciseEnfocada.length > 0">
              
              <mat-grid-list cols="8" rowHeight="2:1">  
                <mat-grid-tile>Fecha</mat-grid-tile>
                <mat-grid-tile>Nivel</mat-grid-tile>  
                <mat-grid-tile>Correctos</mat-grid-tile>  
                <mat-grid-tile>Omitidos</mat-grid-tile>  
                <mat-grid-tile>Equivocaciones</mat-grid-tile> 
                <mat-grid-tile>Errores</mat-grid-tile>
                <mat-grid-tile>Puntos</mat-grid-tile>
                <mat-grid-tile>Tiempo</mat-grid-tile>
              </mat-grid-list>
              
              <mat-grid-list cols="8" rowHeight="2:1" *ngFor="let exercise of exerciseEnfocada">              
                <mat-grid-tile>{{exercise.createdOn | date}}</mat-grid-tile> 
                <mat-grid-tile>{{exercise.dificulty.name}}</mat-grid-tile>               
                <mat-grid-tile> {{exercise.hits}}</mat-grid-tile>
                <mat-grid-tile> {{exercise.omit}}</mat-grid-tile>
                <mat-grid-tile> {{exercise.howlers}}</mat-grid-tile>    
                <mat-grid-tile> {{exercise.errors}}</mat-grid-tile>
                <mat-grid-tile> {{exercise.points}}</mat-grid-tile>
                <mat-grid-tile> {{exercise.time / 1000 | number : "1.1-2"}} segundos</mat-grid-tile>
              </mat-grid-list>
            </div>
            
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: []
})
export class ResultComponent implements OnInit {

  loading: boolean = false;

  exerciseSelectiva: IExercise[] = [];
  exerciseSostenida: IExercise[] = [];
  exerciseEnfocada: IExercise[] = [];

  constructor(
    private apollo: Apollo,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: exercises
    })
      .valueChanges
      .subscribe(({data}) => {
        this.exerciseSelectiva = data.exercises.filter(p => p.attention.name == "selectiva");
        this.exerciseSostenida = data.exercises.filter(p => p.attention.name == "sostenida");
        this.exerciseEnfocada = data.exercises.filter(p => p.attention.name == "enfocada");

        this.loading = data.loading;
      });
    
  }

}
