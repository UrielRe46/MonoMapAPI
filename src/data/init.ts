//Conectarse a la base de datos

import mongoose from "mongoose";

interface ConnectionOptions {
    mongoUrl: string;
    dbName: string
}

export class MongoDatabase {
    static async connect(options: ConnectionOptions) {
        try {
            await mongoose.connect(options.mongoUrl, {
                dbName: options.dbName,
            });
            console.log("Conectado a la base de datos");
        } catch (error) {
            console.log("Error al conectarse a la base de datos");
        }
    }
}