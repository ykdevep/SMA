import { Component, OnInit, Input } from '@angular/core';
import { IExercise, IQuestion } from '@app/core/models/exercise.model';

@Component({
  selector: 'number-size',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="row" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="100%" fxFlex.xs="100%" fxFlex.gt-sm="{{exercise.dificulty.value *10}}%">
        <h3> Precione los botones cuya número sea 
          <span *ngFor="let question of exercise.question;">{{question.name}}</span>
        </h3>
        <mat-grid-list cols="{{exercise.dificulty.value}}" rowHeight="2:1" gutterSize="15px">
          <mat-grid-tile *ngFor="let exercise of exercise.data; let i = index">
            <button mat-raised-button hideButton (click)="pushData(i, exercise)" [ngSwitch]="exercise.value">
              <span *ngSwitchCase="'1_p'" class="small">1</span>
              <span *ngSwitchCase="'1_G'" class="big">1</span>
              <span *ngSwitchCase="'2_p'" class="small">2</span>
              <span *ngSwitchCase="'2_G'" class="big">2</span>
              <span *ngSwitchCase="'3_p'" class="small">3</span>
              <span *ngSwitchCase="'3_G'" class="big">3</span>
              <span *ngSwitchCase="'4'" class="sm">.</span>
            </button>
          </mat-grid-tile>
        </mat-grid-list>              
      </div>
    </div>
  `,
  styles: [`
    .big {
      font-size: 30px;
    }

    .small {
      font-size: 20px;
    }

    .sm {
      font-size: 1px;
    }
  `]
})
export class NumberSizeComponent implements OnInit {

  @Input() exercise: IExercise;

  initialTime: Date = new Date();

  constructor() { }

  ngOnInit() {
    this.exercise.time = (new Date().getTime() - this.initialTime.getTime());
  }

  pushData(index: number, question: IQuestion): void {

    let isValid = this.exercise.question.find(q => question.value.includes(q.value));

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

