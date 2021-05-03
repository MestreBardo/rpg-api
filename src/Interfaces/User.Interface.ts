import {
    Document,
    Model
} from "mongoose";

export interface UserInterface extends Document {
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

    checkPassword(password: string): boolean;
    generateToken(): string;
    validateData(): Promise < string[] > ;
    encryptPassword(newPassword ? : string): Promise < void > ;
}

export interface UserModelInterface extends Model < UserInterface > {
    getByEmailOrUsername(username: string, email: string): Promise < UserInterface >
        getByTextToSearch(textToSearch: string, page: number): Promise < UserInterface[] >
}