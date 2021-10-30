import { HttpStatus } from "../constants/HttpStatus.enum";

class Ok {
    code: number = HttpStatus.ok;
    payload: any = {};
    message: string;
    constructor(payload: any) {
        this.message = "Ok"
        this.payload = payload;
    }

}

export {
    Ok
} 