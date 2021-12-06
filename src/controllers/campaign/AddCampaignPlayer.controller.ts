import { Response } from 'express';
import { NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { HttpSendService } from '../../core/services/HttpSend.service';

class AddCampaignPlayerController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const receivedPlayerUser = req.body.user;
            console.log(receivedPlayerUser);
            const player = {}
            HttpSendService.execute(req, res, HttpStatus.OK, player) 
        } catch (error) {
            next(error);
        }
    }
}

export { AddCampaignPlayerController };