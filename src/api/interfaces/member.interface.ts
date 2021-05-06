import {
    Document,
    Model
} from "mongoose";

export interface MemberDocumentInterface extends Document {
    _id: string
    userId: string;
    username: string;
    email: string;
    groupId: string;
    groupName: string;
    since: Date;
    role: string;

}


export interface MemberModelInterface extends Model<MemberDocumentInterface> {
}