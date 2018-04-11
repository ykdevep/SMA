import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular/Apollo';
import { MatSnackBar } from '@angular/material';

import { IInitial, IQExercise, IGeneralData } from '@app/core/models/initial.model';
import { User } from '@app/core/models/user.model';

import { currentUser } from '@app/core/types/user/queries.ts'
import { saveInitial } from '@app/core/types/initial/mutations';
import { myInitialQ } from '@app/core/types/initial/queries';


@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
})
export class InitialComponent implements OnInit {

  loading: boolean = false;
  flag: boolean = true;
  showChart: boolean = false;

  /**
   * orientation -> 4
   * digits regression -> 5
   * 20-3 -> 5
   * verbal memory -> 6
   */
  points: number = 20;
  level: number = 1;

  totalPoints: number = 0;
  totalHits: number = 0;
  totalErrors: number = 0;
  totalOmits: number = 0;
  totalHowlers: number = 0;
  
  age: number = 0;  

  initial: IInitial;
  start: Date = new Date();
  user: any = {};

  generalDataForm: FormGroup;
  generalData: IGeneralData;
  
  orientationForm: FormGroup;
  orientationData: IQExercise;

  regressionDigitsForm: FormGroup;
  regressionDigitsData: IQExercise;

  detentionVisualForm: FormGroup;
  detentionVisualData: IQExercise;

  digitsForm: FormGroup;
  digitsData: IQExercise;

  verbalMemoryForm: FormGroup;
  verbalMemoryData: IQExercise;

  constructor(
    private _formBuilder: FormBuilder,
    private apollo: Apollo,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.generalDataForm = this._formBuilder.group({
      sex: ['', Validators.required],
      lateral: ['', Validators.required],
      scholarGrade: ['', Validators.required],
      job: ['', Validators.required],
      desease: [''],
    });

    this.orientationForm = this._formBuilder.group({
      day: ['',  Validators.required],
      month: ['', Validators.required],
      year: ['', [Validators.required]],
      city: ['', Validators.required],
      place: ['', Validators.required],
      age: ['', Validators.required],
    });

    this.regressionDigitsForm = this._formBuilder.group({
      flagControl: ['',  Validators.required],
      response: [''],
    });

    this.detentionVisualForm = this._formBuilder.group({
      flagControl: ['',  Validators.required],
    });

    this.digitsForm = this._formBuilder.group({
      response: ['', Validators.required],
    });

    this.verbalMemoryForm = this._formBuilder.group({
      flagControl: ['', Validators.required],
      checkbokControl: [],
    });

    this.loading = true;

    this.apollo.watchQuery<any>({
      query: currentUser,
      fetchPolicy: 'network-only',
    })
    .valueChanges
    .subscribe(({data}) => {
      this.loading = false;
      this.user = {
        firstname: data.currentUser.firstname,
        lastname: data.currentUser.lastname,
        birthdate: data.currentUser.birthdate,
      }

      this.age = Math.round((new Date().getTime() - new Date(this.user.birthdate).getTime()) / (60000 * 60 * 24 * 365.25));
      
    }, (error) => {
      this.loading = false;
      this.snackBar.open(error, 'X', {duration: 3000});
    });


    this.apollo.watchQuery<any>({
      query: myInitialQ
    })
      .valueChanges
      .subscribe(({data}) => {

        if (data.myInitialQ) {
          if (data.myInitialQ.exercises) {
            this.totalPoints = data.myInitialQ.exercises.map(p => p.points).reduce((prev, value) => prev + value, 0);
            this.totalErrors = data.myInitialQ.exercises.map(p => p.errors).reduce((prev, value) => prev + value, 0);

            this.totalOmits = data.myInitialQ.exercises.map(p => p.omit).reduce((prev, value) => prev + value, 0);
            this.totalHits = data.myInitialQ.exercises.map(p => p.hits).reduce((prev, value) => prev + value, 0);
            this.totalHowlers = data.myInitialQ.exercises.map(p => p.howlers).reduce((prev, value) => prev + value, 0);

            this.level = Math.round(15 * (this.totalPoints / this.points));

            console.log(data);

            this.flag = true;
          }          
        } else {
          this.flag = false;
        }
        this.loading = data.loading;
      });
  }

  save() {
    this.loading = true;

    this.apollo.mutate({
      mutation: saveInitial,
      variables: {
        'initial': this.buildInitial(),
      },
      refetchQueries: [{
        query: myInitialQ
      }],
    },    
  ).subscribe(({data}) => {
      this.loading = false;
      console.log(data);
      this.snackBar.open(`Guardando questionario Inicial`, 'X', {duration: 3000});
           
    }, (error) => {
      this.loading = false;
      this.snackBar.open(error, 'X', {duration: 3000});
    });
  }

  buildInitial(): IInitial {
    this.initial = {
      generalData: this.generalData,
      time: new Date().getTime() - this.start.getTime(),
      exercises: [this.orientationData, this.regressionDigitsData, this.detentionVisualData, this.digitsData, this.verbalMemoryData],
    }
    return this.initial;
  }

  saveOrientation(data): void {
    this.orientationData = data;
  }

  saveGeneralData(data): void {
    this.generalData = data;
  }

  saveReggresionDigits(data): void {
    this.regressionDigitsData = data;
  }
  
  saveDetentionVisual(data): void {
    this.detentionVisualData = data;
  }

  saveDigits(data): void {
    this.digitsData = data;
  }

  verbalMemory(data): void {
    this.verbalMemoryData = data;
  }

}
