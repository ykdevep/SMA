export interface IQExercise {
    question: any[];
    response: any[];
    level: number;
    name: string;
    hits: number;
    howlers: number;
    omit: number;
    errors: number;
    points: number;
    time: number;
  }

export interface IGeneralData {
    sex: string;
    lateral: string;
    scholarGrade: string;
    desease: string[];
    job: string;
}

export interface IInitial {
    id?: string;
    generalData: IGeneralData;
    time: number;
    createdOn?: Date;
    exercises: IQExercise[];
}
