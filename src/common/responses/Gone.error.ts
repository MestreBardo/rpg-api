import { HttpStatus } from "../constants/HttpStatus.enum";

class Gone {
    code: number = HttpStatus.gone;
    payload: any = {};
    message: string;
    constructor(payload: any) {
        this.message = "Gone"
        this.payload = payload;
    }

}

export {
    Gone
}