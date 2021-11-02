class BasicException extends Error {
    name;
    object;
    code;
    originalException;
    constructor({ message = "Unexpected error", object = null, code = 500, originalException = null } = {}) {
        super(message);
        this.name = this.constructor.name;
        this.object = object;
        this.code = code;
        this.originalException = originalException;

        // Error.captureStackTrace(this, this.constructor);
        // console.log(this.stack);
    }
}

module.exports = BasicException;