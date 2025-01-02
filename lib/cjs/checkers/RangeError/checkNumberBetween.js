"use strict";
//  deps
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNumberBetweenSync = checkNumberBetweenSync;
exports.checkNumberBetween = checkNumberBetween;
// locals
const checkNumber_1 = require("./../TypeError/checkNumber");
const checkNonEmptyNumber_1 = require("./checkNonEmptyNumber");
// module
function checkNumberBetweenSync(dataName, data, min, max) {
    let err = (0, checkNumber_1.checkNumberSync)(dataName, data);
    if (!err) {
        err = (0, checkNumber_1.checkNumberSync)(dataName + "/min", min);
    }
    if (!err) {
        err = (0, checkNonEmptyNumber_1.checkNonEmptyNumberSync)(dataName + "/max", max);
    }
    if (!err && min > data) {
        err = new RangeError("\"" + dataName + "\" must be higher than " + min);
    }
    if (!err && max < data) {
        err = new RangeError("\"" + dataName + "\" must be lower than " + max);
    }
    return err;
}
function checkNumberBetween(dataName, data, min, max) {
    const err = checkNumberBetweenSync(dataName, data, min, max);
    return err ? Promise.reject(err) : Promise.resolve();
}
