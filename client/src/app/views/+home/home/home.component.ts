import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `        
    <div class="container" fxLayout fxLayout.xs="column" fxLayoutAlign="center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="80%">
        <h1>Acerca del Proyecto</h1>

        <h2>Una explicación aqui con una imagen inicial.</h2>
        
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  panCount: number = 0;
  pressCount: number = 0;
  longpressCount: number = 0;
  swipeCount: number = 0;
  slideCount: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
