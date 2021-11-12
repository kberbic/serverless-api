class ForbiddenError extends Error {
    code=null;

    constructor(message = "Forbidden", code = 403) {
        super(message);
        this.code = code;
    }
}

module.exports.ForbiddenError = ForbiddenError;
