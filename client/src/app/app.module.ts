import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';

import { AuthGuard } from '@app/core/guard/auth.guard';
import { RoleGuard } from '@app/core/guard/role.guard';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './views/+home/home.module#HomeModule',
  },
  {
    path: 'auth',
    loadChildren: './views/+auth/auth.module#AuthModule',
  },
  {
    path: 'exercise',
    loadChildren: './views/+exercise/exercise.module#ExerciseModule',
    canLoad: [AuthGuard],
  },
  {
    path: 'questionary',
    loadChildren: './views/+questionary/questionary.module#QuestionaryModule',
    canLoad: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: './views/+dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthGuard],
  },
  {
    path: 'admin/user',
    loadChildren: './views/+admin/admin.module#AdminModule',
    canLoad: [AuthGuard],
  },
  {
    path: 'chart',
    loadChildren: './views/+chart/chart.module#ChartModule',
    canLoad: [AuthGuard],
  },
  {
    path: 'about',
    loadChildren: './views/+about/about.module#AboutModule',
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,

    SharedModule.forRoot(),
    CoreModule,

    RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
