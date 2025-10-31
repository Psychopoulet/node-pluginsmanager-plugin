"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
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
// Please note the fact that "_initWorkSpace" and "_releaseWorkSpace" method MUST be re-writted in Mediator class, and not in MediatorUser childs.
// Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic.
class DescriptorUser extends node_events_1.EventEmitter {
    // constructor
    constructor(options) {
        super();
        // public
        this.initialized = false;
        // protected
        this._descriptorValidated = false;
        this._externalRessourcesDirectory = "string" === typeof (options === null || options === void 0 ? void 0 : options.externalRessourcesDirectory)
            ? options.externalRessourcesDirectory
            : "";
        this._Descriptor = "object" === typeof (options === null || options === void 0 ? void 0 : options.descriptor)
            ? options.descriptor
            : null;
        this._Logger = "function" === typeof (options === null || options === void 0 ? void 0 : options.logger)
            ? options.logger
            : null;
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
    // used to faint the typing of EventEmitter for emit into a generic class (which MUST be inherited anyway) like Mediator/Server/Orchestrator
    _emitEventGenericForTSPurposeDONOTUSE(event, ...args) {
        return this.emit(event, ...args);
    }
    // public
    getPluginName() {
        return this._Descriptor && this._Descriptor.info && this._Descriptor.info.title ? this._Descriptor.info.title : "";
    }
    getPluginVersion() {
        return this._Descriptor && this._Descriptor.info && this._Descriptor.info.version ? this._Descriptor.info.version : "";
    }
    getPluginDescription() {
        return this._Descriptor && this._Descriptor.info && this._Descriptor.info.description ? this._Descriptor.info.description : "";
    }
    // must be inherited
    init(...data) {
        console.log("DescriptorUser", "init", ...data);
        return Promise.reject(new Error("\"init\" method must be inherited"));
    }
    // must be inherited
    release(...data) {
        console.log("DescriptorUser", "release", ...data);
        return Promise.reject(new Error("\"release\" method must be inherited"));
    }
    // must be inherited
    checkDescriptor() {
        // check Descriptor object
        return this._descriptorValidated ? Promise.resolve() : (0, checkNonEmptyObject_1.checkNonEmptyObject)("Descriptor", this._Descriptor).then(() => {
            // check info object
            return (0, checkNonEmptyObject_1.checkNonEmptyObject)("Descriptor.info", this._Descriptor.info).then(() => {
                // check title
                return (0, checkNonEmptyString_1.checkNonEmptyString)("Descriptor.info.title", this._Descriptor.info.title).then(() => {
                    return this._Descriptor.info.title !== this._Descriptor.info.title.toLowerCase()
                        ? Promise.reject(new Error("The descriptor's title (\"" + this._Descriptor.info.title + "\") "
                            + "is not equals in lower case (package.json convention)"))
                        : Promise.resolve();
                    // check version
                }).then(() => {
                    return (0, checkNonEmptyString_1.checkNonEmptyString)("Descriptor.info.version", this._Descriptor.info.version);
                });
            });
        }).then(() => {
            // check paths object
            return ((0, checkObject_1.checkObject)("Descriptor.paths", this._Descriptor.paths)).then(() => {
                // check multiple operationIds
                return Promise.resolve().then(() => {
                    const operationIds = [];
                    Object.keys(this._Descriptor.paths).forEach((p) => {
                        Object.keys(this._Descriptor.paths[p]).forEach((m) => {
                            const path = this._Descriptor.paths[p];
                            if (path[m].operationId) {
                                operationIds.push(path[m].operationId);
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
