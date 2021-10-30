import { Router } from "express";
import { AuthorizationRoute } from "./Authorization.route";
import { GroupsRoute } from "./Groups.route";
import { UsersRoute } from "./Users.route";

class Routes {
    static create(): Router {
        const router = Router();

        router.use(
            "/Authorization", 
            AuthorizationRoute.create()
        );

        router.use(
            "/Users", 
            UsersRoute.create()
        );

        router.use(
            "/Groups", 
            GroupsRoute.create()
        );
        
        return router;
    }
}

export {
    Routes
}