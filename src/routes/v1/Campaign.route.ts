import { Router } from 'express';
import { CreateCampaignController } from '../../controllers/campaign/CreateCampaign.controller';
import { RetrieveCampaignController } from '../../controllers/campaign/RetrieveCampaign.controller';
import { SaveCampaignTemplateController } from '../../controllers/campaign/SaveCampaignTemplate.controller';
import { RetrieveCampaignSessionsController } from '../../controllers/campaign/RetrieveCampaignSessions.controller';
import { UpdateCampaignController } from '../../controllers/campaign/UpdateCampaign.controller';
import { UpdateCampaignNameController } from '../../controllers/campaign/UpdateCampaignName.controller';
import { JwtVerificationMiddleware } from '../../core/handles/Jwt/JwtVerification.middleware';


class CampaignRoute {
    static create() {
        const router = Router();
        router.use(
            JwtVerificationMiddleware.handle,
        );

        router.post(
            "",
            CreateCampaignController.handle
        );

        router.get(
            "/:id",
            RetrieveCampaignController.handle
        )

        router.get(
            "/:id/sessions",
            RetrieveCampaignSessionsController.handle
        );

        router.patch(
            "/:id/name",
            UpdateCampaignNameController.handle
        );

        router.patch(
            "/:id/template",
            SaveCampaignTemplateController.handle
        );

        router.put(
            "/:id",
            UpdateCampaignController.handle
        );


        // router.delete(
        //     "/:campaignId/leave",
        //     Validator.validate(
        //         JwtValidator.schema,
        //         ValidationSource.HEADER
        //     ),
        //     Validator.validate(
        //         CampaignIdValidator.schema
        //     ),
        //     Validator.validate(
        //         CampaignIdValidator.schema,
        //         ValidationSource.PARAMS
        //     ),
        //     JwtVerification.handle,
        //     UserTokenFind.handle,
        //     CampaignCheckRole.handle(
        //         ["player"]
        //     ),
        //     CampaignLeave.handle
        // );

        


        return router;
    }
}

export {
    CampaignRoute
}