import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule} from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { AuthGuard } from '@app/core/guard/auth.guard';
import { RoleGuard } from '@app/core/guard/role.guard';

import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ResultComponent } from './result/result.component';

import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminExerciseComponent } from './admin-exercise/admin-exercise.component';

import { AdminQuestionnaireComponent } from './admin-questionnaire/admin-questionnaire.component';
import { AdminEvaluationsComponent } from './admin-evaluations/admin-evaluations.component';

const router: Routes = [
  {
    path: 'questionnaire',
    component: QuestionnaireComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Escritorio estudiante',
      expectedRole: 'Estudiante',
    },
  },
  {
    path: 'exercise',
    component: ExerciseComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Escritorio estudiante',
      expectedRole: 'Estudiante',
    },
  },
  {
    path: 'result',
    component: ResultComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Escritorio estudiante',
      expectedRole: 'Estudiante',
    },
  },
  {
    path: 'admin_questionnaire',
    component: AdminQuestionnaireComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Escritorio Especialista',
      expectedRole: 'Especialista',
    },
  },
  {
    path: 'evaluation',
    component: AdminEvaluationsComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Escritorio Especialista',
      expectedRole: 'Especialista',
    },
  },
  {
    path: 'admin_user',
    component: AdminUserComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Escritorio administrador',
      expectedRole: 'Administrador',
    },
  },
  {
    path: 'admin_exercise',
    component: AdminExerciseComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Escritorio estudiante',
      expectedRole: 'Administrador',
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),

    SharedModule,
  ],
  declarations: [QuestionnaireComponent, ExerciseComponent, ResultComponent, AdminUserComponent, AdminExerciseComponent, AdminQuestionnaireComponent, AdminEvaluationsComponent]
})
export class DashboardModule { }
