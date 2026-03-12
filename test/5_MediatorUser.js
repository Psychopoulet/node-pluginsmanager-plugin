// deps

    // natives
    const { strictEqual, ok } = require("node:assert");
    const Events = require("node:events");
    const { join } = require("node:path");

    // locals

        // plugin
        const { DescriptorUser, MediatorUser, Mediator } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

        // utils
        const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));
        const LocalMediatorUser = require(join(__dirname, "utils", "MediatorUser", "LocalMediatorUser.js"));

// consts

    const DESCRIPTOR = require(join(__dirname, "utils", "DescriptorUser", "DescriptorOnlyUrl.js"));

// private

    function _getMediator () {

        return new Mediator({
            "externalResourcesDirectory": ""
        });

    }

    function _getMediatorUser () {

        return new MediatorUser({
            "externalResourcesDirectory": ""
        });

    }

// tests

describe("MediatorUser", () => {

    it("should test constructor", () => {

        const mediatorUser = new LocalMediatorUser();

        strictEqual(typeof mediatorUser, "object", "Generated mediatorUser is not an object");
        ok(mediatorUser instanceof Events, "Generated mediatorUser is not a Events instance");
        ok(mediatorUser instanceof DescriptorUser, "Generated mediatorUser is not a DescriptorUser instance");
        ok(mediatorUser instanceof MediatorUser, "Generated mediatorUser is not a MediatorUser instance");
        ok(mediatorUser instanceof LocalMediatorUser, "Generated mediatorUser is not a LocalMediatorUser instance");

        strictEqual(typeof mediatorUser._Mediator, "object", "Generated mediatorUser _Mediator is not an object");
        strictEqual(mediatorUser._Mediator, null, "Generated mediatorUser _Mediator is not as expected");

    });

    it("should init mediatorUser", () => {

        return new LocalMediatorUser({
            "mediator": _getMediator()
        }).init("test init");

    });

    it("should test non-herited _initWorkSpace", () => {
        return _getMediatorUser()._initWorkSpace();
    });

    it("should release mediatorUser without mediator", () => {

        return new LocalMediatorUser().release("test release");

    });

    it("should test non-herited _releaseWorkSpace", () => {
        return _getMediatorUser()._releaseWorkSpace();
    });

    it("should release mediatorUser with mediator", () => {

        return new LocalMediatorUser({
            "mediator": _getMediator()
        }).release("test release");

    });

    describe("checkMediator", () => {

        it("should check without mediator", (done) => {

            const mediatorUser = new LocalMediatorUser();

                delete mediatorUser._Mediator;

            mediatorUser.checkMediator().then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof Error, "Generated error is not a Error instance");
                ok(err instanceof ReferenceError, "Generated error is not a ReferenceError instance");

                done();

            });

        });

        it("should check with null mediator", (done) => {

            const mediatorUser = new LocalMediatorUser();

                mediatorUser._Mediator = null;

            mediatorUser.checkMediator().then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof Error, "Generated error is not a Error instance");
                ok(err instanceof ReferenceError, "Generated error is not a ReferenceError instance");

                done();

            });

        });

        it("should check with wrong mediator (string)", (done) => {

            const mediatorUser = new LocalMediatorUser();

                mediatorUser._Mediator = "test";

            mediatorUser.checkMediator().then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof Error, "Generated error is not a Error instance");
                ok(err instanceof TypeError, "Generated error is not a TypeError instance");

                done();

            });

        });

        it("should check with wrong mediator (object)", (done) => {

            const mediatorUser = new LocalMediatorUser();

                mediatorUser._Mediator = {};

            mediatorUser.checkMediator().then(() => {
                done(new Error("There is no generated error"));
            }).catch((err) => {

                strictEqual(typeof err, "object", "Generated error is not an object");
                ok(err instanceof Error, "Generated error is not a Error instance");
                ok(err instanceof TypeError, "Generated error is not a TypeError instance");

                done();

            });

        });

        it("should check with right mediator", () => {

            const mediatorUser = new LocalMediatorUser();

                mediatorUser._Mediator = new LocalMediator();

            return mediatorUser.checkMediator();

        });

    });

    describe("events", () => {

        it("should test events before init", () => {

            const mediatorUser = new LocalMediator();

            return new Promise((resolve) => {

                mediatorUser
                    .once("test", resolve)
                    .emit("test");

            });

        });

        it("should test events after init", () => {

            const mediatorUser = new LocalMediator({
                "descriptor": DESCRIPTOR
            });

            return new Promise((resolve, reject) => {

                mediatorUser
                    .once("test", resolve);

                mediatorUser.init().then(() => {
                    mediatorUser.emit("test");
                }).catch(reject);

            });

        });

        it("should test events after release", () => {

            const mediatorUser = new LocalMediator({
                "descriptor": DESCRIPTOR
            });

            return new Promise((resolve, reject) => {

                mediatorUser.once("test", () => {
                    reject(new Error("Should not fire this event"));
                });

                mediatorUser.init().then(() => {
                    return mediatorUser.release();
                }).then(() => {

                    mediatorUser.emit("test");

                    resolve();

                }).catch(reject);

            });

        });

    });

});
