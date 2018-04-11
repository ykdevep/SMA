import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IQExercise } from '@app/core/models/initial.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'detention-visual',
  template: `
    
    <h2>Precione los botones cuya figura sea igual a la figura resaltada, se mostrará por 3 segundos, para realizar el ejercicio dispondrá de 60 segundos. </h2>
    <div [hidden]="hide"><mat-icon >{{this.question.name}}</mat-icon></div>
    <button mat-raised-button color="accent" [disabled]="flag" (click)="startExercise()"><mat-icon>alarm</mat-icon>Comenzar</button>
    <div class="container" fxLayout="row" fxLayout.xs="row" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div fxFlex="60%" fxFlex.xs="100%" fxFlex.gt-sm="60%">

        <div class="item" [hidden]="!flag">        

          <form [formGroup]="detentionVisualForm" #f="ngForm">       
            <input formControlName="flagControl" type="hidden">          

            <mat-grid-list cols="6" rowHeight="4:1" >

              <mat-grid-tile *ngFor="let ico of data">
                <button hideButton mat-raised-button [disabled]="finish" (click)="validQuestion(ico)"><mat-icon>{{ico}}</mat-icon></button>
              </mat-grid-tile>          
                                
            </mat-grid-list>

          </form>
        </div>
        <button mat-raised-button color="primary" [disabled]="!enabled" matStepperNext (click)="saveAndNext()" matStepperNext>
              <mat-icon>arrow_downward</mat-icon>Guardar y Siguiente
        </button>
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
export class DetentionVisualComponent implements OnInit {

  @Input() detentionVisualForm: FormGroup;

  @Output() save = new EventEmitter();

  visualDetention: IQExercise;

  start: boolean = false;
  finish: boolean = false;
  enabled: boolean = false;
  hide: boolean = false;

  icons: string [] = [
    "account_box",
    "person",
    "account_circle",
    "android",
    "face",
    "grade",
    "record_voice_over",
    "supervisor_account",
    "people_outline",
    "people",
    "sentiment_dissatisfied",
    "sentiment_neutral",
    "sentiment_satisfied",
    "sentiment_very_dissatisfied",
    "sentiment_very_satisfied",
  ];

  question: any = {
    name: "account_box",
    value: "account_box",
  };

  data: string[] = [];

  startTime: number;
  flag: boolean = false;

  constructor(

  ) { }

  ngOnInit() {

    const q = this.icons[Math.round(Math.random() * (this.icons.length -1))];

    this.question = {
      name: q,
      value: q,
    };

    this.startTime = new Date().getTime();

    this.visualDetention = {
      errors: 0,
      hits: 0,
      howlers: 0,
      level: 2,
      name: "Detención Visual",
      omit: 0,
      points: 0,
      question: [this.question],
      response: [],
      time: 0,
    };    

    for (let i = 0; i < this.icons.length * 4; i++) {

      let question = this.icons[Math.round(Math.random() * (this.icons.length -1))];
      this.data.push(question);

      if (question == this.question.name) {
        this.visualDetention.omit += 1;
      }

    }


  }

  startExercise() {
    setTimeout(() => {
      this.hide = true;     
    }, 3000);

    this.flag = true;
    this.enabled = true;
    setTimeout(() => {
      this.finish = true;
      this.detentionVisualForm.setValue({flagControl: "true"});   
    }, 60000);
  }


  validQuestion(value: string): void {

    if (this.question.value == value) {
      this.visualDetention.response.push(
        {
          eval: true,
          value: value,          
        }
      );
      this.visualDetention.hits += 1;
      this.visualDetention.omit -= 1;
    } else {
      this.visualDetention.response.push(
        {
          eval: false,
          value: value,          
        }
      );
      this.visualDetention.howlers += 1;
      
    }
    this.visualDetention.errors = this.visualDetention.omit + this.visualDetention.howlers;
    this.save.emit(this.visualDetention);
  }

  saveAndNext(): void {
    this.finish = true;
    this.enabled = false;
    this.detentionVisualForm.setValue({flagControl: "true"});   
    this.save.emit(this.visualDetention);
  }

}
