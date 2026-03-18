// types & interfaces

    // locals
    import type { iIncomingMessage } from "../../components/Server";

// private

    // methods

        /**
        * Extract cookies from string
        * @param {string} cookies: data string to parse
        * @returns {object} Parsed data
        */
        function _parseCookies (cookies: string): Record<string, string> {

            if ("string" !== typeof cookies) {
                return {};
            }
            else {

                const result: Record<string, string> = {};

                    cookies.split(";").forEach((cookie: string): void => {

                        const parts: string[] = cookie.split("=");

                        result[parts[0]] = parts[1] ? decodeURI(parts[1]) : "";

                    });

                return result;

            }

        }

// module

export default function extractCookies (req: iIncomingMessage): Record<string, unknown> {

    if ("object" !== typeof req) {
        return {};
    }
    else if ("object" === typeof req.cookies) {
        return req.cookies;
    }
    else if ("object" === typeof req.headers) {

        if ("undefined" !== typeof req.headers.cookie) {
            return _parseCookies(req.headers.cookie);
        }
        else if ("undefined" !== typeof req.headers.Cookie) {
            return _parseCookies(req.headers.Cookie as string);
        }
        else if ("undefined" !== typeof req.headers.cookies) {
            return _parseCookies(req.headers.cookies as string);
        }
        else if ("undefined" !== typeof req.headers.Cookies) {
            return _parseCookies(req.headers.Cookies as string);
        }
        else {
            return {};
        }

    }
    else {
        return {};
    }

}
