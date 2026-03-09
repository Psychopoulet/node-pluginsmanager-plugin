"use strict";
/*
    eslint-disable @typescript-eslint/no-unused-vars
*/
// => @typescript-eslint/no-unused-vars is disabled to allow inheritance with proper signature
Object.defineProperty(exports, "__esModule", { value: true });
//  deps
// natives
const node_events_1 = require("node:events");
// locals
const checkObject_1 = require("../checkers/TypeError/checkObject");
const checkNonEmptyObject_1 = require("../checkers/RangeError/checkNonEmptyObject");
const checkNonEmptyString_1 = require("../checkers/RangeError/checkNonEmptyString");
// consts
const LOG_TYPES_ALLOWED = [
    "log",
    "info",
    "success",
    "warning",
    "error"
];
// module
// Please note the fact that "_initWorkSpace" and "_releaseWorkSpace" method MUST be re-written in Mediator class, and not in MediatorUser childs.
// Please note the fact that "init" and "release" method MUST NOT be re-written. Each child has its own init logic.
class DescriptorUser extends node_events_1.EventEmitter {
    // attributes
    // public
    initialized;
    // protected
    _descriptorValidated;
    _externalResourcesDirectory;
    _Descriptor;
    _Logger;
    // constructor
    constructor(options) {
        super();
        // public
        this.initialized = false;
        // protected
        this._descriptorValidated = false;
        // mandatory props
        if ("object" !== typeof options) {
            throw new ReferenceError("\"options\" must be a non-null object");
        }
        if ("string" !== typeof options.externalResourcesDirectory) {
            throw new ReferenceError("\"options.externalResourcesDirectory\" must be a string");
        }
        // optional props
        this._externalResourcesDirectory = options.externalResourcesDirectory;
        this._Descriptor = options.descriptor ?? null;
        this._Logger = options.logger ?? null;
    }
    // protected
    // must be inherited
    _initWorkSpace(...data) {
        return Promise.reject(new Error("\"_initWorkSpace\" method must be inherited"));
    }
    // must be inherited
    _releaseWorkSpace(...data) {
        return Promise.reject(new Error("\"_releaseWorkSpace\" method must be inherited"));
    }
    _log(type, message, bold) {
        if (Boolean(message) && "function" === typeof this._Logger && LOG_TYPES_ALLOWED.includes(type)) {
            this._Logger(type, message, bold, this.getPluginName());
        }
        return this;
    }
    // public
    getPluginName() {
        return this._Descriptor?.info.title ?? "";
    }
    getPluginVersion() {
        return this._Descriptor?.info.version ?? "";
    }
    getPluginDescription() {
        return this._Descriptor?.info.description ?? "";
    }
    // must be inherited
    init(...data) {
        return Promise.reject(new Error("\"init\" method must be inherited"));
    }
    // must be inherited
    release(...data) {
        return Promise.reject(new Error("\"release\" method must be inherited"));
    }
    // must be inherited
    checkDescriptor() {
        if (this._descriptorValidated) {
            return Promise.resolve();
        }
        // check Descriptor object
        return (0, checkNonEmptyObject_1.checkNonEmptyObject)("Descriptor", this._Descriptor).then(() => {
            // check info object
            return (0, checkNonEmptyObject_1.checkNonEmptyObject)("Descriptor.info", this._Descriptor.info).then(() => {
                const { title, version } = this._Descriptor.info;
                // check title
                return (0, checkNonEmptyString_1.checkNonEmptyString)("Descriptor.info.title", title).then(() => {
                    return title !== title.toLowerCase()
                        ? Promise.reject(new Error("The descriptor's title (\"" + title + "\") "
                            + "is not equals in lower case (package.json convention)"))
                        : Promise.resolve();
                    // check version
                }).then(() => {
                    return (0, checkNonEmptyString_1.checkNonEmptyString)("Descriptor.info.version", version);
                });
            });
        }).then(() => {
            const { paths } = this._Descriptor;
            // check paths object
            return (0, checkObject_1.checkObject)("Descriptor.paths", paths).then(() => {
                // check multiple operationIds
                return Promise.resolve().then(() => {
                    const operationIds = [];
                    Object.keys(paths).forEach((pathname) => {
                        const path = paths[pathname];
                        Object.keys(path).forEach((method) => {
                            const operation = path[method];
                            if ("string" === typeof operation?.operationId) {
                                operationIds.push(operation.operationId);
                            }
                        });
                    });
                    let multiple = false;
                    for (let i = 0; i < operationIds.length - 1; ++i) {
                        for (let j = i + 1; j < operationIds.length; ++j) {
                            if (operationIds[i] === operationIds[j]) {
                                multiple = true;
                                break;
                            }
                        }
                        if (multiple) {
                            break;
                        }
                    }
                    return multiple ? Promise.reject(new Error("There is multiple operationIds in [\" " + operationIds.join("\", ") + " \"]")) : Promise.resolve();
                });
            });
        }).then(() => {
            this._descriptorValidated = true;
        });
    }
}
exports.default = DescriptorUser;
