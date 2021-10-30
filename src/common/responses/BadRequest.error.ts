import { HttpStatus } from "../constants/HttpStatus.enum";

class BadRequest extends Error {
    code: number = HttpStatus.badRequest;
    payload: any = {};
    constructor(payload: any) {
        super()
        this.payload = payload;
        this.message = "Bad Request"
    }
}


export {
    BadRequest
}