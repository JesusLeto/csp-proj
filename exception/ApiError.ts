export default class APIError {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number) {
        this.message = message
        this.statusCode = statusCode
    }

    static UnauthorizedError() {
        return new APIError("Unauthorized", 401)
    }

    static NotFoundError(message: string) {
        return new APIError(message, 404)
    }
}
