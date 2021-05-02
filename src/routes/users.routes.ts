import {CommonRoutesConfig} from '../common/common.routes.config';
import {Router, Request,Response} from 'express';
import httpResponse from '../common/http-response';

export class UsersRoutes extends CommonRoutesConfig {
    constructor() {
        super('users', Router());
        
    }
    initRoutes(): Router {
        this.router.route('')
        .get((req: Request, res: Response) => {
            httpResponse.ok("teste");
        })
        .post((req: Request, res: Response) => {
            res.sendStatus(405);
        })
        .patch((req: Request, res: Response) => {
            res.sendStatus(500);
        })
        .put((req: Request, res: Response) => {
            res.sendStatus(306);
        })
        .delete((req: Request, res: Response) => {
            res.sendStatus(304);
        })

        this.router.route('/:id')
        .get((req: Request, res: Response) => {
            // httpResponse.ok("message");
        })
        .post((req: Request, res: Response) => {
            res.sendStatus(405);
        })
        .patch((req: Request, res: Response) => {
            res.sendStatus(500);
        })
        .put((req: Request, res: Response) => {
            res.sendStatus(306);
        })
        .delete((req: Request, res: Response) => {
            res.sendStatus(304);
        })

        return this.router;
    }
}