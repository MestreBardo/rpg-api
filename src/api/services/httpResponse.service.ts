import {
    Response,
    Request,
    NextFunction,
} from 'express';


export default new class HttpResponse {
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


    ok(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_OK)
            .send({
                entity,
                status: "OK",
                payload
            });
    }

    created(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_CREATED)
            .send({
                entity,
                status: "CREATED",
                payload
            });
    }

    accepted(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_ACCEPTED)
            .send({
                entity,
                status: "ACCEPTED",
                payload
            });
    }

    noContent(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_NO_CONTENT)
            .send({
                entity,
                status: "NO CONTENT",
                payload
            });
    }

    badRequest(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_BAD_REQUEST)
            .send({
                entity,
                status: "BAD_REQUEST",
                payload
            });
    }

    unauthorized(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_UNAUTHORIZED)
            .send({
                entity,
                status: "UNAUTHORIZED",
                payload
            });
    }

    forbidden(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_FORBIDDEN)
            .send({
                entity,
                status: "FORBIDDEN",
                payload
            });
    }

    notFound(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_NOT_FOUND)
            .send({
                entity,
                status: "NOT FOUND",
                payload
            });
    }

    methodNotAllowed(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_METHOD_NOT_ALLOWED)
            .send({
                entity,
                status: "METHOD NOT ALLOWED",
                payload
            });
    }

    notAcceptable(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_NOT_ACCEPTABLE)
            .send({
                entity,
                status: "NOT ACCEPTABLE",
                payload
            });
    }

    conflict(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_CONFLICT)
            .send({
                entity,
                status: "CONFLICT",
                payload
            });
    }

    gone(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_GONE)
            .send({
                entity,
                status: "GONE",
                payload
            });
    }

    unprocessableEntity(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_UNPROCESSABLE_ENTITY)
            .send({
                entity,
                status: "UNPROCESSABLE ENTITY",
                payload
            });
    }

    internalServerError(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_INTERNAL_SERVER_ERROR)
            .send({
                entity,
                status: "INTERNAL SERVER ERROR",
                payload
            });
    }

    notImplemented(response: Response, payload: any = []) {
        const entity = response.req?.baseUrl.toUpperCase();
        response
            .status(this.HTTP_NOT_IMPLEMENTED)
            .send({
                entity,
                status: "NOT IMPLEMENTED",
                payload
            });
    }


}