import { Router } from 'express';
import { ValidationSource } from '../../common/enums/ValidationSource.enum';
import { JwtValidator } from '../../common/validators/Auth/Jwt.joi';
import { UserIdValidator } from '../../common/validators/User/UserId.joi';
import { UserUpdateValidator } from '../../common/validators/User/UserUpdate.joi';
import { JwtVerification } from '../../core/handles/Jwt/JwtVerification.handle';
import { UserFindOne } from '../../core/handles/User/UserFindOne.handle';
import { UserUpdate } from '../../core/handles/User/UserUpdate.handle';
import { Validator } from '../../helpers/Validator';
import { UserEmailUpdate } from '../../core/handles/User/UserUpdateEmail.handle';
import { UserPasswordUpdate } from '../../core/handles/User/UserPasswordUpdate.handle';
import { UserUsernameUpdate } from '../../core/handles/User/UserUsernameUpdate.handle';
import { UserUpdateEmailValidator } from '../../common/validators/User/UserUpdateEmail.joi';
import { UserUpdatePasswordValidator } from '../../common/validators/User/UserUpdatePassword.joi';
import { UserUpdateUsernameValidator } from '../../common/validators/User/UserUpdateUsename.joi';
import { UserDuplicity } from '../../core/handles/User/UserDuplicity.handle';
import { UserTokenFind } from '../../core/handles/User/UserTokenFind.handle';
import { UserFindMe } from '../../core/handles/User/UserFindMe.handle';
import { UserCheckPassword } from '../../core/handles/User/UserCheckPassword.handle';

class UsersRoute {
    static create() {
        const router = Router();

        //JWT check authorization
        router.use(
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            JwtVerification.handle,
        )

        //Get token sender user
        router.get(
            "/me",
            UserFindMe.handle
        );

        //Get a single user
        router.get(
            "/:userId",
            Validator.validate(
                UserIdValidator.schema,
                ValidationSource.PARAMS
            ),
            UserFindOne.handle
        );

        
        
        //Update user
        router.put(
            "",
            Validator.validate(
                UserUpdateValidator.schema
            ),
            UserTokenFind.handle,
            UserCheckPassword.handle,
            UserUpdate.handle
        );

        //Update user email
        router.patch(
            "/email",
            Validator.validate(
                UserUpdateEmailValidator.schema
            ),
            UserDuplicity.handle,
            UserTokenFind.handle,
            UserCheckPassword.handle,
            UserEmailUpdate.handle
        );

        //Update user password
        router.patch(
            "/password",
            Validator.validate(
                UserUpdatePasswordValidator.schema
            ),
            UserTokenFind.handle,
            UserCheckPassword.handle,
            UserPasswordUpdate.handle
        );

        //Update user username
        router.patch(
            "/username",
            Validator.validate(
                UserUpdateUsernameValidator.schema
            ),
            UserTokenFind.handle,
            UserDuplicity.handle,
            UserCheckPassword.handle,
            UserUsernameUpdate.handle
        );


        return router;
    }
}

export {
    UsersRoute
}