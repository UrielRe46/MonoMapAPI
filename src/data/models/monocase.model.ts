import mongoose from "mongoose";

const monocaseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    isSent: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now(),
    },
});

//Instancia del esquema para crearse
export const MonoCaseModel = mongoose.model("MonoCase", monocaseSchema)