import { GraphQLSchema } from "graphql";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";

import { exerciseSchema } from "./exercise/exercise.schema";
import { userSchema } from "./user/user.schema";

import { initialSchema } from "./questionnaire/initial.schema";

export const Schema = mergeSchemas({
  schemas: [exerciseSchema, initialSchema, userSchema],
});
