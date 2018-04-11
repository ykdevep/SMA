import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { IQExercise } from '@app/core/models/initial.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'verbal-memory',
  template: `
  <h4>Marque las palabras que se mostraran por 5 segundos</h4>
  <div class="container" fxLayout="row" fxLayout.xs="row" fxLayoutAlign="start center" fxLayoutGap="0" fxLayoutGap.xs="0">
    <div class="item" fxFlex="100%" fxFlex.xs="100%" fxFlex.gt-sm="100%">
      <form [formGroup]="verbalMemoryForm" #f="ngForm">       
        <div class="item">
          <input formControlName="flagControl" type="hidden">

          <mat-grid-list cols="4" rowHeight="6:1" >

            <mat-grid-tile *ngFor="let word of otherWords">
              <mat-checkbox formControlName="checkbokControl" (change)="saveWord(word, $event)">{{word.name}}</mat-checkbox>
            </mat-grid-tile>         
            
            <mat-grid-tile>         
              <button mat-raised-button [disabled]="!hide || index > 3" (click)="change()">Guardar y Siguiente</button>
            </mat-grid-tile>         
                              
          </mat-grid-list>

          <div [hidden]="hide"> 
            <h1>{{text}}</h1>
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
export class VerbalMemoryComponent implements OnInit, AfterViewInit {
  
  @Input() verbalMemoryForm: FormGroup;
  @Output() save = new EventEmitter();

  verbalMemory: IQExercise;
  startTime: number = 0;
  points: number = 0;

  text: string[];

  index: number = 1;
  finish: boolean = false;
  hide: boolean = false;

  words: any[] = [
    {
      name: "gato",
      value: 1,      
    },
    {
      name: "pera",
      value: 1,      
    },
    {
      name: "mano",
      value: 1,      
    },
    {
      name: "fresa",
      value: 1,      
    },
    {
      name: "vaca",
      value: 1,      
    },
    {
      name: "codo",
      value: 1,      
    },
    {
      name: "perro",
      value: 2,      
    },
    {
      name: "naranja",
      value: 2,      
    },
    {
      name: "boca",
      value: 2,      
    },
    {
      name: "mango",
      value: 2,      
    },
    {
      name: "pierna",
      value: 2,      
    },
    {
      name: "abeja",
      value: 2,      
    },
    {
      name: "caballo",
      value: 3,      
    },
    {
      name: "manzana",
      value: 3,      
    },
    {
      name: "ojo",
      value: 3,      
    },
    {
      name: "cebolla",
      value: 3,      
    },
    {
      name: "paloma",
      value: 3,      
    },
    {
      name: "árbol",
      value: 3,      
    },    
  ];

  otherWords: any[];

  constructor() { }

  ngOnInit() {
    this.startTime = new Date().getTime();

    this.verbalMemory = {
      errors: 0,
      hits: 0,
      howlers: 0,
      level: 3,
      name: "Codificación (Memoria Verbal)",
      omit: 18,
      points: 0,
      question: this.words,
      response: [],
      time: 0,
    };

    this.text = this.words
                  .filter(p => p.value == this.index)
                  .map(p => p.name);

    this.otherWords = this.words.sort();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.hide = true;
    }, 5000);    
  }

  saveWord(word: any, $event): void {

    if ($event.checked) {
      if (this.words.filter(p => (p.value == this.index && p.name == word.name)).length > 0) {
        this.verbalMemory.hits += 1;
        this.points += 1;
        this.verbalMemory.omit -= 1;
        this.verbalMemory.response.push({
          eval: "true",
          value: word.name,
        });
      } else {
        this.verbalMemory.response.push({
          eval: "false",
          value: word.name,
        });
        this.verbalMemory.howlers +=1;
      }
    } else {
      if (this.words.filter(p => (p.value == this.index && p.name == word.name)).length > 0) {        
        this.verbalMemory.hits -= 1;
        this.points -= 1;
        this.verbalMemory.omit += 1;        
      } else {
        this.verbalMemory.howlers -=1;        
      }
      this.verbalMemory.response.push({
        eval: "false",
        value: word.name,
      });
    }   
  }

  change(): void {   
    this.index ++; 
    if (this.index > 3) {      
      this.finish = true;
      this.verbalMemoryForm.disable();
    } else {
      this.verbalMemoryForm.reset();
      this.text = this.words
                  .filter(p => p.value == this.index)
                  .map(p => p.name);
      this.hide = false;
      
      setTimeout(() => {
        this.hide = true;
      }, 5000);    
      
    }
    
  }

  saveForm(): void {    
    this.verbalMemory.time = new Date().getTime() - this.startTime;
    this.verbalMemory.errors = this.verbalMemory.omit + this.verbalMemory.howlers;
    this.verbalMemory.points = Math.round(this.points / 3);
    this.save.emit(this.verbalMemory);      
  }

}
