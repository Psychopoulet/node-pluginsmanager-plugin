"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
// private
// methods
/**
* Extract cookies from string
* @param {string} cookies: data string to parse
* @returns {object} Parsed data
*/
function _parseCookies(cookies) {
    if ("string" !== typeof cookies) {
        return {};
    }
    else {
        const result = {};
        cookies.split(";").forEach((cookie) => {
            const parts = cookie.split("=");
            result[parts[0]] = decodeURI(parts[1]);
        });
        return result;
    }
}
// module
function extractCookies(req) {
    if ("object" !== typeof req) {
        return {};
    }
    else if ("object" === typeof req.cookies) {
        return req.cookies;
    }
    else if (req.headers) {
        if (req.headers.cookie) {
            return _parseCookies(req.headers.cookie);
        }
        else if (req.headers.Cookie) {
            return _parseCookies(req.headers.Cookie);
        }
        else if (req.headers.cookies) {
            return _parseCookies(req.headers.cookies);
        }
        else if (req.headers.Cookies) {
            return _parseCookies(req.headers.Cookies);
        }
        else {
            return {};
        }
    }
    else {
        return {};
    }
}
exports.default = extractCookies;
