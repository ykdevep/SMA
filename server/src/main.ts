import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import * as bodyParser from "body-parser";
import * as express from "express";

import * as cors from "cors";
import * as helmet from "helmet";
import * as morgan from "morgan";

import {CONFIG_SERVER} from "./config/server";
import {Schema} from "./service/";

import { Authentication } from "./util/authentication";
import { BuildDataloaders } from "./util/dataloaders";

import { connectMongo } from "./database/mongo.connector";

const start = async (config) => {

  const mongo = await connectMongo();

  const app = express();

  const buildOptions = async (req, res) => {

    const user = await Authentication(req, mongo.User);
    const dataloaders = BuildDataloaders(mongo.User);

    return {
      cacheControl: config.cacheControl,
      context: {
        dataloaders,
        mongo,
        user,
      },
      schema: Schema,
      tracing: config.tracing,
    };
  };

  app.use("/graphql", bodyParser.json(), cors(config.cors), graphqlExpress(buildOptions));

  app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphiql" }));

  app.listen(config.port, () => {
    console.log(`GraphQL Server is now running on http://localhost:${config.port}/graphql`);
  });
};

start(CONFIG_SERVER);
