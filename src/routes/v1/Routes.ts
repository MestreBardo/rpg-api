import { Router } from "express";
import { AuthorizationRoute } from "./Authorization.route";
import { CampaignRoute } from "./Campaign.route";
import { GroupsRoute } from "./Groups.route";
import { PlayersRoute } from "./Players.route";
import { SessionRoute } from "./Session.route";
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
            "/Campaigns", 
            CampaignRoute.create()
        );

        router.use(
            "/Groups", 
            GroupsRoute.create()
        );

        router.use(
            "/Sessions", 
            SessionRoute.create()
        );

        router.use(
            "/Players", 
            PlayersRoute.create()
        );
        
        return router;
    }
}

export {
    Routes
}