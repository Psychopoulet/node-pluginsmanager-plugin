// deps

    // natives
    const { rejects } = require("node:assert");
    const { join } = require("node:path");

    // externals
    const { ValidationError } = require("express-openapi-validate");

    // locals
    const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));
    const DESCRIPTOR_ONLY_URL = require(join(__dirname, "utils", "DescriptorUser", "DescriptorOnlyUrl.js"));

// const

    const URL_PARAMS = {
        "path": {},
        "query": {},
        "headers": {},
        "cookies": {}
    };

// private

    function _mediator (validate, validateResponse) {

        const mediator = new LocalMediator({
            "descriptor": DESCRIPTOR_ONLY_URL
        });

        mediator._validator = {
            "validate": validate || (() => {

                return (_req, _res, done) => {
                    done();
                };

            }),
            "validateResponse": validateResponse || (() => {

                return () => {
                    // nothing to do here
                };

            })
        };

        return mediator;

    }

    function _fail (validate) {

        return _mediator(validate).checkParameters("testNoParameter", URL_PARAMS);

    }

// tests

describe("Mediator / validation edges", () => {

    it("should reject an object error that has a message", () => {

        return rejects(_fail(() => {

            return (_req, _res, done) => {
                done({
                    "message": "from-object"
                });
            };

        }), (err) => {
            return err instanceof Error && "from-object" === err.message;
        });

    });

    it("should reject an object error without a message", () => {

        return rejects(_fail(() => {

            return (_req, _res, done) => {
                done({});
            };

        }), (err) => {
            return err instanceof Error;
        });

    });

    it("should reject an error that is not an object", () => {

        return rejects(_fail(() => {

            return (_req, _res, done) => {
                done("plain");
            };

        }), (err) => {
            return err instanceof Error && "plain" === err.message;
        });

    });

    it("should reject a validation error without keyword data", () => {

        return rejects(_fail(() => {

            return (_req, _res, done) => {
                done(new ValidationError("broken", null));
            };

        }), (err) => {
            return err instanceof Error && !(err instanceof ValidationError);
        });

    });

    it("should reject a validation error with an unknown keyword", () => {

        return rejects(_fail(() => {

            return (_req, _res, done) => {
                done(new ValidationError("broken", [
                    {
                        "keyword": "additionalProperties"
                    }
                ]));
            };

        }), (err) => {
            return err instanceof Error && !(err instanceof ReferenceError) && !(err instanceof TypeError) && !(err instanceof RangeError);
        });

    });

    it("should reject an unknown response operation", () => {

        return rejects(_mediator().checkResponse("missing", {
            "statusCode": 200
        }), (err) => {
            return err instanceof ReferenceError;
        });

    });

    it("should reject content on a 204 response", () => {

        return rejects(_mediator().checkResponse("testNoParameter", {
            "statusCode": 204,
            "body": "nope"
        }), (err) => {
            return err instanceof ReferenceError;
        });

    });

    it("should allow a 201 response without a body", () => {

        return _mediator().checkResponse("testNoParameter", {
            "statusCode": 201
        });

    });

    it("should reject a response validator error without a message", () => {

        return rejects(_mediator(null, () => {

            return () => {

                const failure = Object.create(null);

                throw failure;

            };

        }).checkResponse("testNoParameter", {
            "statusCode": 200,
            "body": "text"
        }), (err) => {
            return err instanceof Error;
        });

    });

});
