import { GraphQLScalarType, GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { Kind } from "graphql/language";

import { createHmac } from "crypto";
import { SALT } from "../../config/server";
import { createToken } from "../../util/jwt";

import { ObjectId } from "mongodb";

const typeDef = `
  scalar Date

  type User {
    id: String!
    email: String!
    firstname: String!
    lastname: String!
    birthdate: Date!
    roles: [String]
  }

  input AuthProviderSigninData {
    email: String
    password: String
  }

  input AuthProviderSignupData {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    birthdate: Date!
  }

  input AuthProviderProfileData {
    firstname: String!
    lastname: String!
    birthdate: Date!
  }

  type UserPayload {
    token: String
  }

  type CurrentUser {
    firstname: String
    lastname: String
    birthdate: Float
    token: String
  }

  type UserResponse {
    _id: String
    firstname: String
    lastname: String
    email: String
    password: String
    birthdate: Float
    roles: [String]
  }

  input userData {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    birthdate: Date!
    roles: [String]
  }

  type Message {
    text: String
  }

  type Mutation {
    signupUser(user: AuthProviderSignupData): UserPayload!
    signinUser(user: AuthProviderSigninData): UserPayload!
    profileUser(user: AuthProviderProfileData): UserPayload!
    addUser(user: userData): User!
    updateUser(user: userData, id: String): User!
    deleteUser(id: String): Message!
  }
  type Query {
    users: [UserResponse]
    currentUser(token: String): CurrentUser!
    user(id: String): UserResponse!
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
  Mutation: {
    addUser: async (root, data, {mongo: {User}, user: currentUser}) => {

      if (!currentUser) {
        throw Error("Token de inicio de sesión inválido");
      }

      const user = await User.findOne({email: data.user.email});

      if (user) {
        throw Error(`Usuario con correo ${data.user.email} existe`);
      }

      const newToken = createToken(
        {
          email: data.user.email,
          firstname: data.user.firstname,
          roles: data.user.roles,
        },
      );

      const newUser = {
        birthdate: data.user.birthdate,
        email: data.user.email,
        firstname: data.user.firstname,
        lastname: data.user.lastname,
        password: createHmac("sha1", SALT).update(data.user.password).digest("hex"),
        roles: data.user.roles,
        token: newToken,
      };
      const response = await User.insert(newUser);

      return newUser;
    },
    deleteUser: async (root, data, {mongo: {User}, user: currentUser}) => {

      if (!currentUser) {
        throw Error("Token de inicio de sesión inválido");
      }

      try {
        const validUser = await User.findOne({_id: new ObjectId(data.id)});

        if (validUser) {
          if ((currentUser._id).toString() === (validUser._id).toString()) {
            throw Error(`No se puede eliminar usuario con sesión iniciada, ${currentUser.email}`);
          }
        } else {
          return {
            text: `No existe usuario con id ${data.id}`,
          };
        }

        const response = await User.deleteOne({_id: new ObjectId(data.id)});
      } catch (error) {
        throw Error(error);
      }

      return {
        text: "Usuario eliminado correctamente",
      };
    },
    profileUser: async (root, data, {mongo: {User}, user: currentUser}) => {

      if (!currentUser) {
        throw Error("Usuario no encontrado");
      }

      const newToken = createToken(
        {
          email: currentUser.email,
          firstname: data.user.firstname,
          roles: currentUser.roles,
        },
      );

      currentUser.firstname = data.user.firstname;
      currentUser.lastname = data.user.lastname;
      currentUser.birthdate = data.user.birthdate;
      currentUser.token = newToken;

      const response = await User.findOneAndUpdate({email: currentUser.email}, currentUser);

      return {token: newToken, user: currentUser};
    },
    signinUser: async (root, data, {mongo: {User}}) => {
      const findUser = await User.findOne({email: data.user.email});

      if (findUser) {
        if (createHmac("sha1", SALT).update(data.user.password).digest("hex") === findUser.password) {

          const newToken = createToken(
            {
              email: data.user.email,
              firstname: findUser.firstname,
              roles: findUser.roles,
            });

          findUser.token = newToken;
          const response = await User.findOneAndUpdate({email: data.user.email}, findUser);

          return {token: newToken, user: findUser};
        } else {
          throw Error("Contraseña incorrecta");
        }
      } else {
        throw Error("Usuario no encontrado");
      }
    },
    signupUser: async (root, data, {mongo: {User}}) => {

      const user = await User.findOne({email: data.user.email});

      if (user) {
        throw Error("Existe un usuario con este correo");
      }

      const newToken = createToken(
        {
          email: data.user.email,
          firstname: data.user.firstname,
          roles: ["Estudiante"],
        });

      const newUser = {
        birthdate: data.user.birthdate,
        email: data.user.email,
        firstname: data.user.firstname,
        lastname: data.user.lastname,
        password: createHmac("sha1", SALT).update(data.user.password).digest("hex"),
        roles: ["Estudiante"],
        token: newToken,
      };
      const response = await User.insert(newUser);
      return {token: newToken, user: newUser};
    },
    updateUser: async (root, data, {mongo: {User}, user: currentUser}) => {

      if (!currentUser) {
        throw Error("Token de inicio de sesión inválido");
      }

      const validUser = await User.findOne({email: data.user.email});

      if ((currentUser._id).toString() === (validUser._id).toString()) {
        throw Error(`No se puede modificar usuario con sesión iniciada, ${data.user.email}`);
      }

      if ((validUser) && (validUser._id).toString() !== data.id) {
        throw Error(`Usuario con correo ${data.user.email} existe`);
      }

      const newToken = createToken(
        {
          email: data.user.email,
          firstname: data.user.firstname,
          roles: data.user.roles,
        },
      );

      let newPassword = data.user.password;

      if (newPassword !== validUser.password) {
        newPassword = createHmac("sha1", SALT).update(data.user.password).digest("hex");
      }

      const newUser = {
        birthdate: data.user.birthdate,
        email: data.user.email,
        firstname: data.user.firstname,
        lastname: data.user.lastname,
        password: newPassword,
        roles: data.user.roles,
        token: newToken,
      };
      const response = await User.findOneAndUpdate({_id: new ObjectId(data.id)}, newUser);

      return newUser;
    },
  },
  Query: {
    currentUser: async (root, data, {mongo: {User}, user: currentUser} ) => {

      if (currentUser) {
        return {
          birthdate: currentUser.birthdate,
          firstname: currentUser.firstname,
          lastname: currentUser.lastname,
          token: currentUser.token,
        };
      } else {
        return {};
      }
    },
    users: async (root, data, {mongo: {User}, user: currentUser} ) => {
      return await User.find().toArray();
    },

    user: async (root, data, {mongo: {User}, user: currentUser} ) => {
      if (currentUser) {
        return await User.findOne({_id: new ObjectId(data.id)});
      } else {
        return {};
      }
    },
  },
  User: {
    id: (root) => root._id || root.id,
  },
};

export const userSchema: GraphQLSchema = makeExecutableSchema({
  resolvers: resolver,
  typeDefs: typeDef,
});
