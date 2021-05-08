import { Error } from "mongoose";

export default class ErrorWithMessages extends Error {
    constructor(public status: string, public messages: string[]) {
        super('');
    }
}