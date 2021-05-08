import {
    Document,
    Model
} from "mongoose";

export interface GroupDocumentInterface extends Document {
    _id: string;
    name: string;
    ownerId: string;
    ownerUsername: string;
    logo: string;
    description: string;
    createdOn: Date;
    lastModifiedOn: number;
    userCount: number;
    isPublic: boolean;

    validateData(): Promise <string[]>;
}


export interface GroupModelInterface extends Model<GroupDocumentInterface> {
}