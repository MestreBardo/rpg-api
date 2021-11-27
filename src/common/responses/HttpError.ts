class HttpError extends Error {
    statusCode: number;
    data: any;
    
    constructor(statusCode: number, data: any) {
        super();
        this.statusCode = statusCode;
        this.data = data;
    }
}

export { HttpError };