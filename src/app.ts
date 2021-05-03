import { NotImplementedRoutes } from './routes/notImplemented.routes';
import {
    UsersRoutes
} from './routes/users.routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import throng from 'throng'
import helmet from 'helmet'
import AppConfig from './common/app.config';
import DatabaseConfig from './common/database.config';
import httpResponse from './common/http-response';
import { AuthRoutes } from './routes/auth.routes';


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
        .addMiddleware(httpResponse.build)
        .addRoute(new UsersRoutes())
        .addRoute(new AuthRoutes())
        .addRoute(new NotImplementedRoutes())
        .init();

    } catch (error) {
        console.error(error);
    }

}


throng({
    workers: WORKERS,
    lifetime: Infinity,
    start
})