import { Response, NextFunction } from 'express';
import { HttpStatus } from '../../common/constants/HttpStatus.enum';
import { RequestWithUser } from "../../common/extended_types/express/Request.extended";
import { RetrieveCampaignPlayersService } from '../../core/services/campaign/RetrieveCampaignPlayers.service';
import { RetrieveGroupMembersService } from '../../core/services/group/RetrieveGroupsMembers.service';
import { HttpSendService } from '../../core/services/HttpSend.service';

class RetrieveCampaignPlayersController {
    static async handle(req: RequestWithUser, res: Response, next:NextFunction) {
        try {
            const campaign = { id: req.params["id"] }
            const campaignPlayers = await  RetrieveCampaignPlayersService.execute(campaign["id"]);
            HttpSendService.execute(req, res, HttpStatus.OK, campaignPlayers);

        } catch (error) {
            next(error);
        }
    }
}

export { RetrieveCampaignPlayersController };