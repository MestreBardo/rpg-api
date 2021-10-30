import { HttpStatus } from "../constants/HttpStatus.enum";

class Created {
    code: number = HttpStatus.created;
    payload: any = {};
    message: string;
    constructor(payload: any) {
        this.message = "Created"
        this.payload = payload;
    }
}

export {
    Created
}
