class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.ststatusCode =statusCode;
    }
}

module.exports = ExpressError;