class ExpressError extends Error {
    cosntructor(message, statusCode) {
        // super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;