export default class ServiceResponse<T = string[]> {
    constructor(public error: string, public payload: T) {

    }
}