import { Router } from 'express';
import { CommonRoutesConfig } from "../common/common.routes.config";
import { methodNotAllowed } from '../controllers/common.controller';
import { login, register } from '../controllers/users.controller';

export class AuthRoutes extends CommonRoutesConfig {
    
    constructor() {
        super('auth', Router());
    }

    initRoutes(): Router {
        this.router
            .route("/login")
            .get(methodNotAllowed)
            .post(login)
            .put(methodNotAllowed)
            .patch(methodNotAllowed)
            .delete(methodNotAllowed);

        this.router
            .route("/register")
            .get(methodNotAllowed)
            .post(register)
            .put(methodNotAllowed)
            .patch(methodNotAllowed)
            .delete(methodNotAllowed);

        return this.router;
    }

}