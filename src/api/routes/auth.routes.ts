import { Router } from 'express';
import { CommonRoutesConfig } from "../common/common.routes.config";
import { methodNotAllowed } from '../middlewares/authorization.middleware';
import { login, register } from '../components/users/user.controller';

export class AuthRoutes extends CommonRoutesConfig {
    
    constructor() {
        super('auth', Router());
    }

    initRoutes(): Router {
        this.router
            .route("/login")
            .post(login)
            .all(methodNotAllowed)
    
        this.router
            .route("/register")
            .post(register)
            .all(methodNotAllowed)

        return this.router;
    }

}