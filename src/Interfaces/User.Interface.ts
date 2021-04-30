import { Document, Model } from "mongoose";

export interface UserInterface extends Document {
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

}

export interface IUserModel extends Model<UserInterface> {
    getByEmailOrUsername(name: string): Promise<Array<UserInterface>>
    tester(): string;
}