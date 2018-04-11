import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { IExercise } from '@app/core/models/exercise.model';

const createExercise = gql`
  mutation createExercise($data: ExerciseData) {
    createExercise(data: $data) {
      id
      dificulty {
        name
        value
      }
      attention {
        name
        index
      }
      question {
        name
        value
      }
      data {
        name
        value
      }
      response {
        eval
        position
      }
      hits
      howlers
      omit
      errors
      time
    }
  }
`;

const saveExercise = gql`
  mutation saveExercise($id: String, $hits: Int, $howlers: Int, $omit: Int, $errors: Int, $time: Int, $response: [ResponseData]) {
    saveExercise(id: $id, hits: $hits, howlers: $howlers, omit: $omit, errors: $errors, time: $time, response: $response) {
      text
    }
  }
`;


const exercises = gql`
  query exercises {
    exercises {
      hits
      howlers
      omit
      errors
      points
      time
      createdOn
    }
  }
`;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {
  
  exercise: IExercise = null;
  loading: boolean = false;

  attention: number = 0;
  dificulty: number = 0;
  index: number = 0;

  constructor(
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute) {  
      this.attention = this.activeRoute.snapshot.params['attention'];
      this.index = this.activeRoute.snapshot.params['exercise'];
      this.dificulty = this.activeRoute.snapshot.params['dificulty'];

      
  }

  ngOnInit() {
    this.loading = true;

    this.apollo.mutate({
      mutation: createExercise,
      variables: {
        'data': {
          'attention': this.attention,
          'dificulty': this.dificulty,
          'exercise': this.index,
        }
      },
      refetchQueries: [{
        query: exercises
      }],
    },    
  ).subscribe(({data}) => {
      this.loading = false;
      this.exercise = data.createExercise;
      this.snackBar.open(`Nuevo ejercicio`, 'X', {duration: 3000});
           
    }, (error) => {
      this.loading = false;
      this.snackBar.open(error, 'X', {duration: 3000});
    });
  }

  saveAndClose(): void {
    this.loading = true;

    this.apollo.mutate({
      mutation: saveExercise,
      variables: {
          'id': this.exercise.id, 
          'response': this.exercise.response,
          'hits': this.exercise.hits,
          'howlers': this.exercise.howlers,
          'omit': this.exercise.omit,
          'errors': this.exercise.errors,
          'time': this.exercise.time,
      }
    }).subscribe(({data}) => {
      this.loading = false;
      this.router.navigate(['dashboard', 'exercise']);
    }, (error) => {
      this.loading = false;
      this.snackBar.open(error, 'X', {duration: 3000});
    });
  }



}