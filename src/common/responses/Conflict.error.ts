import { HttpStatus } from "../constants/HttpStatus.enum";

class Conflict{
    code: number = HttpStatus.conflict;
    payload: any = {};
    message: string;
    constructor(payload: any) {
        this.payload = payload;
        this.message = "Conflict"
    }
}


export {
    Conflict
}