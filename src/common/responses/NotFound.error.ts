import { HttpStatus } from "../constants/HttpStatus.enum";

class NotFound {
    code: number = HttpStatus.notFound;
    payload: any = {};
    message: string;
    constructor(payload: any) {
        this.message = "Not Found"
        this.payload = payload;
    }

}

export {
    NotFound
} 