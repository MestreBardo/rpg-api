import { NextFunction } from 'express';
import { Response } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from '../../common/extended_types/express/Request.extended';
import { HttpSendService } from '../../core/services/HttpSend.service';
import { RemoveSessionService } from '../../core/services/session/RemoveSession.service';
class RemoveSessionController {
    static async handle(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const sessionId = req.params.id;
            await RemoveSessionService.execute(sessionId);
            HttpSendService.execute(req, res, HttpStatus.OK, {}) 
        } catch (error) {
            next(error);
        }
    }
}

export { RemoveSessionController };