import {
    CommonRoutesConfig
} from '../common/common.routes.config';

import {
    Router,
} from 'express';


import {
    getUser,
    getUsers,
    patchUserPassword,
    patchUserEmail,
    patchUserUsername,
    inactiveUser,
    getUserGroups
} from '../components/users/user.controller';
import {
    checkTokenValidity,
    methodNotAllowed,
    checkUserOwnership
} from '../middlewares/authorization.middleware';


export class UsersRoutes extends CommonRoutesConfig {
    constructor() {
        super('users', Router());

    }
    initRoutes(): Router {
        this.router.route('')
            .all(checkTokenValidity)
            .get(getUsers)
            .post(methodNotAllowed)
            .put(methodNotAllowed)
            .patch(methodNotAllowed)
            .delete(methodNotAllowed)

        this.router.route('/:id')
            .all(checkTokenValidity, checkUserOwnership)
            .get(getUser)
            .post(methodNotAllowed)
            .put(methodNotAllowed)
            .patch(methodNotAllowed)
            .delete(inactiveUser)


        this.router.route('/:id/password')
            .all(checkTokenValidity, checkUserOwnership)
            .get(methodNotAllowed)
            .post(methodNotAllowed)
            .put(methodNotAllowed)
            .patch(patchUserPassword)
            .delete(methodNotAllowed)

        this.router.route('/:id/email')
            .all(checkTokenValidity, checkUserOwnership)
            .get(methodNotAllowed)
            .post(methodNotAllowed)
            .put(methodNotAllowed)
            .patch(patchUserEmail)
            .delete(methodNotAllowed)

        this.router.route('/:id/username')
            .all(checkTokenValidity, checkUserOwnership)
            .get(methodNotAllowed)
            .post(methodNotAllowed)
            .put(methodNotAllowed)
            .patch(patchUserUsername)
            .delete(methodNotAllowed)

        this.router.route('/:id/groups')
            .all(checkTokenValidity)
            .get(getUserGroups)
            .post(methodNotAllowed)
            .put(methodNotAllowed)
            .patch(methodNotAllowed)
            .delete(methodNotAllowed)


        this.router.route('*')
            .all(methodNotAllowed)

        return this.router;
    }
}