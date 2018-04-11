import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise',
  template: `
    <div class="container" fxLayout="row" fxLayout.xs="column" fxLayoutAlign="center center" fxLayoutGap="0" fxLayoutGap.xs="0">
      <div class="item" fxFlex="98%" fxFlex.xs="100%" fxFlex.gt-sm="98%">

        <h2>Ejercicios</h2>

        <mat-tab-group class="tab-group">
          <mat-tab label="Selectiva">
            <mat-grid-list cols="5" rowHeight="2:1">

              <mat-grid-tile><a mat-menu-item >Detección de números grandes y chicos</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="primary"  [routerLink]="['/exercise', {'attention': 0, 'exercise': 0, 'dificulty': 0}]">Inicial</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="accent"  [routerLink]="['/exercise', {'attention': 0, 'exercise': 0,  'dificulty': 1}]">Media</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="warn"  [routerLink]="['/exercise', {'attention': 0, 'exercise': 0,  'dificulty': 2}]">Avanzada</a></mat-grid-tile>
              <mat-grid-tile><a mat-button [routerLink]="['/exercise', {'attention': 0, 'exercise': 0,  'dificulty': 3}]">Aleatoria</a></mat-grid-tile>

            </mat-grid-list>
            
          </mat-tab>
          <mat-tab label="Sostenida">
            <mat-grid-list cols="5" rowHeight="2:1">

              <mat-grid-tile><a mat-menu-item >Rastreo Flechas</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="primary"  [routerLink]="['/exercise', {'attention': 2, 'exercise': 1,'dificulty': 0}]">Inicial</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="accent"  [routerLink]="['/exercise', {'attention': 2, 'exercise': 1, 'dificulty': 1}]">Media</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="warn"  [routerLink]="['/exercise', {'attention': 2, 'exercise': 1, 'dificulty': 2}]">Avanzada</a></mat-grid-tile>
              <mat-grid-tile><a mat-button [routerLink]="['/exercise', {'attention': 2, 'exercise': 1, 'dificulty': 3}]">Aleatoria</a></mat-grid-tile>

            </mat-grid-list>
            
          </mat-tab>
          <mat-tab label="Enfocada">
            <mat-grid-list cols="5" rowHeight="2:1">

              <mat-grid-tile><a mat-menu-item >Direccionalidad Derecha</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="primary"  [routerLink]="['/exercise', {'attention': 1,  'exercise':  0, 'dificulty': 0}]">Inicial</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="accent"  [routerLink]="['/exercise', {'attention': 1,  'exercise':  0, 'dificulty': 1}]">Media</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="warn"  [routerLink]="['/exercise', {'attention': 1,  'exercise':  0, 'dificulty': 2}]">Avanzada</a></mat-grid-tile>
              <mat-grid-tile><a mat-button [routerLink]="['/exercise', {'attention': 1,  'exercise':  0, 'dificulty': 3}]">Aleatoria</a></mat-grid-tile>

              <mat-grid-tile><a mat-menu-item >Direccionalidad Izquierda</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="primary"  [routerLink]="['/exercise', {'attention': 1,  'exercise':  1, 'dificulty': 0}]">Inicial</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="accent"  [routerLink]="['/exercise', {'attention': 1,  'exercise':  1, 'dificulty': 1}]">Media</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="warn" [routerLink]="['/exercise', {'attention': 1,  'exercise':  1, 'dificulty': 2}]">Avanzada</a></mat-grid-tile>
              <mat-grid-tile><a mat-button [routerLink]="['/exercise', {'attention': 1,  'exercise': 1, 'dificulty': 3}]">Aleatoria</a></mat-grid-tile>

              <mat-grid-tile><a mat-menu-item >Direccionalidad Arriba</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="primary" [routerLink]="['/exercise', {'attention': 1,  'exercise':  2, 'dificulty': 0}]">Inicial</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="accent"  [routerLink]="['/exercise', {'attention': 1,  'exercise':  3, 'dificulty': 1}]">Media</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="warn"   [routerLink]="['/exercise', {'attention': 1,  'exercise':  2, 'dificulty': 2}]">Avanzada</a></mat-grid-tile>
              <mat-grid-tile><a mat-button [routerLink]="['/exercise', {'attention': 1,  'exercise':  2, 'dificulty': 3}]">Aleatoria</a></mat-grid-tile>

              <mat-grid-tile><a mat-menu-item >Direccionalidad Abajo</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="primary"  [routerLink]="['/exercise', {'attention': 1,  'exercise':  3, 'dificulty': 0}]">Inicial</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="accent" [routerLink]="['/exercise', {'attention': 1,  'exercise':  3, 'dificulty': 1}]">Media</a></mat-grid-tile>
              <mat-grid-tile><a mat-button color="warn" [routerLink]="['/exercise', {'attention': 1,  'exercise':  3, 'dificulty': 2}]">Avanzada</a></mat-grid-tile>
              <mat-grid-tile><a mat-menu-item [routerLink]="['/exercise', {'attention': 1,  'exercise':  3, 'dificulty': 3}]">Aleatoria</a></mat-grid-tile>

              
            </mat-grid-list>    
            
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: []
})
export class ExerciseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
