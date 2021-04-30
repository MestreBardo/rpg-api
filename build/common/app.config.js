"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class AppConfig {
    constructor(port = 3000) {
        this.app = express_1.default();
        this.port = port;
    }
    init() {
        this.app.listen(this.port, () => {
            console.log("teste");
        });
    }
    addMiddleware(middleware) {
        this.app.use(middleware);
        return this;
    }
    addRoute(route) {
        this.app.use(route.configureRoutes);
        return this;
    }
}
exports.default = AppConfig;
