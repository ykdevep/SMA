import { Component, OnInit } from '@angular/core';

import { environment as env } from '@env/environment';

@Component({
  selector: 'app-about',
  template: `
    <div class="container" fxLayout fxLayout.xs="column" fxLayoutAlign="center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="80%">
        <h1>Acerca de {{projectName}}</h1>
        <h2>Desarrollador frontend</h2>
        <h3><mat-icon>person</mat-icon>Ing. Enrique Alfonso Carmona</h3>
        <a href="mailto:eacarmona860920@gmail.com"><mat-icon>email</mat-icon>eacarmona860920@gmail.com</a>    
        <h2>Desarrollador frontend</h2>
        <h3><mat-icon>person</mat-icon>Ing. Enrique Alfonso Carmona</h3>
        <a href="mailto:eacarmona860920@gmail.com"><mat-icon>email</mat-icon>eacarmona860920@gmail.com</a>    
      </div>
    </div>
  `,
  styles: []
})
export class AboutComponent implements OnInit {

  projectName: string;

  constructor() { }

  ngOnInit() {
    this.projectName = env.appName;
  }

}
