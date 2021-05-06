import {
    Document,
    Model
} from "mongoose";

export interface UserDocumentInterface extends Document {
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
    groupCount: number;

    validateData(): Promise <string[]>;
}


export interface UserModelInterface extends Model<UserDocumentInterface> {
    getByEmailOrUsername(username: string, email: string): Promise<UserDocumentInterface>
    getByTextToSearch(textToSearch: string, page: number): Promise<UserDocumentInterface[]>
}