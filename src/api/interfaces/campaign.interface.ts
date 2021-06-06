import {
    Document,
    Model
} from "mongoose";

export interface CampaignDocumentInterface extends Document {
    _id: string;
    name: string;
    owner: string;
    logo: string;
    description: string;
    createdOn: Date;
    lastModifiedOn: number;
    userCount: number;
    isPublic: boolean;

    validateData(): Promise <string[]>;
}


export interface CampaignModelInterface extends Model<CampaignDocumentInterface> {
    
}