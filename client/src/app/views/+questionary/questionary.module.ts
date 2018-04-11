import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialComponent } from './initial/initial.component';

import {Routes, RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';

const router: Routes = [
  {
    path: 'initial',
    component: InitialComponent,
    data: {title: 'Cuestionario Inicial'}
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],  
  declarations: [InitialComponent]
})
export class QuestionaryModule { }
