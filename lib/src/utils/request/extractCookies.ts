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

                        result[parts[0]] = decodeURI(parts[1]);

                    });

                return result;

            }

        }

// module

export default function extractCookies (req: iIncomingMessage): Record<string, string> {

    if ("object" !== typeof req) {
        return {};
    }
    else if ("object" === typeof req.cookies) {
        return req.cookies;
    }
    else if (req.headers) {

        if (req.headers.cookie) {
            return _parseCookies(req.headers.cookie as string);
        }
        else if (req.headers.Cookie) {
            return _parseCookies(req.headers.Cookie as string);
        }
        else if (req.headers.cookies) {
            return _parseCookies(req.headers.cookies as string);
        }
        else if (req.headers.Cookies) {
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
