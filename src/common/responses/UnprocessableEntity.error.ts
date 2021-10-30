import { HttpStatus } from "../constants/HttpStatus.enum";

class UnprocessableEntity{
    code: number = HttpStatus.unprocessableEntity;
    payload: any = {};
    message: string;
    constructor(payload: any) {
        this.payload = payload;
        this.message = "Unprocessable Entity";
    }
}

export {
    UnprocessableEntity
}