// deps

    // natives
    const { ok, strictEqual } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const send = require(join(__dirname, "..", "lib", "src", "utils", "send.ts")).default;

// private

    function _response () {

        return {
            "statusCode": 0,
            "writeHead": () => {
                // nothing to do here
            },
            "end": (body, encoding, done) => {

                let callback = body;

                if ("function" === typeof done) {
                    callback = done;
                }
                else if ("function" === typeof encoding) {
                    callback = encoding;
                }

                callback();

            }
        };

    }

    function _options (mime, cors) {

        return {
            "apiVersion": "1",
            "cors": cors,
            "mime": mime
        };

    }

// tests

describe("utils / send", () => {

    it("should send an empty body when content is missing", () => {

        function _missing () {
            // nothing to do here
        }

        return send({
            "headers": {}
        }, _response(), 204, _missing(), _options("text/plain", false)).then((response) => {

            strictEqual(response.statusCode, 204, "status is not as expected");
            strictEqual(response.headers["Content-Length"], 0, "length is not as expected");

        });

    });

    it("should send a buffer", () => {

        return send({
            "headers": {}
        }, _response(), 200, Buffer.from("abc"), _options("application/octet-stream", false)).then((response) => {

            strictEqual(response.statusCode, 200, "status is not as expected");
            strictEqual(response.headers["Content-Length"], 3, "length is not as expected");

        });

    });

    it("should stringify a value that is not json", () => {

        return send({
            "headers": {}
        }, _response(), 200, "not-json", _options("application/json", false)).then((response) => {

            strictEqual(response.body, "not-json", "body is not as expected");

        });

    });

    it("should add requested cors headers", () => {

        return send({
            "headers": {
                "access-control-request-method": "POST",
                "access-control-request-headers": "X-Test"
            }
        }, _response(), 200, "ok", _options("text/plain", true)).then((response) => {

            strictEqual(response.headers["Access-Control-Allow-Origin"], "*", "origin is not as expected");
            strictEqual(response.headers["Access-Control-Allow-Methods"], "POST", "methods are not as expected");
            strictEqual(response.headers["Access-Control-Allow-Headers"], "X-Test", "headers are not as expected");

        });

    });

    it("should add default cors headers", () => {

        return send({
            "headers": {}
        }, _response(), 200, "ok", _options("text/plain", true)).then((response) => {

            ok(-1 < response.headers["Access-Control-Allow-Methods"].indexOf("GET"), "methods are not as expected");
            ok(-1 < response.headers["Access-Control-Allow-Headers"].indexOf("Origin"), "headers are not as expected");

        });

    });

});
