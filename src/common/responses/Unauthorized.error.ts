import { HttpStatus } from "../constants/HttpStatus.enum";

class Unauthorized {
    code: number = HttpStatus.unauthorized;
    payload: any = {};
    message: string;
    constructor(payload: any) {
        this.message = "Unauthorized"
        this.payload = payload;
    }

}

export {
    Unauthorized
} 