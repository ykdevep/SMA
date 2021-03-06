import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evocation-function',
  template: `
    <div class="item">
    </div>
    <hr />
    <div class="stepper">
      <button mat-raised-button matStepperNext>Siguiente <mat-icon>arrow_downward</mat-icon></button>
    </div>
  `,
  styles: [`
    .item {
      min-height: 500px;
      height: 100%;
    }
    .stepper {
      height: 100%;
    }

    button {
      margin-left: 10px;
    }
  `]
})
export class EvocationFunctionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
