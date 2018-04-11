import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IQExercise } from '@app/core/models/initial.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'digits',
  template: `
    <h4>A 20 restále 3, y repita el proceso con el resultado, después de 5 iteraciones, terminar. Ejemplo respuesta: 19-16-13-9-6</h4>
    <div class="container" fxLayout="row" fxLayout.xs="row" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="100%" fxFlex.xs="100%" fxFlex.gt-sm="100%">
        <form [formGroup]="digitsForm" #f="ngForm">       
          <div class="item">
            <mat-form-field class="full-width">
              <input matInput type="text" placeholder="20-3" formControlName="response">
            </mat-form-field>          
          </div>
          <div class="button-action">                
              <button mat-raised-button color="accent" [disabled]="!digitsForm.valid || digitsForm.disabled" (click)="saveForm()" matStepperNext><mat-icon>arrow_downward</mat-icon>Guardar y Siguiente</button>
          </div>        
        </form>        
      </div>
    </div>
  `,
  styles: [`
    .full-width {
      width: 100%;
    }
    .item {
      min-height: 450px;
      height: 100%;
    }
    .question {
      height: 60px;
    }
    .stepper {
      height: 100%;
    }

    button {
      margin-left: 10px;
    }
  `]
})
export class DigitsComponent implements OnInit {

  @Input()digitsForm: FormGroup;
  @Output() save = new EventEmitter();

  digits: IQExercise;
  startTime: number = 0;

  constructor() {
    this.startTime = new Date().getTime();
  }

  ngOnInit() {
    this.onChanges();

    this.digits = {
      errors: 0,
      hits: 0,
      howlers: 0,
      level: 2,
      name: "20-3",
      omit: 0,
      points: 0,
      question: [{
        name: "20-3",
        value: "20-3"
      }],
      response: [],
      time: new Date().getTime() -this.startTime,
    };
  }

  onChanges(): void {
    this.digitsForm.valueChanges.subscribe(value => {      

      if (value.response) {
        let omit: number = 5;
        let hits: number = 0;
        let points: number = 0;
        let howlers: number = 0;

        let response = [];
        let numbers = value.response.split('-');

        let i = 1;

        for(let number of numbers) {
          if (20 - (3 * i) == number) {
            hits += 1;
            points += 1;
            omit -= 1;
            response.push({
              eval: "true",
              value: number,
            });
          } else {
            howlers += 1;
            response.push({
              eval: "false",
              value: number,
            });
          }

          if (i > 5) {
            break;
          }
          i++;         
        }
        
        this.digits.errors = omit + howlers;
        this.digits.omit = omit;
        this.digits.howlers = howlers;
        this.digits.hits = hits;
        this.digits.points = points;

        this.digits.response = response;
      }

      this.save.emit(this.digits);
    });
  }

  saveForm(): void {
    if(this.digitsForm.valid) {
      this.digitsForm.disable();
      this.save.emit(this.digits);      
    }
  }

}
