import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import * as Chart from 'chart.js';
import { IExercise } from '@app/core/models/exercise.model';

const exercises = gql`
  query exercises {
    exercises {
      points
    }
  }
`;

@Component({
  selector: 'app-exercise-user',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="80%" fxFlex.xs="100%" fxFlex.gt-sm="80%">
        <mat-card class="card">
          <mat-card-header >
          </mat-card-header>
          <mat-card-content>
            <canvas #myChart></canvas>
          </mat-card-content>
          <mat-card-actions>            
          </mat-card-actions>
        </mat-card>        
      </div>
    </div>    
  `,
  styles: []
})
export class ExerciseUserComponent implements OnInit, AfterViewInit {
  
  loading: boolean = false;

  exercise: IExercise;

  @ViewChild('myChart') Chart: ElementRef;

  constructor(
    private apollo: Apollo,
  ) { }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: exercises
    })
      .valueChanges
      .subscribe(({data}) => {
        this.exercise = data;
        console.log(data);
        this.loading = data.loading;
      });
  }

  ngAfterViewInit(): void {
    const ctx = this.Chart.nativeElement.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['fsdf', 'adf'],
        datasets: [
          {
            label: 'Ejercicios',
            backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9'],
            data: [1, 2, 3, 4, 0, 5]
          }
        ]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: 'Ejercios por usuario'
        }
      }
    });   
  }
}
