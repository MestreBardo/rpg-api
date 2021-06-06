import { Request, Response } from 'express';
import ErrorWithMessages from '../../common/errorWithMessages';
import systemModel from './system.model';
import httpResponse from "../../services/httpResponse.service";

export const postSystem = async (req: Request, res: Response) => {
    try {
        const system = new systemModel(req.body);
        await system.save()
        return httpResponse.ok(res, {system})

    } catch (error) {
        if(error instanceof ErrorWithMessages)
            return httpResponse[error.status](res, [error.messages]);

        return httpResponse.internalServerError(res, [error.message])
    }
}