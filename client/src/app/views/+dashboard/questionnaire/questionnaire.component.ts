import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionnaire',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="90%" fxFlex.xs="100%" fxFlex.gt-sm="90%">
        <h2>Cuestionarios</h2>
        <hr />
        <button mat-raised-button color="primary"  [routerLink]="['/questionary', 'initial']"><h3>Inicial</h3></button>
      </div>
    </div>
  `,
  styles: []
})
export class QuestionnaireComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
