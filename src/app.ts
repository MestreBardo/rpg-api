import  express, { NextFunction, Request, Response }  from "express"
import { Routes } from "./routes/v1/Routes";

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
)

app.use(
    (err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.code || 500).json({
            path: req.path,
            method: req.method,
            code: err.code || 500,
            payload: err.payload
        });
    }
)

export {
    app
}
