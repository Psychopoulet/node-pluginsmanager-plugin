// deps

    // locals
    import { checkStringSync } from "../../checkers/TypeError/checkString";
    import { checkNonEmptyNumberSync } from "../../checkers/RangeError/checkNonEmptyNumber";
    import { checkObjectSync } from "../../checkers/TypeError/checkObject";

// consts

    const DEFAULT_MIME: string = "text/plain";

// module

export default function extractMime (contentType: string, code: number, responses: {
    [key:string]: {
        "description": string;
        "content"?: {
            [key:string]: any
        }
    }
}): string {

    const err = checkStringSync("contentType", contentType) ??
        checkNonEmptyNumberSync("code", code) ??
        checkObjectSync("responses", responses);

    if (err) {
        throw err;
    }
    else {

        const stringifiedCode: string = String(code);

        if (!responses[stringifiedCode] && !responses.default && "" !== contentType.trim()) {
            return contentType;
        }
        else {

            let descriptorContent: { [key:string]: any } | undefined;

            if (responses[stringifiedCode]) {

                if (responses[stringifiedCode].content) {
                    descriptorContent = responses[stringifiedCode].content;
                }

            }
            else if (responses.default && responses.default.content) {
                descriptorContent = responses.default.content;
            }
            else {
                return DEFAULT_MIME;
            }

            const possibleMimes: Array<string> = descriptorContent ? Object.keys(descriptorContent) : [];

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
                    result = possibleMimes[0];
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
