import { Router } from "express";
import { ValidationSource } from "../../common/enums/ValidationSource.enum";
import { UserExternalCodeValidator } from "../../common/validators/User/UserExternalCode.joi";
import { LoginValidator } from "../../common/validators/Auth/Login.joi";
import { UserCreateValidator } from "../../common/validators/User/UserCreate.joi";
import { GoogleUser } from "../../core/handles/Authorization/GoogleUser.handle";
import { AuthorizationSignIn } from "../../core/handles/Authorization/AuthorizationSignIn.handle";
import { AuthorizationSignUp } from "../../core/handles/Authorization/AuthorizationSignUp.handle";
import { UserDuplicity } from "../../core/handles/User/UserDuplicity.handle";
import { Validator } from "../../helpers/Validator";

class AuthorizationRoute {
    static create() {
        const router = Router();

        router.post(
            "/google",
            Validator.validate(
                UserExternalCodeValidator.schema,
                ValidationSource.QUERY 
            ),
            GoogleUser.handle
        );
        router.post(
            "/signup",
            Validator.validate(
                UserCreateValidator.schema
            ),
            UserDuplicity.handle,
            AuthorizationSignUp.handle
        );
        router.post(
            "/signin",
            Validator.validate(
                LoginValidator.schema
            ),
            AuthorizationSignIn.handle
        )

        return router;
    }
}

export {
    AuthorizationRoute
}