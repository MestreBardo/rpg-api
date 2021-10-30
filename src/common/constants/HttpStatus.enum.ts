
enum HttpStatus {
    ok = 200,
    created = 201,
    badRequest = 400,
    unauthorized = 401,
    notFound = 404,
    conflict = 409,
    gone = 410,
    unprocessableEntity = 422,
    internalServerError = 500,

}

export {
    HttpStatus
}