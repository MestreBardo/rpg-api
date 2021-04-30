"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRoutesConfig = void 0;
class CommonRoutesConfig {
    constructor(name, router) {
        this.name = name;
        this.router = router;
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }
}
exports.CommonRoutesConfig = CommonRoutesConfig;
