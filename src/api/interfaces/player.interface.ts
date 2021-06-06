import {
    Document,
    Model
} from "mongoose";

export interface PlayerDocumentInterface extends Document {
    _id: string
    player: string;
    campaign: string;
    since: Date;
    role: string;
    activeCharacter: string;
    character: string[];

}


export interface PlayerModelInterface extends Model<PlayerDocumentInterface> {
}