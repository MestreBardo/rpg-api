import { Router } from 'express';
export abstract class CommonRoutesConfig {
    name: string;
    router: Router;
    constructor(name: string, router: Router) {
        this.name = name;
        this.router = router;
        this.initRoutes();
    }
    getName() {
        return this.name;
    }
    abstract initRoutes(): Router;
}