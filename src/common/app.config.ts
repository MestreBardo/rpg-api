import express, { Application, Express, Request, Response } from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import DatabaseConfig from './database.config';

export default class AppConfig {
    private app: Application;
    private port: number;
    private dataBase: DatabaseConfig;
    constructor (port: number = 3000, dataBase: DatabaseConfig) {
        this.app = express();
        this.app.get("", (req: Request, res: Response) => {
            console.log("teste")
            res.send("teste")
        })
        this.port = port;
        this.dataBase = dataBase;
    }

    async init() {
        await this.dataBase.connect()
        this.app.listen(this.port, () => {
            console.log("LISTEN...IT'S TIME")
        })
        
    }

    addMiddleware(middleware: any) {
        this.app.use(middleware);
        return this
    }

    addRoute(route: CommonRoutesConfig) {
        this.app.use(`/${route.name}`, route.initRoutes());
        return this
    }


   
}