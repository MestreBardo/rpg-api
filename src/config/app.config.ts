import express, { Application, NextFunction, Request, Response } from 'express';
import { CommonRoutesConfig } from '../api/common/common.routes.config';
import DatabaseConfig from './database.config';

export default class AppConfig {
    private app: Application;
    private port: number;
    private dataBase: DatabaseConfig;
    constructor (port: number = 3000, dataBase: DatabaseConfig) {
        this.app = express();
        this.app.set('etag', 'strong');
        this.port = port;
        this.dataBase = dataBase;
    }

    async init() {
        await this.dataBase.connect()
        this.app.listen(this.port, () => {
            console.log(`LISTEN...IT'S TIME - PORT ${this.port}`)
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