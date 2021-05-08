import { getGroup } from './../components/groups/group.controller';
import {
    Router
} from "express";
import {
    CommonRoutesConfig
} from "../common/common.routes.config";
import {
    checkTokenValidity,
    methodNotAllowed
} from "../middlewares/authorization.middleware";
import {
    getGroupUsers,
    postGroup
} from "../components/groups/group.controller"

export class GroupRoutes extends CommonRoutesConfig {
    constructor() {
        super('groups', Router())
    }

    initRoutes(): Router {
        this.router.route('')
            .all(checkTokenValidity)
            .get(methodNotAllowed)
            .post(postGroup)
            .put(methodNotAllowed)
            .patch(methodNotAllowed)
            .delete(methodNotAllowed)

        this.router.route('/:id')
            .all(checkTokenValidity)
            .get(getGroup)
            .post(methodNotAllowed)
            .put(methodNotAllowed)
            .patch(methodNotAllowed)
            .delete(methodNotAllowed)

        this.router.route('/:id/users')
            .all(checkTokenValidity)
            .get(getGroupUsers)
            .post(methodNotAllowed)
            .put(methodNotAllowed)
            .patch(methodNotAllowed)
            .delete(methodNotAllowed)




        return this.router;
    }
}