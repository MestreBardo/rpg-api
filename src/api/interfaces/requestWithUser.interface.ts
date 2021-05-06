import { Request } from "express";

export default interface RequestWithUserInterface extends Request {
    user: any;
}