import { GraphQLScalarType, GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { Kind } from "graphql/language";

import { ObjectId } from "mongodb";

import { ExerciseClass } from "../../util/exercise.generate";
import { IAttention, IExercise, IQuestion } from "./exercise.interface";

const typeDef = `
  scalar Date

  type Data {
    name: String!
    value: String!
  }

  type Response {
    eval: String!
    position: String
  }

  type Question {
    name: String!
    value: String
  }

  type Dificulty {
    name: String!
    value: Int!
  }

  type Attention {
    name: String!
    index: Int!
  }

  type Exercise {
    id: String!
    dificulty: Dificulty!
    attention: Attention!
    question: [Question!]
    data: [Data!]
    response: [Response!]
    hits: Int!
    howlers: Int!
    omit: Int!
    errors: Int!
    points: Float!
    time: Int!
    createdOn: Date!
    userId: String!
  }

  input ExerciseData {
    dificulty: Int
    attention: Int
    exercise: Int
  }

  input ResponseData {
    eval: String
    position: String
  }

  type Message {
    text: String!
  }

  type ExerciseResponse {
    dificulty: Dificulty
    attention: Attention
    question: [Question]
    hits: Int
    howlers: Int
    omit: Int
    errors: Int
    points: Float
    time: Int
    createdOn: Float
  }

  type Mutation {
    createExercise(data: ExerciseData): Exercise!
    saveExercise(
        id: String, hits: Int, howlers: Int, omit: Int, errors: Int,
        time: Int, response: [ResponseData]
    ): Message!
  }

  type Query {
    exercises: [ExerciseResponse]
  }`;

const resolver = {
    Date: new GraphQLScalarType({
        description: "Date custom scalar type",
        name: "Date",
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    }),
    Exercise: {
        id: (root) => root._id || root.id,
    },
    Mutation: {
        createExercise: async (root, data, { mongo: { Exercise }, user: user }) => {

            if (!user) {
                throw Error("User not Found");
            }
            const exercise = new ExerciseClass(data.data.attention, data.data.exercise, data.data.dificulty);

            const newExercise = {
                attention: exercise.attention,
                createdOn: new Date(),
                data: exercise.data,
                dificulty: exercise.dificulty,
                errors: exercise.errors,
                hits: exercise.hits,
                howlers: exercise.howlers,
                omit: exercise.omit,
                points: exercise.points,
                question: exercise.question,
                response: exercise.response,
                time: exercise.time,
                userId: user._id,
                };

            const response = await Exercise.insert(newExercise);
            return newExercise;
        },
        saveExercise: async (root, data, { mongo: { Exercise }, user: user }) => {

            if (!user) {
                throw Error("User not Found");
            }

            const findExercise = await Exercise.findOne({_id: new ObjectId(data.id)});

            if (!findExercise) {
                throw Error("Exercise not Found");
            }

            const totalPoint = (data.hits *  2) + (data.howlers * -0.5) + (data.omit * -0.5);

            findExercise.errors = data.errors;
            findExercise.hits = data.hits;
            findExercise.howlers = data.howlers;
            findExercise.omit = data.omit;
            findExercise.points = totalPoint;
            findExercise.response = data.response;
            findExercise.time = data.time;

            const response = await Exercise.findOneAndUpdate({_id: new ObjectId(data.id)}, findExercise);

            return {text: "Succeful"};
        },
    },
    Query: {
        exercises: async (root, data, { mongo: { Exercise }, user: user }) => {
            if (!user) {
                return [];
            }

            const e = await Exercise.aggregate([
                        {
                            $match: {
                                userId: user._id,
                            },
                        },
                        {
                            $sort: {
                                createdOn: 1,
                            },
                        },
                        {
                            $group: {

                                points: {
                                    $sum: "$points",
                                },
                            },
                        },
                    ]);
            
            //console.log(e);

            return await Exercise.find({userId: user._id}).toArray();
        },
    },
};

export const exerciseSchema: GraphQLSchema = makeExecutableSchema({
    resolvers: resolver,
    typeDefs: typeDef,
});
