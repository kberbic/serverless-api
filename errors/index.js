const logger = require('../utils/logger.utils.js');

module.exports.handleServerNotFound = (req, res) => {
    res.status(404).json({ message: 'NOT_FOUND' });
};

module.exports.handleServerError = (ex) => {
    if (ex) {
        logger.error(ex,
            {
                name: process.env.npm_package_name,
                correlationId: null,
            });
    }

    let {code, message, errors} = ex;
    code = code || 500;
    if(code === 500)
        message = 'SERVER_ERROR';

    return {
        statusCode: code,
        body: JSON.stringify(
            { message, errors },
            null,
            2
        ),
    };
};
