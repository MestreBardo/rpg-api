import  express, { NextFunction, Request, Response }  from "express"
import { Routes } from "./routes/v1/Routes";
import cors from 'cors';

const app = express();

app.use(
    express.json(
        {
            limit: "10mb"
        }
    )
);

app.use(
    "/v1",
    Routes.create()
);

app.use(cors())

app.use(
    (err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.statusCode || 500).json({
            uri: req.url,
            method: req.method,
            data: err.data || err.message || err.toString(),
        });
    }
)

export {
    app
}
