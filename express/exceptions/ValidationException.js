const BasicException = require("./BasicException");

class ValidationException extends BasicException {
    constructor(message, object = null)
}

module.exports = ValidationException;