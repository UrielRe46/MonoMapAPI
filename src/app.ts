import express from "express";
import { envs } from "./config/envs.plugin";
import { MongoDatabase } from "./data/init";

const app = express();

(async () =>
    MongoDatabase.connect({
        dbName: "MonoMapApi",
        mongoUrl: envs.MONGO_URL ?? "",
    }))();

app.listen(envs.PORT, () => {
    console.log("Servidor esta corriendo");
});
