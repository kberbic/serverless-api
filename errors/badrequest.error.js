class BedRequestError extends Error {
    code = null;

    constructor(message = 'Bad Request', code = 400) {
        super(message);
        this.code = code;
    }
}

class BedRequestExtendError extends BedRequestError {
    errors = null;

    constructor(errors) {
        super();
        this.errors = errors;
    }
}

module.exports.BedRequestError= BedRequestError;
module.exports.BedRequestExtendError= BedRequestError;
