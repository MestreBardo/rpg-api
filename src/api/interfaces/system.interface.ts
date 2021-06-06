import {
    Document,
    Model
} from "mongoose";

export interface SystemDocumentInterface extends Document {
    _id: string
    name: string,
    owner: string,
    version: number,
    createdOn: Date,

}


export interface SystemModelInterface extends Model<SystemDocumentInterface> {
}