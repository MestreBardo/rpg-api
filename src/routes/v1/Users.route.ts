import { Router } from 'express';
import { JwtVerificationMiddleware } from '../../core/handles/Jwt/JwtVerification.middleware';
import { UpdateUserController } from '../../controllers/user/UpdateUser.controller';
import { UpdateUserEmailController } from '../../controllers/user/UpdateUserEmail.controller';
import { UpdateUserUsernameController } from '../../controllers/user/UpdateUserUsername.controller';
import { UpdateUserPasswordController } from '../../controllers/user/UpdateUserPassword.controller';
import { RetrieveUserController } from '../../controllers/user/RetrieveUser.controller';
import { RetrieveUserSignedController } from '../../controllers/user/RetrieveUserSigned.controller';
import { RetrieveUserSignedGroupsController } from '../../controllers/user/RetrieveUserSignedGroups.controller';
import { RetrieveUserSignedCampaignsController } from '../../controllers/user/RetrieveUserSignedCampaigns.controller';

class UsersRoute {
    static create() {
        const router = Router();

        //JWT check authorization
        router.use(
            JwtVerificationMiddleware.handle,
        )

        //Get token sender user
        router.get(
            "/me",
            RetrieveUserSignedController.handle
        );


        router.get(
            "/groups",
            RetrieveUserSignedGroupsController.handle
        );

        router.get(
            "/campaigns",
            RetrieveUserSignedCampaignsController.handle
        );

        //Get a single user
        router.get(
            "/:userId",
            RetrieveUserController.handle
        );

    
        //Update user
        router.put(
            "",
            UpdateUserController.handle
        );

        //Update user email
        router.patch(
            "/email",
            UpdateUserEmailController.handle
        );

        //Update user password
        router.patch(
            "/password",
            UpdateUserPasswordController.handle
        );

        //Update user username
        router.patch(
            "/username",
            UpdateUserUsernameController.handle
        );


        return router;
    }
}

export {
    UsersRoute
}