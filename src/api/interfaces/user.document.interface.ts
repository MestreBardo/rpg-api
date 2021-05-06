import {
    Document,
    Model
} from "mongoose";

export default interface UserDocumentInterface extends Document {
    _id: string
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    birthday: Date;
    active: boolean;
    country: string;
    gender: string;
    city: string;
    registeredOn: Date;
    lastModifiedOn: number;

    validateData(): Promise <string[]>;
}