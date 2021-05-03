import {
    CommonRoutesConfig
} from '../common/common.routes.config';
import {
    Router,
    Request,
    Response
} from 'express';
import {
    methodNotAllowed
} from '../controllers/common.controller';
import {
    getUser,
    getUsers,
    patchUserPassword,
    patchUserEmail,
    patchUserUsername,
    inactiveUser
} from '../controllers/users.controller';

export class UsersRoutes extends CommonRoutesConfig {
    constructor() {
        super('users', Router());

    }
    initRoutes(): Router {
        this.router.route('')
            .get(getUsers)
            .all(methodNotAllowed)

        this.router.route('/:id')
            .get(getUser)
            .delete(inactiveUser)
            .all(methodNotAllowed)

        this.router.route('/:id/password')
            .patch(patchUserPassword)
            .all(methodNotAllowed)

        this.router.route('/:id/email')
            .patch(patchUserEmail)
            .all(methodNotAllowed)

        this.router.route('/:id/username')
            .patch(patchUserUsername)
            .all(methodNotAllowed)


        this.router.route('*')
            .all(methodNotAllowed)

        return this.router;
    }
}