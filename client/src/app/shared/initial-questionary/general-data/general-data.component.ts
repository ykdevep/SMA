import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators} from '@angular/forms';

import { User } from '@app/core/models/user.model';
import { IGeneralData } from '@app/core/models/initial.model';

@Component({
  selector: 'general-data',
  template: `
    <ng-template matStepLabel>Datos generales y antecedentes médicos</ng-template>
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div fxFlex="40%" fxFlex.xs="30%" fxFlex.gt-sm="30%">
        
          <form [formGroup]="generalDataForm" #f="ngForm" (ngSubmit)="saveForm()">           

            <div class="full-width">
                <mat-grid-list cols="2" rowHeight="60px">
                  <mat-grid-tile><h2>{{user.firstname}} {{user.lastname}} </h2></mat-grid-tile>
                </mat-grid-list>

                <mat-grid-list cols="2" rowHeight="60px">
                  <mat-grid-tile><h3>Edad: {{age}}</h3></mat-grid-tile>
                  <mat-grid-tile><h3>Hoy: {{today | date}}</h3> </mat-grid-tile>
                </mat-grid-list>
                
            </div>
            
            <mat-form-field class="full-width">
                <mat-select placeholder="Sexo" formControlName="sex">
                    <mat-option *ngFor="let sex of sexs" [value]="sex">{{sex}}</mat-option>
                </mat-select>
            </mat-form-field>

            <mat-form-field class="full-width">
                <mat-select placeholder="Lateralidad" formControlName="lateral">
                    <mat-option *ngFor="let l of lateral" [value]="l">{{l}}</mat-option>
                </mat-select>
            </mat-form-field>

            <mat-form-field class="full-width">
                <mat-select placeholder="Grado Escolar" formControlName="scholarGrade">
                    <mat-option *ngFor="let grade of scholarGrade" [value]="grade">{{grade}}</mat-option>
                </mat-select>
            </mat-form-field>

            <mat-form-field class="full-width">
                <mat-select placeholder="Enfermedades" formControlName="desease" multiple>
                    <mat-option *ngFor="let desease of deseases" [value]="desease">{{desease}}</mat-option>
                </mat-select>
            </mat-form-field>

            <mat-form-field class="full-width">
                <input type="text" required matInput placeholder="Ocupación" formControlName="job">
            </mat-form-field>

            <div class="button-action">                
                <button mat-raised-button color="accent" matStepperNext [disabled]="!generalDataForm.valid" type="submit"><mat-icon>arrow_downward</mat-icon>Guardar y Comenzar</button>
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
export class GeneralDataComponent implements OnInit {
  
  sexs = ['Masculino', 'Femenino'];
  lateral = ['Derecho', 'Izquierdo'];
  scholarGrade = ['Cero escolaridad', 'Primaria', 'Bachillerato', 'Preparatoria', 'Universitario', 'Posgrado'];

  deseases = ['Hipertensión Arterial', 'Enfermedades pulmonares',
             'Alcholismo', 'Farmacodependencia', 'Disminución de agudeza visual o auditiva',
             'Traumatismos craneoencefálicos', 'Diabetes',
             'Tiroidismo', 'Accidentes cerebrovasculares',
             'Otras'];

  @Input() generalDataForm: FormGroup;
  @Input() user: any;
  @Input() age: number;
  @Output() save = new EventEmitter();

  generalData: IGeneralData;

  today: Date;  

  constructor() { 
    this.today = new Date();    
  }

  ngOnInit() {
    this.onChanges();         
  }

  onChanges(): void {
    this.generalDataForm.valueChanges.subscribe(value => {
      this.generalData = value;
      this.save.emit(this.generalData);
    });
  }

  saveForm(): void {
    if (this.generalDataForm.valid) {
      this.generalData = {
        desease: this.generalDataForm.value.desease,
        job: this.generalDataForm.value.job,
        lateral: this.generalDataForm.value.lateral,
        scholarGrade: this.generalDataForm.value.scholarGrade,
        sex: this.generalDataForm.value.sex,
      }
      this.generalDataForm.disable();
    } 
    this.save.emit(this.generalData);
  }

}
