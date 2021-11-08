import { Router } from "express";
import { SignupController } from "../../controllers/authorization/Signup.controller";
import { SigninController } from "../../controllers/authorization/Signin.controller";

class AuthorizationRoute {
    static create() {
        const router = Router();

        router.post(
            "/signup",
            SignupController.handle
        );
        router.post(
            "/signin",
            SigninController.handle
        )

        return router;
    }
}

export {
    AuthorizationRoute
}