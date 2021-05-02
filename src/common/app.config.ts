import express, { Application, NextFunction, Request, Response } from 'express';
import { CommonRoutesConfig } from './common.routes.config';
import DatabaseConfig from './database.config';
import httpResponse from './http-response';

export default class AppConfig {
    private app: Application;
    private port: number;
    private dataBase: DatabaseConfig;
    constructor (port: number = 3000, dataBase: DatabaseConfig) {
        this.app = express();
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