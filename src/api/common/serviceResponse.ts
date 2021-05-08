import ErrorResponse from "./errorResponse";

export default class ServiceResponse<T> {
    constructor(public error: ErrorResponse = null, public payload: T = null) {

    }
}