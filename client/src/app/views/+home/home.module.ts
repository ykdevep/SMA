import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import {RouterModule, Routes} from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';

const router: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {title: 'Home'}
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(router)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
