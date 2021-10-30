import { Router } from 'express';
import { ValidationSource } from '../../common/enums/ValidationSource.enum';
import { JwtValidator } from '../../common/validators/Auth/Jwt.joi';
import { UserIdValidator } from '../../common/validators/User/UserId.joi';
import { UserPutValidator } from '../../common/validators/User/UserPut.joi';
import { JwtVerification } from '../../core/handles/Jwt/JwtVerification.handle';
import { UserFind } from '../../core/handles/User/UserFind.handle';
import { UserPut } from '../../core/handles/User/UserPut.handle';
import { UserPossession } from '../../core/handles/User/UserPossession.handle';
import { Validator } from '../../helpers/Validator';
import { EmailPatch } from '../../core/handles/User/EmailPatch.handle';
import { PasswordPatch } from '../../core/handles/User/PasswordPatch.handle';
import { UsernamePatch } from '../../core/handles/User/UsernamePatch.handle';
import { EmailPatchValidator } from '../../common/validators/User/EmailPatch.joi';
import { PasswordPatchValidator } from '../../common/validators/User/PasswordPatch.joi';
import { UsernamePatchValidator } from '../../common/validators/User/UsenamePatch.joi';
import { UserDuplicity } from '../../core/handles/User/UserDuplicity.handle';
import { UserTokenFind } from '../../core/handles/User/UserTokenFind.handle';
import { FindMe } from '../../core/handles/User/FindMe.handle';

class UsersRoute {
    static create() {
        const router = Router();

        router.get(
            "/:userId",
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            Validator.validate(
                UserIdValidator.schema,
                ValidationSource.PARAMS
            ),
            JwtVerification.handle,
            UserFind.handle
        );

        router.get(
            "/my",
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            JwtVerification.handle,
            UserTokenFind.handle,
            FindMe.handle
        );
        
        router.put(
            "",
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            Validator.validate(
                UserPutValidator.schema
            ),
            JwtVerification.handle,
            UserTokenFind.handle,
            UserPut.handle
        );

        router.patch(
            "/email",
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            Validator.validate(
                EmailPatchValidator.schema
            ),
            JwtVerification.handle,
            UserDuplicity.handle,
            UserTokenFind.handle,
            EmailPatch.handle
        );

        router.patch(
            "/password",
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            Validator.validate(
                PasswordPatchValidator.schema
            ),
            JwtVerification.handle,
            UserTokenFind.handle,
            PasswordPatch.handle
        );

        router.patch(
            "/username",
            Validator.validate(
                JwtValidator.schema,
                ValidationSource.HEADER
            ),
            Validator.validate(
                UsernamePatchValidator.schema
            ),
            JwtVerification.handle,
            UserDuplicity.handle,
            UserTokenFind.handle,
            UsernamePatch.handle
        );


        return router;
    }
}

export {
    UsersRoute
}