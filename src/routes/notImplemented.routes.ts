import { Router } from 'express';
import { CommonRoutesConfig } from "../common/common.routes.config";
import { notImplemented } from '../controllers/common.controller';

export class NotImplementedRoutes extends CommonRoutesConfig {
    
    constructor() {
        super('*', Router());
    }

    initRoutes(): Router {

        this.router.route("")
        .get(notImplemented)
        .post(notImplemented)
        .put(notImplemented)
        .delete(notImplemented)
        .patch(notImplemented)

        return this.router
    }
    
}