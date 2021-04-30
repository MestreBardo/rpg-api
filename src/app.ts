import {
    UsersRoutes
} from './routes/users.routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import throng from 'throng'
import helmet from 'helmet'
import AppConfig from './common/app.config';
import DatabaseConfig from './common/database.config';


const port = 4000;


const WORKERS = process.env.WEB_CONCURRENCY || 1
const DB_USER = process.env.DB_USER || "LittleMonkey"
const DB_PASS = process.env.DB_PASS || "vnWLM50pPApn4Jmw"
const DB_BASE = process.env.DB_BASE || "rollmaster"


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
        .addMiddleware(cors())
        .addMiddleware(helmet())
        .addRoute(new UsersRoutes()).init();

    } catch (error) {
        console.error(error);
    }

}


throng({
    workers: WORKERS,
    lifetime: Infinity,
    start
})