import { GraphQLScalarType, GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { Kind } from "graphql/language";

import { ObjectId } from "mongodb";

import { IInitial } from "./initial.interface";

const typeDef = `
  scalar Date

  type Response {
    eval: String!
    value: String
  }

  input ResponseInput {
    eval: String!
    value: String
  }

  type Question {
    name: String!
    value: String
  }

  input QuestionInput {
    name: String!
    value: String
  }

  type IQExercise {
    question: [Question!]
    response: [Response!]
    level: Int!
    name: String!
    hits: Int!
    howlers: Int!
    omit: Int!
    errors: Int!
    points: Float!
    time: Int!
  }

  input IQExerciseInput {
    question: [QuestionInput!]
    response: [ResponseInput!]
    level: Int!
    name: String!
    hits: Int!
    howlers: Int!
    omit: Int!
    errors: Int!
    points: Float!
    time: Int!
  }

  type GeneralData {
      sex: String!
      lateral: String!
      scholarGrade: String!
      desease: [String]
      job: String
  }

  type Initial {
    id: String
    userId: String!
    createdOn: Date!
    time: Int!
    generalData: GeneralData!
    exercises: [IQExercise]
  }

  input GeneralDataInput {
    sex: String!
    lateral: String!
    scholarGrade: String!
    desease: [String]
    job: String
  }

  input InitialInput {
    generalData: GeneralDataInput!
    time: Int!
    exercises: [IQExerciseInput]
  }

  type Mutation {
    saveInitial(initial: InitialInput): Initial!
  }

  type Query {
    myInitialQ: Initial
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
    Initial: {
        id: (root) => root._id || root.id,
    },
    Mutation: {
        saveInitial: async (root, data, { mongo: { Initial }, user: user }) => {

            if (!user) {
                throw Error("User not Found");
            }

            const newInitial = {
                createdOn: new Date(),
                exercises: data.initial.exercises,
                generalData: data.initial.generalData,
                time: data.initial.time,
                userId: user._id,
            };

            const response = await Initial.insert(newInitial);

            return newInitial;
        },
    },
    Query: {
        myInitialQ: async (root, data, { mongo: { Initial }, user: user }) => {
            if (!user) {
                return {};
            }

            return await Initial.findOne({ userId: user._id });
        },
    },
};

export const initialSchema: GraphQLSchema = makeExecutableSchema({
    resolvers: resolver,
    typeDefs: typeDef,
});
