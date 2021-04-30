"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const express_1 = require("express");
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor() {
        super('Users', express_1.Router());
    }
    configureRoutes() {
        return this.router;
    }
}
exports.UsersRoutes = UsersRoutes;
