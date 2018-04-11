import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonToggleModule, MatGridListModule, MatStepperModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule, MatSortModule, MatPaginatorIntl } from '@angular/material';

import { NumberSizeComponent } from './number-size/number-size.component';
import { DirectionalComponent } from './directional/directional.component';
import { ArrowTrackingComponent } from './arrow-tracking/arrow-tracking.component';

import { HideButtonDirective } from './directives/hide-button.directive';
import { CdkTableModule } from '@angular/cdk/table';

import { CustomMatPaginatorIntl } from './class/mat-paginator-intl';


import { DigitsComponent } from './initial-questionary/digits/digits.component';
import { GeneralDataComponent } from './initial-questionary/general-data/general-data.component';
import { OrientationComponent } from './initial-questionary/orientation/orientation.component';
import { DetentionVisualComponent } from './initial-questionary/detention-visual/detention-visual.component';
import { LanguageComponent } from './initial-questionary/language/language.component';
import { ReggresionDigitsComponent } from './initial-questionary/reggresion-digits/reggresion-digits.component';
import { ExecutiveFunctionComponent } from './initial-questionary/executive-function/executive-function.component';
import { EvocationFunctionComponent } from './initial-questionary/evocation-function/evocation-function.component';
import { InitialQuestionaryComponent } from './chart/initial-questionary/initial-questionary.component';
import { VerbalMemoryComponent } from './initial-questionary/verbal-memory/verbal-memory.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    CdkTableModule,    
    MatPaginatorModule,
    MatSortModule,
    
    FlexLayoutModule
  ],
  declarations: [
    DirectionalComponent, NumberSizeComponent, HideButtonDirective,
    ArrowTrackingComponent, ReggresionDigitsComponent, DigitsComponent,
    DetentionVisualComponent, GeneralDataComponent, OrientationComponent,
    LanguageComponent, ExecutiveFunctionComponent, EvocationFunctionComponent,
    InitialQuestionaryComponent, InitialQuestionaryComponent, VerbalMemoryComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    CdkTableModule,    
    MatPaginatorModule,
    MatSortModule,
        
    FlexLayoutModule,

    DirectionalComponent,
    NumberSizeComponent,
    ArrowTrackingComponent,
    ReggresionDigitsComponent,
    DigitsComponent,    
    DetentionVisualComponent,
    
    GeneralDataComponent, OrientationComponent,
    VerbalMemoryComponent, LanguageComponent,
    ExecutiveFunctionComponent, EvocationFunctionComponent,
    InitialQuestionaryComponent,

    HideButtonDirective,   
    
  ],
  providers: [{provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}]
})
export class SharedModule {

  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [/*All Services here*/],
    };
  }
}

