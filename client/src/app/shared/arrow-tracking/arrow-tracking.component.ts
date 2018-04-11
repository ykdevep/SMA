import { Component, OnInit , Input} from '@angular/core';

import { IExercise, IQuestion } from '@app/core/models/exercise.model';

@Component({
  selector: 'arrow-tracking',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="row" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="100%" fxFlex.xs="100%" fxFlex.gt-sm="{{exercise.dificulty.value *10}}%">
        <h3>Precione los botones cuya flecha apunte hacia 
          <span *ngFor="let question of exercise.question;">| {{question.name}} |</span>
        </h3>
        <mat-grid-list cols="{{exercise.dificulty.value}}" rowHeight="2:1" gutterSize="5px">
          <mat-grid-tile *ngFor="let exercise of exercise.data; let i = index"><button mat-raised-button (click)="pushData(i, exercise)"><mat-icon>{{exercise.value}}</mat-icon></button></mat-grid-tile>
        </mat-grid-list>              
      </div>
    </div>
  `,
  styles: []
})
export class ArrowTrackingComponent implements OnInit {
  
  @Input() exercise: IExercise;

  initialTime: Date = new Date();

  constructor() { }

  ngOnInit() {
    this.exercise.time = (new Date().getTime() - this.initialTime.getTime());
  }

  pushData(index: number, question: IQuestion): void {

    let isValid = this.exercise.question.find(q => q.name == question.name);

    if (isValid) {
      let flag = this.exercise.response.find(p => p.position == index);

      if (flag) {
        this.exercise.response.push({ eval: false, position: index });
        this.exercise.howlers += 1;
      } else {
        this.exercise.response.push({ eval: true, position: index });
        this.exercise.hits += 1;
        this.exercise.omit -= 1;
      }
    } else {
      this.exercise.response.push({ eval: false, position: index });
      this.exercise.howlers += 1;
    }

    this.exercise.errors = this.exercise.omit + this.exercise.howlers;    
    this.exercise.time = (new Date().getTime() - this.initialTime.getTime());     

  }

}
