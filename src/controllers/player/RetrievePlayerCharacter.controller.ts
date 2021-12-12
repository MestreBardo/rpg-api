import { NextFunction, Response } from "express";
import { HttpStatus } from "../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { RetrievePlayerCharacterService } from "../../core/services/campaign/RetrievePlayerCharacter.service";
import { HttpSendService } from "../../core/services/HttpSend.service";

class RetrievePlayerCharacterController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const playerId = req.params.id;
            const player = await RetrievePlayerCharacterService.execute(user, playerId);
            HttpSendService.execute(req, res, HttpStatus.OK, player) 
        } catch (error) {
            next(error);
        }
    }
}


export { RetrievePlayerCharacterController}