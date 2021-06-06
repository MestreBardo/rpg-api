import { Request, Response } from 'express';
import ErrorWithMessages from '../../common/errorWithMessages';
import playerModel from '../players/player.model';
import userModel from '../users/user.model';
import campaignModel from './campaign.model';
import httpResponse from "../../services/httpResponse.service";
import memberModel from '../members/member.model';

export const postCampaign = async (req: Request, res: Response) => {
    try {
        
        const campaign = new campaignModel(req.body);
        campaign.userCount = 1;

        await campaign.save();
        const player = new playerModel({
            user: campaign.owner,
            campaign: campaign._id,
            role: "master"
        });
        await player.save();

        await userModel.findByIdAndUpdate(campaign.owner, {
            $inc: {
                campaignCount: 1
            }
        }, {new: true});
        return httpResponse.created(res, [campaign])
    }
    catch (error) {
        if(error instanceof ErrorWithMessages)
            return httpResponse[error.status](res, [error.messages]);

        return httpResponse.internalServerError(res, [error.message])
    }


}

// export const getCampaignUsers = async (req: Request, res: Response) => {
//     try {
//         const players = await memberModel.find({campaign: req.body.id}).select("user since").populate('user', {username: 1, email: 1, avatar: 1}).lean();
        
//         return httpResponse.created(res, [campaign])
//     }
//     catch (error) {
//         if(error instanceof ErrorWithMessages)
//             return httpResponse[error.status](res, [error.messages]);

//         return httpResponse.internalServerError(res, [error.message])
//     }


// }