import { NextFunction, Response } from "express";
import { HttpStatus } from "../../common/constants/HttpStatus.enum";
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { UpdateCharacterService } from "../../core/services/campaign/UpdateCharacter.service";
import { HttpSendService } from "../../core/services/HttpSend.service";

class UpdateCharacterController {
  static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const character = req.body;
            const player = req.params.id;
            await UpdateCharacterService.execute(player, character);
            HttpSendService.execute(req, res, HttpStatus.OK, player) 
        } catch (error) {
            next(error);
        }

   }
}

export { UpdateCharacterController}