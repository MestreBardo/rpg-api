import {CommonRoutesConfig} from '../common/common.routes.config';
import {Router, Response, Request} from 'express';
import { getUsers } from '../controllers/users.controller';

export class UsersRoutes extends CommonRoutesConfig {
    constructor() {
        super('users', Router());
        
    }
    initRoutes() {
        this.router.route('')
        .get((req: Request, res: Response) => {
            res.sendStatus(405);
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
            res.sendStatus(200);
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