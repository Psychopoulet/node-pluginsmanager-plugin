// deps

    // locals
    import LockedError from "../../components/errors/LockedError";
    import NotFoundError from "../../components/errors/NotFoundError";
    import UnauthorizedError from "../../components/errors/UnauthorizedError";
    import cleanSendedError from "../cleanSendedError";
    import SERVER_CODES from "../serverCodes";

// types & interfaces

    // locals
    export interface iFormattedError {
        "httpCode": number;
        "code": string;
        "message": string;
    }

// module

export default function formateError (err: Error): iFormattedError {

    if (err instanceof ReferenceError) {

        return {
            "httpCode": SERVER_CODES.MISSING_PARAMETER,
            "code": "MISSING_PARAMETER",
            "message": cleanSendedError(err) as string
        };

    }
    else if (err instanceof TypeError) {

        return {
            "httpCode": SERVER_CODES.WRONG_TYPE_PARAMETER,
            "code": "WRONG_TYPE_PARAMETER",
            "message": cleanSendedError(err) as string
        };

    }
    else if (err instanceof RangeError) {

        return {
            "httpCode": SERVER_CODES.EMPTY_OR_RANGE_OR_ENUM_PARAMETER,
            "code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
            "message": cleanSendedError(err) as string
        };

    }
    else if (err instanceof SyntaxError) {

        return {
            "httpCode": SERVER_CODES.JSON_PARSE,
            "code": "JSON_PARSE",
            "message": cleanSendedError(err) as string
        };

    }
    else if (err instanceof UnauthorizedError) {

        return {
            "httpCode": SERVER_CODES.UNAUTHORIZED,
            "code": "UNAUTHORIZED",
            "message": cleanSendedError(err) as string
        };

    }
    else if (err instanceof NotFoundError) {

        return {
            "httpCode": SERVER_CODES.NOT_FOUND,
            "code": "NOT_FOUND",
            "message": cleanSendedError(err) as string
        };

    }
    else if (err instanceof LockedError) {

        return {
            "httpCode": SERVER_CODES.LOCKED,
            "code": "LOCKED",
            "message": cleanSendedError(err) as string
        };

    }

    return {
        "httpCode": SERVER_CODES.INTERNAL_SERVER_ERROR,
        "code": "INTERNAL_SERVER_ERROR",
        "message": cleanSendedError(err) as string
    };

}
