import {
    Document,
    Model
} from "mongoose";

export interface MemberDocumentInterface extends Document {
    _id: string
    user: string;
    username: string;
    email: string;
    group: string;
    since: Date;
    role: string;

}


export interface MemberModelInterface extends Model<MemberDocumentInterface> {
}