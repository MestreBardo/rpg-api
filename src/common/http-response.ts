import {
    Response,
    Request,
    NextFunction
} from 'express';

export default new class HttpResponse {
    private response!: Response;
    private entity: string = "";
    private HTTP_OK = 200;
    private HTTP_CREATED = 201;
    private HTTP_ACCEPTED = 202;
    private HTTP_NO_CONTENT = 204;
    private HTTP_BAD_REQUEST = 400;
    private HTTP_UNAUTHORIZED = 401;
    private HTTP_FORBIDDEN = 402;
    private HTTP_NOT_FOUND = 404;
    private HTTP_METHOD_NOT_ALLOWED = 405;
    private HTTP_NOT_ACCEPTABLE = 406;
    private HTTP_CONFLICT = 409;
    private HTTP_GONE = 410;
    private HTTP_UNPROCESSABLE_ENTITY = 422;
    private HTTP_INTERNAL_SERVER_ERROR = 500;
    private HTTP_NOT_IMPLEMENTED = 501;


    ok(response: any  = []) {
        this.response
            .status(this.HTTP_OK)
            .send({
                entity: this.entity,
                status: "OK",
                payload: response
            });
    }

    created(response: any  = []) {
        this.response
            .status(this.HTTP_CREATED)
            .send({
                entity: this.entity,
                status: "CREATED",
                payload: response
            });
    }

    accepted(response: any  = []) {
        this.response
        .status(this.HTTP_ACCEPTED)
        .send({
            entity: this.entity,
            status: "ACCEPTED",
            payload: response
        });
    }

    noContent(response: any  = []) {
        this.response
        .status(this.HTTP_NO_CONTENT)
        .send({
            entity: this.entity,
            status: "NO CONTENT",
            payload: response
        });
    }

    badRequest(response: any  = []) {
        this.response
        .status(this.HTTP_BAD_REQUEST)
        .send({
            entity: this.entity,
            status: "BAD_REQUEST",
            payload: response
        });
    }

    unauthorized(response: any = []) {
        this.response
        .status(this.HTTP_UNAUTHORIZED)
        .send({
            entity: this.entity,
            status: "UNAUTHORIZED",
            payload: response
        });
    }

    forbidden(response: any = []) {
        this.response
        .status(this.HTTP_FORBIDDEN)
        .send({
            entity: this.entity,
            status: "FORBIDDEN",
            payload: response
        });
    }

    notFound(response: any = []) {
        this.response
        .status(this.HTTP_NOT_FOUND)
        .send({
            entity: this.entity,
            status: "NOT FOUND",
            payload: response
        });
    }

    methodNotAllowed(response: any = []) {
        this.response
        .status(this.HTTP_METHOD_NOT_ALLOWED)
        .send({
            entity: this.entity,
            status: "METHOD NOT ALLOWED",
            payload: response
        });
    }

    notAcceptable(response: any = []) {
        this.response
        .status(this.HTTP_NOT_ACCEPTABLE)
        .send({
            entity: this.entity,
            status: "NOT ACCEPTABLE",
            payload: response
        });
    }

    conflict(response: any = []) {
        this.response
        .status(this.HTTP_CONFLICT)
        .send({
            entity: this.entity,
            status: "CONFLICT",
            payload: response
        });
    }

    gone(response: any = []) {
        this.response
        .status(this.HTTP_GONE)
        .send({
            entity: this.entity,
            status: "GONE",
            payload: response
        });
    }

    unprocessableEntity(response: any = []) {
        this.response
        .status(this.HTTP_UNPROCESSABLE_ENTITY)
        .send({
            entity: this.entity,
            status: "UNPROCESSABLE ENTITY",
            payload: response
        });
    }

    internalServerError(response: any = []) {
        this.response
        .status(this.HTTP_INTERNAL_SERVER_ERROR)
        .send({
            entity: this.entity,
            status: "INTERNAL SERVER ERROR",
            payload: response
        });
    }

    notImplemented(response: any = []) {
        this.response
        .status(this.HTTP_NOT_IMPLEMENTED)
        .send({
            entity: this.entity,
            status: "NOT IMPLEMENTED",
            payload: response
        });
    }


    build = (req: Request, res: Response, next: NextFunction) => {
        this.entity = req.path.split("/").filter(path => path !== "")[0].toUpperCase();
        this.response = res;
        next();
    }



}