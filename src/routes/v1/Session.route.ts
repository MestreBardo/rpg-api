import { Router } from 'express';
import { CreateSessionController } from '../../controllers/session/CreateSession.controller';
import { RetrieveCampaignController } from '../../controllers/campaign/RetrieveCampaign.controller';
import { UpdateCampaignController } from '../../controllers/campaign/UpdateCampaign.controller';
import { UpdateCampaignNameController } from '../../controllers/campaign/UpdateCampaignName.controller';
import { JwtVerificationMiddleware } from '../../core/handles/Jwt/JwtVerification.middleware';
import { RemoveSessionController } from '../../controllers/session/RemoveSession.controller';



class SessionRoute {
    static create() {
        const router = Router();
        router.use(
            JwtVerificationMiddleware.handle,
        );

        router.post(
            "",
            CreateSessionController.handle
        );

        router.delete(
            "/:id",
            RemoveSessionController.handle
        )

        // router.patch(
        //     "/:id/name",
        //     UpdateCampaignNameController.handle
        // );

        // router.put(
        //     "/:id",
        //     UpdateCampaignController.handle
        // );


        return router;
    }
}

export {
    SessionRoute
}