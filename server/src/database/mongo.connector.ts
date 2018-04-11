import { MongoClient } from "mongodb";
import { CONFIG_DB } from "../config/database";

export const connectMongo = async () => {
    const db = await MongoClient.connect(CONFIG_DB.url, CONFIG_DB.options);

    console.log(`Connect to mongo Database on ${CONFIG_DB.url}`);

    return {
        Exercise: db.collection("exercise"),
        Initial: db.collection("initial"),
        User: db.collection("user"),
    };
};
