import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User.model";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const testa = await UserModel.getByEmailOrUsername(req.body.email);
    console.log(testa);
    res.send(testa);
};


export {
    getUsers
}