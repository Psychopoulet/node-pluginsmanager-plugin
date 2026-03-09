// deps

    // natives
    const { strictEqual, ok } = require("node:assert");
    const { join } = require("node:path");

    // locals
    const send = require(join(__dirname, "..", "lib", "cjs", "utils", "send.js"));

// helpers

function createMockReq (headers = {}) {
    return {
        "headers": headers
    };
}

function createMockRes () {
    const captured = {
        "writeHead": null,
        "endArgs": null,
        "endCallback": null
    };
    return {
        "statusCode": 0,
        "headers": {},
        "body": undefined,
        "writeHead": function writeHead (code, headers) {
            captured.writeHead = { code, headers };
            this.statusCode = code;
            this.headers = headers;
        },
        "end": function end (...args) {
            captured.endArgs = args;
            const callback = args.find((a) => "function" === typeof a);
            if (callback) {
                captured.endCallback = callback;
                return callback();
            }
        },
        "_captured": captured
    };
}

const BASE_OPTIONS = {
    "apiVersion": "1.0.0",
    "cors": false,
    "mime": "application/json"
};

// tests

describe("utils / send", () => {

    describe("content formatting", () => {

        it("should send empty string when content is undefined", () => {
            const req = createMockReq();
            const res = createMockRes();

            return send.default(req, res, 200, undefined, BASE_OPTIONS).then(() => {
                strictEqual(res.statusCode, 200, "statusCode is not as expected");
                strictEqual(res.headers["Content-Type"], "application/json", "Content-Type is not as expected");
                strictEqual(res.headers["Content-Length"], 0, "Content-Length is not as expected");
                strictEqual(res._captured.endArgs[0], "", "end content is not as expected");
            });
        });

        it("should send empty string when content is empty string", () => {
            const req = createMockReq();
            const res = createMockRes();

            return send.default(req, res, 200, "", BASE_OPTIONS).then(() => {
                strictEqual(res._captured.endArgs[0], "", "end content is not as expected");
            });
        });

        it("should pass Buffer through unchanged", () => {
            const req = createMockReq();
            const res = createMockRes();
            const buf = Buffer.from("hello");

            return send.default(req, res, 200, buf, { ...BASE_OPTIONS, "mime": "text/plain" }).then(() => {
                strictEqual(res._captured.endArgs[0], buf, "end content should be the same Buffer");
                ok(Buffer.isBuffer(res._captured.endArgs[0]), "end content should be Buffer");
            });
        });

        it("should stringify object when mime is application/json", () => {
            const req = createMockReq();
            const res = createMockRes();
            const obj = { "key": "value" };

            return send.default(req, res, 200, obj, BASE_OPTIONS).then(() => {
                strictEqual(res.body, obj, "res.body should store original content for validation");
                strictEqual(res._captured.endArgs[0], "{\"key\":\"value\"}", "end content should be JSON string");
            });
        });

        it("should keep valid JSON string as-is when mime is application/json", () => {
            const req = createMockReq();
            const res = createMockRes();
            const jsonStr = "{\"a\":1}";

            return send.default(req, res, 200, jsonStr, BASE_OPTIONS).then(() => {
                strictEqual(res.body, jsonStr, "res.body should store original content");
                strictEqual(res._captured.endArgs[0], jsonStr, "valid JSON string should be sent as-is");
            });
        });

        it("should stringify non-JSON string when mime is application/json", () => {
            const req = createMockReq();
            const res = createMockRes();
            const plainStr = "not json";

            return send.default(req, res, 200, plainStr, BASE_OPTIONS).then(() => {
                strictEqual(res._captured.endArgs[0], "\"not json\"", "plain string should be JSON-stringified");
            });
        });

        it("should use String() for non-JSON mime", () => {
            const req = createMockReq();
            const res = createMockRes();
            const obj = { "key": "value" };

            return send.default(req, res, 200, obj, { ...BASE_OPTIONS, "mime": "text/plain" }).then(() => {
                strictEqual(res._captured.endArgs[0], "[object Object]", "object with text/plain should use String()");
            });
        });

    });

    describe("headers", () => {

        it("should set status code and API-Version header", () => {
            const req = createMockReq();
            const res = createMockRes();

            return send.default(req, res, 404, "error", { ...BASE_OPTIONS, "mime": "text/plain" }).then(() => {
                strictEqual(res.statusCode, 404, "statusCode is not as expected");
                strictEqual(res.headers["API-Version"], "1.0.0", "API-Version is not as expected");
                strictEqual(res.headers["Status-Code-Url-Cat"], "https://http.cat/404", "Status-Code-Url-Cat is not as expected");
            });
        });

        it("should set Content-Length for non-empty content", () => {
            const req = createMockReq();
            const res = createMockRes();
            const content = "hello";

            return send.default(req, res, 200, content, { ...BASE_OPTIONS, "mime": "text/plain" }).then(() => {
                strictEqual(res.headers["Content-Length"], 5, "Content-Length should match byte length");
            });
        });

        it("should include CORS headers when options.cors is true", () => {
            const req = createMockReq();
            const res = createMockRes();

            return send.default(req, res, 200, "", { ...BASE_OPTIONS, "cors": true }).then(() => {
                strictEqual(res.headers["Access-Control-Allow-Origin"], "*", "CORS Origin should be set");
                ok(res.headers["Access-Control-Allow-Credentials"], "CORS Credentials should be set");
                strictEqual(
                    res.headers["Access-Control-Allow-Methods"],
                    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                    "CORS Methods should be default"
                );
            });
        });

        it("should use access-control-request-method from req when cors is true", () => {
            const req = createMockReq({
                "access-control-request-method": "POST"
            });
            const res = createMockRes();

            return send.default(req, res, 200, "", { ...BASE_OPTIONS, "cors": true }).then(() => {
                strictEqual(res.headers["Access-Control-Allow-Methods"], "POST", "CORS Methods should come from request");
            });
        });

        it("should use access-control-request-headers from req when cors is true", () => {
            const req = createMockReq({
                "access-control-request-headers": "X-Custom-Header"
            });
            const res = createMockRes();

            return send.default(req, res, 200, "", { ...BASE_OPTIONS, "cors": true }).then(() => {
                strictEqual(res.headers["Access-Control-Allow-Headers"], "X-Custom-Header", "CORS Headers should come from request");
            });
        });

    });

});
