import { Router } from 'express';
import { CommonRoutesConfig } from "../common/common.routes.config";
import { methodNotAllowed } from '../middlewares/authorization.middleware';

export class DefaultRoutes extends CommonRoutesConfig {
    
    constructor() {
        super('', Router());
    }

    initRoutes(): Router {
        this.router
        .route('*')
        .all(methodNotAllowed)
    
        return this.router;
    }

}