"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const http = __importStar(require("http"));
const express_1 = __importDefault(require("express"));
const throng_1 = __importDefault(require("throng"));
const helmet_1 = __importDefault(require("helmet"));
const app_config_1 = __importDefault(require("./common/app.config"));
const app = express_1.default();
const server = http.createServer(app);
const port = 3000;
const routes = [];
const WORKERS = process.env.WEB_CONCURRENCY || 1;
const start = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const app = new app_config_1.default(port);
    app
        .addMiddleware(body_parser_1.default.json())
        .addMiddleware(cors_1.default())
        .addMiddleware(helmet_1.default())
        .addRoute()
        .init();
    // console.log(id);
    // app.use(bodyParser.json());
    // app.use(cors());
    // app.use(helmet());
    // app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    //     res.status(err.statusCode ?? 500).send({
    //         errors: err.message
    //     })
    // });
    // routes.push(new UsersRoutes(app));
    // server.listen(port, () => {
    //     console.log("teste")
    //     routes.forEach((route: CommonRoutesConfig) => {
    //         console.log(`Routes configured for ${route.getName()}`);
    //     });
    // })
});
throng_1.default({
    workers: WORKERS,
    lifetime: Infinity,
    start
});
