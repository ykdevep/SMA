import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {Routes, RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { AuthGuard } from '@app/core/guard/auth.guard';
import { RoleGuard } from '@app/core/guard/role.guard';

import { UpdateUserComponent } from './user/update-user/update-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { ReadUserComponent } from './user/read-user/read-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';

const router: Routes = [
  {
    path: 'update/:id',
    component: UpdateUserComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Modificar Usuario',
      expectedRole: 'Administrador',
    },
  },
  {
    path: 'create',
    component: CreateUserComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Crear Usuario',
      expectedRole: 'Administrador',
    },
  },
  {
    path: 'delete/:id',
    component: DeleteUserComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Eliminar Usuario',
      expectedRole: 'Administrador',
    },
  },
  {
    path: 'read',
    component: ReadUserComponent,
    canActivate: [RoleGuard],
    data: {
      title: 'Listar Usuarios',
      expectedRole: 'Administrador',
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    ReactiveFormsModule,

    SharedModule,
  ],
  declarations: [UpdateUserComponent, CreateUserComponent, ReadUserComponent, DeleteUserComponent]
})
export class AdminModule { }
