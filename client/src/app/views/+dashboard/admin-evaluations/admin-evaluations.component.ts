import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-evaluations',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="90%" fxFlex.xs="100%" fxFlex.gt-sm="90%">
        <h2>Administración de Evaluaciones</h2>
        <hr />
      </div>
    </div>
  `,
  styles: []
})
export class AdminEvaluationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
