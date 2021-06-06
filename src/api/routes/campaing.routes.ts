import { postCampaign } from './../components/campaigns/campaign.controller';
import { Router } from 'express';
import { CommonRoutesConfig } from "../common/common.routes.config";
import { checkTokenValidity, methodNotAllowed } from '../middlewares/authorization.middleware';

export class CampaingRoutes extends CommonRoutesConfig {
    
    constructor() {
        super('campaigns', Router());
    }

    initRoutes(): Router {
        this.router
            .route("")
            .all(checkTokenValidity)
            .post(postCampaign)
            .all(methodNotAllowed)
    
        // this.router
        //     .route("/register")
        //     .post(register)
        //     .all(methodNotAllowed)

        return this.router;
    }

}