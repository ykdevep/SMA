import { Component, OnInit, Input, AfterContentChecked, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms/';
import { IQExercise } from '@app/core/models/initial.model';


@Component({
  selector: 'orientation',
  template: `
  <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
  <div fxFlex="40%" fxFlex.xs="30%" fxFlex.gt-sm="30%">
    
      <form [formGroup]="orientationForm" #f="ngForm" (ngSubmit)="saveForm()">  
      
        <mat-form-field class="full-width">
            <mat-select placeholder="¿En qué día estamos?" formControlName="day">
                <mat-option *ngFor="let day of days" [value]="day.value">{{day.name}}</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field class="full-width">
            <mat-select placeholder="¿En qué mes estamos?" formControlName="month">
                <mat-option *ngFor="let month of months" [value]="month.value">{{month.name}}</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field class="full-width">
            <input type="number" required matInput placeholder="¿En qué año estamos" formControlName="year">
        </mat-form-field>

        <mat-form-field class="full-width">
            <input type="text" required matInput placeholder="¿En qué ciudad estamos" formControlName="city">
        </mat-form-field>

        <mat-form-field class="full-width">
            <input type="text" required matInput placeholder="¿En qué lugar estamos" formControlName="place">
        </mat-form-field>
        
        <mat-form-field class="full-width">
            <input type="number" required matInput placeholder="¿Cuántos años tiene Usted?" formControlName="age">
        </mat-form-field>

        <div class="button-action">                
            <button mat-raised-button color="accent" matStepperNext [disabled]="!orientationForm.valid" type="submit"><mat-icon>arrow_downward</mat-icon>Guardar y Siguiente</button>
        </div>
    </form>
  </div>
</div>

`,
  styles: [`
    button {
      margin-left: 10px;
    }

    .full-width {
      width: 100%;
    }

    .half-width{
      width: 49%;
    }

    .small-width {
      width: 30%;
    }
`]
})
export class OrientationComponent implements OnInit, AfterContentChecked {
  
  @Input() orientationForm: FormGroup;
  @Input() age: number;

  orientationExercise: IQExercise;

  @Output() save = new EventEmitter();


  days: any[] = [
    {
      name: "Domingo",
      value: 1,
    },
    {
      name: "Lunes",
      value: 2,
    },
    {
      name: "Martes",
      value: 3,
    },
    {
      name: "Miércoles",
      value: 4,
    },
    {
      name: "Jueves",
      value: 5,
    },
    {
      name: "Viernes",
      value: 6,
    },
    {
      name: "Sábado",
      value: 7,
    }
  ];

  months: any[] = [
    {
      name: "Enero",
      value: 1,
    },
    {
      name: "Febrero",
      value: 2,
    },
    {
      name: "Marzo",
      value: 3,
    },
    {
      name: "Abril",
      value: 4,
    },
    {
      name: "Mayo",
      value: 5,
    },
    {
      name: "Junio",
      value: 6,
    },
    {
      name: "Julio",
      value: 7,
    },
    {
      name: "Agosto",
      value: 8,
    },
    {
      name: "Septiembre",
      value: 9,
    },
    {
      name: "Octubre",
      value: 10,
    },
    {
      name: "Noviembre",
      value: 11,
    },
    {
      name: "Diciembre",
      value: 12
    },
  ];

  startExercise: number = new Date().getTime();

  constructor() { }

  ngOnInit() {
     
  }

  ngAfterContentChecked(): void {
    
    let question = [
      {
        name: "¿En qué día estamos?",
        value: new Date().getDay()+1,
      },
      {
        name: "¿En qué mes estamos?",
        value: new Date().getMonth()+1,
      },
      {
        name: "¿En qué año estamos?",
        value: new Date().getFullYear(),
      },
      {
        name: "¿En qué lugar estamos?",
        value: "",
      },
      {
        name: "¿En qué ciudad estamos?",
        value: "",
      },
      {
        name: "¿Cuántos años tiene Usted?",
        value: this.age,
      }
      
    ];

    let response = [
      {
        eval: "false",
        value: ""
      },
      {
        eval: "false",
        value: ""
      },
      {
        eval: "false",
        value: ""
      },
      {
        eval: "true",
        value: ""
      },
      {
        eval: "true",
        value: ""
      },
      {
        eval: "false",
        value: ""
      },
      
    ];

    this.orientationExercise = {
      level: 1,
      name: "Orientación",
      time: 0,
      errors: 0,
      hits: 0,
      howlers: 0,
      omit: 4,
      points: 0,
      question: question,
      response: response,
    };
    this.onChanges();
  }

  onChanges(): void {
    this.orientationForm.valueChanges.subscribe(value => {

      let omit = 4;
      let points = 0;
      let hits = 0;
      let errors = 0;

      if (value.day) {
        if (this.orientationExercise.question[0].value == value.day) {
          omit -= 1;
          points += 1;
          hits +=1;
          this.orientationExercise.response[0].eval = "true";
        } else {
          errors += 1;
          omit -= 1;
        }
        this.orientationExercise.response[0].value = value.day;
      }

      if (value.month) {
        if (this.orientationExercise.question[1].value == value.month) {
          omit -= 1;
          points += 1;
          hits +=1;
          this.orientationExercise.response[1].eval = "true";
        } else {
          errors += 1;
          omit -= 1;
        }
        this.orientationExercise.response[1].value = value.month;
      }

      if (value.year) {
        if (this.orientationExercise.question[2].value == value.year) {
          omit -= 1;
          points += 1;
          hits +=1;
          this.orientationExercise.response[2].eval = "true";
        } else {
          errors += 1;
          omit -= 1;
        }
        this.orientationExercise.response[2].value = value.year;
      }

      if (value.city) {
        this.orientationExercise.response[3].value = value.city;
      }

      if (value.place) {
        this.orientationExercise.response[4].value = value.place;
      }

      if (value.age) {
        if (this.orientationExercise.question[5].value == value.age) {
          omit -= 1;
          points += 1;
          hits +=1;
          this.orientationExercise.response[5].eval = "true";
        } else {
          errors += 1;
          omit -= 1;
        }        
        this.orientationExercise.response[5].value = value.age;
      }

      this.orientationExercise.time = new Date().getTime() - this.startExercise;

      this.orientationExercise.errors = errors;
      this.orientationExercise.omit = omit;
      this.orientationExercise.hits = hits;
      this.orientationExercise.points = points;

      this.save.emit(this.orientationExercise);

    });
  }

  saveForm(): void {
    if (this.orientationForm.valid) {    
      
      this.orientationExercise.time = new Date().getTime() - this.startExercise;
      this.orientationForm.disable();

      this.save.emit(this.orientationExercise);
    }
  }

}
