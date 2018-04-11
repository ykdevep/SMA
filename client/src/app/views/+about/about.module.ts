import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';

import {Routes, RouterModule} from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';

const router: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: {title: 'About'}
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(router)
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
