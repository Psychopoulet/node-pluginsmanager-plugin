"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// private
// methods
/**
* @return {string} formated random id fragment
*/
function _s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}
// module
function getUniqueID() {
    return _s4() + _s4() + "-" + _s4();
}
exports.default = getUniqueID;
;
