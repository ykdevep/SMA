import { Component, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'chart-initial-questionary',
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
export class InitialQuestionaryComponent implements AfterViewInit  {

  @ViewChild('myChart') Chart: ElementRef;

  @Input() totalErrors: number;
  @Input() totalPoints: number;
  @Input() totalHits: number;
  @Input() totalOmits: number;
  @Input() totalHowlers: number;

  constructor() { }

  ngAfterViewInit() {

    const ctx = this.Chart.nativeElement.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Errores', 'Omiciones', 'Equivocaciones', 'Puntos', 'Aciertos'],
        datasets: [
          {
            label: 'Métricas',
            backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9'],
            data: [this.totalErrors, this.totalOmits, this.totalHowlers, this.totalPoints, this.totalHits, 0]
          }
        ]
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: 'Cuestionario Inicial'
        }
      }
    });   
  }

}
