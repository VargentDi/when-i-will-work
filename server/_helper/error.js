module.exports = (errorType) => {
    switch (errorType) {
        case "jwt expired":
            return {
                statusCode: 401,
                error_message: "Unauthorized",
                error_description: `error reason :${errorType}`
            }
        case "Missing Auth Token":
            return {
                statusCode: 403,
                error_message: "Rejected",
                error_description: `error reason :${errorType}`
            }
        case "invalid_token":
            return {
                statusCode: 401,
                error_message: "Unauthorized",
                error_description: `error reason :${errorType}`
            }
        case "JsonWebTokenError: jwt malformed":
            return {
                statusCode: 401,
                error_message: "Unauthorized",
                error_description: `error reason :${errorType}`
            }
        case "user login invalid":
            return {
                statusCode: 401,
                error_message: "Unauthorized",
                error_description: `error reason :${errorType}`
            }
        case "expired_token":
            return {
                statusCode: 401,
                error_message: "Unauthorized",
                error_description: `error reason :${errorType}`
            }
        case "not valid level":
            return {
                statusCode: 401,
                error_message: "Unauthorized",
                error_description: `error reason :${errorType}`
            }
        case "server error":
            return {
                statusCode: 500,
                error_message: "Unauthorized",
                error_description: `error reason :${errorType}`
            }
        default:
            return {
                statusCode: 404,
                error_message: "Not Found",
                error_description: "Unsupport entity"
            }
    }
}