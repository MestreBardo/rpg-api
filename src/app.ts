import {
    UsersRoutes
} from './api/routes/user.routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet'
import AppConfig from './config/app.config';
import DatabaseConfig from './config/database.config';
import { AuthRoutes } from './api/routes/auth.routes';
import { DefaultRoutes } from './api/routes/default.routes';
import { GroupRoutes } from './api/routes/group.routes';


const port = +`${process.env.PORT}` || 4000;


const WORKERS = process.env.WEB_CONCURRENCY || 1
const DB_USER = `${process.env.DB_USER}`
const DB_PASS = `${process.env.DB_PASS}`
const DB_BASE = `${process.env.DB_BASE}`

const start = async (id: number) => {
    try {
        const app = new AppConfig(
            port, 
            new DatabaseConfig(
                DB_USER,
                DB_PASS,
                DB_BASE
            ));
        await app
        .addMiddleware(bodyParser.json())
        .addMiddleware(cors({exposedHeaders: ['Accept-Language',
        'Access-Control-Allow-Origin',
       'Connection', 'Content-Length', 'Content-Type', 'Date',
        'Etag', 'Server', 'Via', 'X-Powered-By']}))
        .addMiddleware(helmet())
        .addRoute(new AuthRoutes())
        .addRoute(new UsersRoutes())
        .addRoute(new GroupRoutes())
        .addRoute(new DefaultRoutes())
        .init();

    } catch (error) {
        console.error(error);
    }

}

start(4);

// throng({
//     workers: WORKERS,
//     lifetime: Infinity,
//     start
// })