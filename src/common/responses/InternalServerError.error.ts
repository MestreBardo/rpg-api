import { HttpStatus } from "../constants/HttpStatus.enum";

class InternalServerError {
    code: number = HttpStatus.internalServerError;
    payload: any = {};
    message: string;
    constructor(payload: any) {
        this.message = "Internal Server Error"
        this.payload = payload;
    }

}

export {
    InternalServerError
} 