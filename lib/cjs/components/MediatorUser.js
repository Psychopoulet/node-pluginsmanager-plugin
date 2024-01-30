"use strict";
//  deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// locals
const DescriptorUser_1 = __importDefault(require("./DescriptorUser"));
const Mediator_1 = __importDefault(require("./Mediator"));
// module
// Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic
class MediatorUser extends DescriptorUser_1.default {
    // constructor
    constructor(options) {
        super(options);
        this._Mediator = options && "undefined" !== typeof options.mediator
            ? options.mediator
            : null;
    }
    // protected
    _initWorkSpace(...data) {
        return Promise.resolve();
    }
    _releaseWorkSpace(...data) {
        return Promise.resolve();
    }
    // public
    checkMediator() {
        if ("undefined" === typeof this._Mediator || null === this._Mediator) {
            return Promise.reject(new ReferenceError("Mediator not registered"));
        }
        else if ("object" !== typeof this._Mediator || !(this._Mediator instanceof Mediator_1.default)) {
            return Promise.reject(new TypeError("The plugin has an invalid Mediator which is not an instance (or a child) of the official Mediator class"));
        }
        else {
            return Promise.resolve();
        }
    }
}
exports.default = MediatorUser;
