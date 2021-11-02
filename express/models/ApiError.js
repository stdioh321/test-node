class ApiError {
    code = 500;
    object = null;
    message = "Unexpected error";
    debugMessage = null;
    errors = [];
    timestamp = new Date().getTime();
    exception = null;
    constructor({
        code = 500,
        message = "Unexpected error",
        ex,
        errors = [],
        showException = false,
        object = null
    } = {}) {
        this.code = code;
        this.timestamp = new Date().getTime();
        this.message = message;
        this.object = object;

        if (ex && ex instanceof Error) this.debugMessage = ex.message;
        else if (ex && typeof ex == "string") this.debugMessage = ex;

        if (ex && ex instanceof Error && showException) this.exception = { name: ex.name, message: ex.message, stack: ex.stack };

        if (errors && Array.isArray(errors))
            this.errors = errors.map(it => {
                return new ApiSubError(it);
            });
    }
    toJson() { return JSON.stringify(this) };
}

class ApiSubError {
    object;
    field;
    rejectedValue;
    message;
    constructor({
        object = null,
        field = null,
        rejectedValue = null,
        message = null
    } = {}) {
        this.object = object;
        this.field = field;
        this.rejectedValue = rejectedValue;
        this.message = message;
    }

    toJson() { return JSON.stringify(this) };
}

module.exports.ApiError = ApiError;
module.exports.ApiSubError = ApiSubError;