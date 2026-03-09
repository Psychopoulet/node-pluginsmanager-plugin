// deps

    // natives
    const { strictEqual } = require("node:assert");
    const { request } = require("node:http");
    const { join } = require("node:path");
    const { URL } = require("node:url");

    // externals
    const readJSONFile = require(join(__dirname, "..", "..", "lib", "cjs", "utils", "file", "readJSONFile.js"));

// module

module.exports = function httpRequestHeaderTest (urlpath, method, params, returnCode, returnResponse, returnContent) {

    return readJSONFile.default(join(__dirname, "DescriptorUser", "Descriptor.json")).then((content) => {

        const url = new URL(content.servers[0].url + urlpath, "http://localhost"); // any url, but "http://localhost" is used to avoid errors
        const query = Object.fromEntries(url.searchParams);

        return new Promise((resolve, reject) => {

            const opts = {
                "protocol": url.protocol,
                "hostname": url.hostname,
                "port": url.port,
                "path": url.path,
                "query": query,
                "method": method.toUpperCase(),
                "headers": {
                    ...params,
                    "Content-Type": "application/json; charset=utf-8",
                    "Content-Length": Buffer.byteLength("")
                }
            };

            const req = request(opts, (res) => {

                try {

                    strictEqual(res.statusCode, returnCode, "The statusCode is not " + returnCode);
                    strictEqual(res.statusMessage, returnResponse, "The statusMessage is not valid");

                    strictEqual(typeof res.headers, "object", "The headers are not an object");
                    strictEqual(
                        res.headers["content-type"].toLowerCase(),
                        "application/json; charset=utf-8",
                        "The content-type header are not json/utf8"
                    );

                    res.setEncoding("utf8");

                    let rawData = "";
                    res.on("data", (chunk) => {
                        rawData += chunk;
                    }).on("end", () => {

                        try {

                            strictEqual(typeof rawData, "string", "The returned content is not a string");

                            if (res.headers["content-length"]) {

                                strictEqual(
                                    parseInt(res.headers["content-length"], 10),
                                    Buffer.byteLength(rawData),
                                    "The content-length header are not as expected"
                                );

                            }

                            if ("undefined" !== typeof returnContent) {
                                strictEqual(rawData, JSON.stringify(returnContent), "The returned content is not as expected");
                            }

                            resolve();

                        }
                        catch (_e) {
                            reject(_e);
                        }

                    });

                }
                catch (e) {
                    reject(e);
                }

            });

            req.on("error", reject);

            req.write("");
            req.end();

        });

    });

};
