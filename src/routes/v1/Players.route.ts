import { Router } from "express";
import { LeavePlayerCampaignController } from "../../controllers/player/LeavePlayerCampaign.controller";
import { RemovePlayerCampaignController } from "../../controllers/player/RemovePlayerCampaign.controller";
import { RetrievePlayerCharacterController } from "../../controllers/player/RetrievePlayerCharacter.controller";
import { UpdateCharacterController } from "../../controllers/player/UpdateCharacter.controller";
import { JwtVerificationMiddleware } from "../../core/handles/Jwt/JwtVerification.middleware";
import { LeaveCampaignPlayerService } from "../../core/services/campaign/LeaveCampaignPlayer.service";
import { RemoveCampaignPlayerService } from "../../core/services/campaign/RemoveCampaignPlayer.service";

class PlayersRoute {
    static create() {
        const router = Router();

        //JWT check authorization
        router.use(
            JwtVerificationMiddleware.handle,
        )

        router.put(
            '/:id/character',
            UpdateCharacterController.handle,
        );
        router.delete(
            '/:id',
            RemovePlayerCampaignController.handle,
        );

        router.delete(
            '/:id/leave',
            LeavePlayerCampaignController.handle,
        );

        router.get(
            '/:id/character',
            RetrievePlayerCharacterController.handle,
        );

       

        return router;
    }
}


export {
    PlayersRoute
}