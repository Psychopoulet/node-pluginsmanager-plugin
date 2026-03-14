// deps

    // locals
    import { checkStringSync } from "../../checkers/TypeError/checkString";
    import { checkNonEmptyNumberSync } from "../../checkers/RangeError/checkNonEmptyNumber";
    import { checkObjectSync } from "../../checkers/TypeError/checkObject";

// consts

    const DEFAULT_MIME: string = "text/plain";

// module

export default function extractMime (contentType: string, code: number, responses: unknown): string {

    const err = checkStringSync("contentType", contentType)
        ?? checkNonEmptyNumberSync("code", code)
        ?? checkObjectSync("responses", responses);

    if (err) {
        throw err;
    }
    else {

        const stringifiedCode = String(code);
        const res = responses as Record<string, {
            "description": string;
            "content"?: Record<string, unknown>
        }>; // mandatory for typing, convert "unknown" response to controlled and typed one

        if ("undefined" === typeof res[stringifiedCode] && "undefined" === typeof res.default && "" !== contentType.trim()) {
            return contentType;
        }
        else {

            let descriptorContent: Record<string, unknown> = {};

            if ("object" === typeof res[stringifiedCode]) {

                if ("object" === typeof res[stringifiedCode].content) {
                    descriptorContent = res[stringifiedCode].content as unknown as Record<string, unknown>;
                }

            }
            else if ("object" === typeof res.default) {

                if ("object" === typeof res.default.content) {
                    descriptorContent = res.default.content as unknown as Record<string, unknown>;
                }

            }
            else {
                return DEFAULT_MIME;
            }

            const possibleMimes: string[] = Object.keys(descriptorContent);

            const [ mimeRequest, charsetRequest ] = contentType.split(";").map((content: string): string => {
                return content.trim().toLowerCase();
            });

            let result: string = DEFAULT_MIME; // default mime

                if (!possibleMimes.length) {

                    if (mimeRequest) {
                        result = mimeRequest;
                    }
                    else {
                        result = DEFAULT_MIME;
                    }

                }
                else if (1 === possibleMimes.length) { // only one possible option
                    [ result ] = possibleMimes;
                }
                else {

                    result = mimeRequest && possibleMimes.includes(mimeRequest) ? mimeRequest : DEFAULT_MIME;

                }

                if (charsetRequest) {
                    result = mimeRequest + "; " + charsetRequest;
                }

            return result;

        }

    }

}
