export interface IExercise {
    dificulty: IDificulty;
    attention: IAttention;
    question: IQuestion[];
    data: any[];
    response: any[];
    hits: number;
    howlers: number;
    omit: number;
    errors: number;
    points: number;
    time: number;
}

export interface IAttention {
    name: string;
    index: number;
}

export interface IDificulty {
    name: string;
    value: any;
}

export interface IQuestion {
    name: string;
    value: any;
}
