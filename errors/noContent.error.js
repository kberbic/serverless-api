class NoContentError extends Error {
    code=null;

    constructor(message = "NoContent", code = 204) {
        super(message);
        this.code = code;
    }
}

module.exports.NoContentError = NoContentError;
