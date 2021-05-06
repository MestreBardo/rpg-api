import { Model } from "mongoose";

import UserDocumentInterface from "./user.document.interface"

export default interface UserModelInterface extends Model<UserDocumentInterface> {
    getByEmailOrUsername(username: string, email: string): Promise<UserDocumentInterface>
    getByTextToSearch(textToSearch: string, page: number): Promise<UserDocumentInterface[]>
}