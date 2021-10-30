import { Request, Response } from "express";
import { HttpStatus } from "../constants/HttpStatus.enum";
import { BadRequest } from "./BadRequest.error";
import { Conflict } from "./Conflict.error";
import { Created } from "./Created.success";
import { Gone } from "./Gone.error";
import { NotFound } from "./NotFound.error";
import { Ok } from "./Ok.success";
import { Unauthorized } from "./Unauthorized.error";
import { UnprocessableEntity } from "./UnprocessableEntity.error";

class HttpResponse {

    static create(statusCode: number, req: Request, res: Response, payload: any = {}) {
        let response: any;
        switch (statusCode) {
            case HttpStatus.ok: 
                response = new Ok(payload);
                break;
            case HttpStatus.created: 
                response = new Created(payload);
                break;
            case HttpStatus.unprocessableEntity: 
                response = new UnprocessableEntity(payload);
                break;
            case HttpStatus.badRequest:
                response = new BadRequest(payload);
                break;
            case HttpStatus.conflict:
                response = new Conflict(payload);
                break;
            case HttpStatus.notFound:
                response = new NotFound(payload);
                break;
            case HttpStatus.gone:
                response = new Gone(payload);
                break;
            case HttpStatus.unauthorized:
                response = new Unauthorized(payload);
                break;
            default:
                return console.log(statusCode);
        }

        return res.status(statusCode).send(
            {
                ...response,
                method: req.method,
                path: req.originalUrl
            }
        )
    }


}

export {
    HttpResponse
}