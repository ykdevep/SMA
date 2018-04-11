import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule} from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { AuthGuard } from '@app/core/guard/auth.guard';
import { RoleGuard } from '@app/core/guard/role.guard';

import { ExerciseUserComponent } from './exercise-user/exercise-user.component';

const router: Routes = [
  {
    path: 'exercise_user',
    component: ExerciseUserComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Ejercicios por usuarios',
      expectedRole: 'Estudiante',
    },
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),

    SharedModule,
  ],
  declarations: [ExerciseUserComponent]
})
export class ChartModule { }
