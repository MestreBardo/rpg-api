import { Router } from 'express';
import { CommonRoutesConfig } from "../common/common.routes.config";
import { checkTokenValidity, methodNotAllowed } from '../middlewares/authorization.middleware';

export class SystemRoutes extends CommonRoutesConfig {
    
    constructor() {
        super('systems', Router());
    }

    initRoutes(): Router {
        this.router
            .route("")
            .all(checkTokenValidity)
            .post()
            .all(methodNotAllowed)
    
        // this.router
        //     .route("/register")
        //     .post(register)
        //     .all(methodNotAllowed)

        return this.router;
    }

}