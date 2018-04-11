import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';

import { ViewerComponent } from './viewer/viewer.component';


const router: Routes = [
  {
    path: '',
    component: ViewerComponent,
    data: {title: 'Visor'}
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    
    SharedModule,

    RouterModule.forChild(router),
  ],
  declarations: [ViewerComponent]
})
export class ExerciseModule { }
