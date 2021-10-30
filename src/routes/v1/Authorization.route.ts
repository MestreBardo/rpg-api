import { Router } from "express";
import { ValidationSource } from "../../common/enums/ValidationSource.enum";
import { ExternalCode } from "../../common/validators/User/ExternalCode.joi";
import { LoginValidator } from "../../common/validators/Auth/Login.joi";
import { UserValidator } from "../../common/validators/User/User.joi";
import { GoogleUser } from "../../core/handles/Authorization/GoogleUser.handle";
import { SignIn } from "../../core/handles/Authorization/SignIn.handle";
import { SignUp } from "../../core/handles/Authorization/Signup.handle";
import { UserDuplicity } from "../../core/handles/User/UserDuplicity.handle";
import { Validator } from "../../helpers/Validator";

class AuthorizationRoute {
    static create() {
        const router = Router();

        router.post(
            "/google",
            Validator.validate(
                ExternalCode.schema,
                ValidationSource.QUERY 
            ),
            GoogleUser.handle
        );
        router.post(
            "/signup",
            Validator.validate(
                UserValidator.schema
            ),
            UserDuplicity.handle,
            SignUp.handle
        );
        router.post(
            "/signin",
            Validator.validate(
                LoginValidator.schema
            ),
            SignIn.handle
        )

        return router;
    }
}

export {
    AuthorizationRoute
}