const { createLogger, format, transports } = require('winston');

const {
    combine, timestamp, prettyPrint, colorize, errors,
} = format;

module.exports = createLogger({
    format: combine(
        errors({ stack: true, extend: true, correlationId: true }), // <-- use errors format
        timestamp(),
        prettyPrint({ colorize: true }),
        colorize({
            colors: {
                error: 'red',
            },
        }),
    ),
    transports: [new transports.Console()],
});
