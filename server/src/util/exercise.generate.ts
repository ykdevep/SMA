import { IAttention, IDificulty, IExercise, IQuestion  } from "../service/exercise/exercise.interface";

export class ExerciseClass implements IExercise {

    public question: IQuestion[] = [];
    public attention: IAttention;
    public dificulty: IDificulty;
    public data: any[] = [];
    public response: any[] = [];
    public hits: number = 0;
    public howlers: number = 0;
    public omit: number = 0;
    public errors: number = 0;
    public points: number = 0;
    public time: number = 0;

    private backup: any [] = [
        {
            attention: {
                index: 0,
                name: "enfocada",
            },
            dificulty: [
                {
                    name: "Inicial",
                    value: 3,
                },
                {
                    name: "Media",
                    value: 5,
                },
                {
                    name: "Avanzada",
                    value: 7,
                },
            ],
            response: [
                {
                    name: "Derecha",
                    value: "arrow_forward",
                },
                {
                    name: "Izquierda",
                    value: "arrow_back",
                },
                {
                    name: "Arriba",
                    value: "arrow_upward",
                },
                {
                    name: "Abajo",
                    value: "arrow_downward",
                },
            ],
        },
        {
            attention: {
                index: 1,
                name: "selectiva",

            },
            dificulty: [
                {
                    name: "Inicial",
                    value: 10,
                },
                {
                    name: "Media",
                    value: 15,
                },
                {
                    name: "Avanzada",
                    value: 20,
                },
            ],
            question: [
                {
                    name: "1 y tamaño pequeño",
                    value: "1_p",
                },
                {
                    name: "1 y tamaño grande",
                    value: "1_G",
                },
                {
                    name: "2 y tamaño pequeño",
                    value: "2_p",
                },
                {
                    name: "2 y tamaño grande",
                    value: "2_G",
                },
                {
                    name: "3 y tamaño pequeño",
                    value: "3_p",
                },
                {
                    name: "3 y tamaño grande",
                    value: "3_G",
                },
                {
                    name: "Sin valor",
                    value: "4",
                },
                {
                    name: "1 y tamaño pequeño o grande",
                    value: "1",
                },
                {
                    name: "2 y tamaño pequeño o grande",
                    value: "2",
                },
                {
                    name: "3 y tamaño pequeño o grande",
                    value: "3",
                },
            ],
            response: [
                {
                    name: "1 y tamaño pequeño",
                    value: "1_p",
                },
                {
                    name: "1 y tamaño grande",
                    value: "1_G",
                },
                {
                    name: "2 y tamaño pequeño",
                    value: "2_p",
                },
                {
                    name: "2 y tamaño grande",
                    value: "2_G",
                },
                {
                    name: "3 y tamaño pequeño",
                    value: "3_p",
                },
                {
                    name: "3 y tamaño grande",
                    value: "3_G",
                },
                {
                    name: "Sin valor",
                    value: "4",
                },
            ],

        },
        {
            attention: {
                index: 2,
                name: "sostenida",
            },
            dificulty: [
                {
                    name: "Inicial",
                    value: 8,
                },
                {
                    name: "Media",
                    value: 12,
                },
                {
                    name: "Avanzada",
                    value: 16,
                },
            ],
            response: [
                {
                    name: "Derecha",
                    value: "arrow_forward",
                },
                {
                    name: "Izquierda",
                    value: "arrow_back",
                },
                {
                    name: "Arriba",
                    value: "arrow_upward",
                },
                {
                    name: "Abajo",
                    value: "arrow_downward",
                },
                {
                    name: "horizontal",
                    value: "swap_horiz",
                },
                {
                    name: "vertical",
                    value: "swap_vert",
                },
            ],
        },

    ];

    /**
     *
     */
    constructor(attention: number, exercise: number, dificulty: number) {

        if (attention === 0) {
            this.attention = {
                index: 0,
                name: "selectiva",
            };
        } else if (attention === 1) {
            this.attention = {
                index: 1,
                name: "enfocada",
            };
        } else if (attention === 2) {
            this.attention = {
                index: 2,
                name: "sostenida",
            };
        } else {
            this.attention = {
                index: 0,
                name: "selectiva",
            };
        }

        this.initialize(exercise, dificulty);
    }

    /*
     */

    public initialize(indexExercise: number, dificulty: number): void {

        const attentions = this.backup.filter((p) => p.attention.name === this.attention.name);

        const exercise: any = attentions[this.random(attentions.length - 1)];

        if (this.attention.name === "enfocada") {

            this.question.push(exercise.response[indexExercise]);

            if (dificulty === 3) {
                this.dificulty = this.getDificulty(exercise.dificulty);
            } else {
                this.dificulty = exercise.dificulty[dificulty];
            }
            this.attention.index = 0;

        } else if (this.attention.name === "selectiva") {
            let question = this.getQuestion(exercise.question);

            while (question.value === "4") {
                question = this.getQuestion(exercise.question);
            }
            this.question.push(question);

            this.attention.index = 1;

            if (dificulty === 3) {
                this.dificulty = this.getDificulty(exercise.dificulty);
            } else {
                this.dificulty = exercise.dificulty[dificulty];
            }

        } else if (this.attention.name === "sostenida") {

            const firstQuestion = this.getQuestion(exercise.response);

            this.question.push(firstQuestion);

            let secondQuestion = this.getQuestion(exercise.response);

            while (firstQuestion === secondQuestion) {
                secondQuestion = this.getQuestion(exercise.response);
            }

            this.question.push(secondQuestion);

            if (dificulty === 3) {
                this.dificulty = this.getDificulty(exercise.dificulty);
            } else {
                this.dificulty = exercise.dificulty[dificulty];
            }

            this.attention.index = 2;

        } else {
            console.log("Aleatorio");
        }

        for (let i = 0; i < Math.pow(this.dificulty.value, 2); i++) {

            const question: IQuestion = this.getQuestion(exercise.response);
            this.data.push(question);

            for (let q of this.question) {

                if (question.value === q.value) {
                    this.omit += 1;
                }

            }
        }

        this.errors = this.omit;
        this.points = (this.hits *  2) + (this.omit * -0.5);
    }

    public random(value: number): number {
        return Math.round(Math.random() * (value));
    }

    public getQuestion(question: any[]): IQuestion {
        return question[this.random(question.length - 1)];
    }

    public getDificulty(dificulty: any[]): IDificulty {
        return dificulty[this.random(dificulty.length - 1)];
    }

    public toString(): string {
        return `${this.dificulty.name}-${this.omit}-${this.errors}-(${this.points})-${this.data}`;
    }

}
