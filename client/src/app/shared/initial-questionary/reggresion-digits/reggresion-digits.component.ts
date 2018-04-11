import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IQExercise } from '@app/core/models/initial.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'reggresion-digits',
  template: `
    <h4>Se mostrarán varias series de números, repíta cada serie en orden regresivo. Por ejemplo, si se muestra 6-9 usted escribe 9-6.</h4>
    <button mat-raised-button color="accent" [disabled]="start" (click)="startExercise()"><mat-icon>alarm</mat-icon>Comenzar</button>
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div fxFlex="60%" fxFlex.xs="100%" fxFlex.gt-sm="60%">
        
          <form [formGroup]="regressionDigitsForm" #f="ngForm">       
            <input formControlName="flagControl" type="hidden">
            <div class="item">
              <div class="question" [hidden]="show">
                <h1>{{question}}</h1>
              </div>

              <div [hidden]="!flag">
                <mat-grid-list cols="2">
                  <mat-grid-tile>
                    <mat-form-field class="full-width">
                      <input matInput type="text" [(ngModel)]="response" placeholder="Introduce la serie en orden regresivo" formControlName="response">
                    </mat-form-field>
                  </mat-grid-tile>
                  <mat-grid-tile>
                    <button mat-raised-button [disabled]="!show" (click)="saveAndNext()">Guardar y Siguiente</button>
                  </mat-grid-tile>
                </mat-grid-list>               
              </div>
              
            </div>
            <div class="button-action">                
                <button mat-raised-button color="accent" [disabled]="!finish" (click)="saveForm()" matStepperNext><mat-icon>arrow_downward</mat-icon>Guardar y Siguiente</button>
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
export class ReggresionDigitsComponent implements OnInit {

  @Input() regressionDigitsForm: FormGroup;
  
  regressionDigits: IQExercise;
  initialTime: Date;

  flag: boolean = false;
  start: boolean = false;
  finish: boolean = false;
  show: boolean = false;  

  series: number = 0;
  cont: number = 0;  
  
  question: string = "";
  response: string = ""; 

  @Output() save = new EventEmitter();

  data : any = [
    [
      {
        question: "2-4",
        response: "4-2",
      },
      {
        question: "3-9-5",
        response: "5-9-3",
      },
      {
        question: "1-3-6-9",
        response: "9-6-3-1",
      },
      {
        question: "3-8-1-5-9",
        response: "9-5-1-8-3",
      },
      {
        question: "2-4-8-9-1-6",
        response: "6-1-9-8-4-2",
      }
    ],
    [
      {
        question: "3-9",
        response: "9-3",
      },
      {
        question: "1-9-0",
        response: "0-9-1",
      },
      {
        question: "2-5-7-9",
        response: "9-7-5-2",
      },
      {
        question: "1-7-0-2-4",
        response: "4-2-0-7-1",
      },
      {
        question: "9-4-2-8-7-1",
        response: "1-7-8-2-4-9",
      }
    ],
  ];

  constructor() {
    this.initialTime = new Date();
  }

  ngOnInit(): void {

    this.regressionDigits = {
      errors: 0,
      omit: 0,
      hits: 0,
      howlers: 0,
      level: 2,
      name: "Dígitos en regresión",
      points: 0,
      question: [],
      response: [],
      time: 0,
    }
    
  }

  startExercise(): void {
    this.start = true;
    this.flag = true;    

    this.question = this.data[this.series][this.cont].question;

    setTimeout(() => {
      this.show = true;
     
    }, (this.cont + 2) * 1000);

  }

  saveAndNext(): void {
    if (this.response == this.data[this.series][this.cont].response) {
      this.regressionDigits.question.push({name: this.question, value: this.cont});
      this.regressionDigits.response.push({eval: true, value: this.response});
      this.regressionDigits.points += 1;
      this.regressionDigits.hits += 1;
      this.cont += 1;    
    } else {
      if (this.response == "") {
        this.regressionDigits.omit +=1;
      } else {
        this.regressionDigits.howlers += 1;
      }
      this.regressionDigits.question.push({name: this.question, value: this.cont});
      this.regressionDigits.response.push({eval: false, value: this.response});
      
      this.series += 1;  
    }    

    if (this.series > 1 || this.cont >= 5) {
      this.regressionDigitsForm.disable();
      this.finish = true;
    
    } else {
      
      this.regressionDigits.time = (new Date().getTime() - this.initialTime.getTime());
      
      this.flag = true;
      this.show = false;      

      this.question = this.data[this.series][this.cont].question;      
      this.response = "";

      setTimeout(() => {
        this.show = true;
      
      }, (this.cont + 2) * 1000);
    }
    this.regressionDigits.errors = this.regressionDigits.omit + this.regressionDigits.howlers;
    this.save.emit(this.regressionDigits);
  }

  saveForm(): void {    
    this.regressionDigits.errors = this.regressionDigits.errors + this.regressionDigits.howlers;
    this.save.emit(this.regressionDigits);
  }

}
