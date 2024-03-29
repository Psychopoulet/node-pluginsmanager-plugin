"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// natives
const node_path_1 = require("node:path");
// locals
const checkObject_1 = require("../checkers/TypeError/checkObject");
const MediatorUser_1 = __importDefault(require("./MediatorUser"));
const Server_1 = __importDefault(require("./Server"));
const checkFile_1 = __importDefault(require("../utils/file/checkFile"));
const readJSONFile_1 = __importDefault(require("../utils/file/readJSONFile"));
// module
class Orchestrator extends MediatorUser_1.default {
    // constructor
    constructor(options) {
        super(options);
        // protected
        this._Server = null;
        this._socketServer = null; // to delay socketMiddleware if necessary
        this._checkParameters = true; // to delay checkParameters if necessary
        this._checkResponse = true; // to delay checkResponse if necessary
        // params
        this._packageFile = options && "string" === typeof options.packageFile ? options.packageFile : "";
        this._descriptorFile = options && "string" === typeof options.descriptorFile ? options.descriptorFile : "";
        this._mediatorFile = options && "string" === typeof options.mediatorFile ? options.mediatorFile : "";
        this._serverFile = options && "string" === typeof options.serverFile ? options.serverFile : "";
        // extended
        this._extended = [];
        // public
        this.enabled = true;
        // native
        this.authors = [];
        this.description = "";
        this.dependencies = null;
        this.devDependencies = null;
        this.engines = null;
        this.license = "";
        this.main = "";
        this.name = "";
        this.scripts = null;
        this.version = "";
    }
    // public
    // checkers
    checkConf() {
        return Promise.resolve();
    }
    isEnable() {
        this.enabled = true;
        return Promise.resolve();
    }
    checkFiles() {
        // check package
        return Promise.resolve().then(() => {
            return (0, checkFile_1.default)(this._packageFile).catch((err) => {
                err.message = "package : " + err.message;
                return Promise.reject(err);
            });
            // check Descriptor
        }).then(() => {
            return (0, checkFile_1.default)(this._descriptorFile).catch((err) => {
                err.message = "descriptor : " + err.message;
                return Promise.reject(err);
            });
            // check Mediator
        }).then(() => {
            return (0, checkFile_1.default)(this._mediatorFile).catch((err) => {
                err.message = "mediator : " + err.message;
                return Promise.reject(err);
            });
            // check Server
        }).then(() => {
            return (0, checkFile_1.default)(this._serverFile).catch((err) => {
                err.message = "server : " + err.message;
                return Promise.reject(err);
            });
        });
    }
    checkServer() {
        return (0, checkObject_1.checkObject)("Server", this._Server).then(() => {
            return this._Server instanceof Server_1.default ? Promise.resolve() : Promise.reject(new TypeError("The plugin has an invalid Server which is not an instance (or a child) of the official Server class"));
        });
    }
    // middlewares
    disableCheckParameters() {
        this.checkServer().then(() => {
            this._Server.disableCheckParameters();
        }).catch(() => {
            this._checkParameters = false; // delay checkParameters if necessary
        });
        return this;
    }
    enableCheckParameters() {
        this.checkServer().then(() => {
            this._Server.enableCheckParameters();
        }).catch(() => {
            this._checkParameters = true; // delay checkParameters if necessary
        });
        return this;
    }
    disableCheckResponse() {
        this.checkServer().then(() => {
            this._Server.disableCheckResponse();
        }).catch(() => {
            this._checkResponse = false; // delay checkResponse if necessary
        });
        return this;
    }
    enableCheckResponse() {
        this.checkServer().then(() => {
            this._Server.enableCheckResponse();
        }).catch(() => {
            this._checkResponse = true; // delay checkResponse if necessary
        });
        return this;
    }
    disableCors() {
        this.checkServer().then(() => {
            this._Server.disableCors();
        }).catch((err) => {
            this.emit("error", err);
        });
        return this;
    }
    enableCors() {
        this.checkServer().then(() => {
            this._Server.enableCors();
        }).catch((err) => {
            this.emit("error", err);
        });
        return this;
    }
    appMiddleware(req, res, next) {
        if (!this.enabled) {
            next();
        }
        else if (!this.initialized) {
            next();
        }
        else {
            this.checkServer().then(() => {
                this._Server.appMiddleware(req, res, next);
            }).catch(() => {
                next();
            });
        }
    }
    socketMiddleware(server) {
        if (!this.enabled) {
            this._socketServer = server; // delay socketMiddleware if necessary
        }
        else {
            this.checkServer().then(() => {
                this._Server.socketMiddleware(server);
            }).catch(() => {
                this._socketServer = server; // delay socketMiddleware if necessary
            });
        }
    }
    // load / destroy
    load(...data) {
        return this.checkFiles().then(() => {
            return (0, readJSONFile_1.default)((0, node_path_1.join)(__dirname, "..", "..", "..", "package.json"));
        }).then(({ engines }) => {
            // native
            this.authors = [];
            this.description = "";
            this.dependencies = {};
            this.devDependencies = {};
            this.engines = engines;
            this.license = "MIT";
            this.main = "lib/main.js";
            this.name = "";
            this.scripts = {};
            this.version = "";
            return (0, readJSONFile_1.default)(this._packageFile);
            // formate authors
        }).then((data) => {
            if (data.authors) {
                this.authors = data.authors;
                delete data.authors;
                if (data.author) {
                    if (!this.authors.includes(data.author)) {
                        this.authors.push(data.author);
                    }
                    delete data.author;
                }
            }
            else if (data.author) {
                this.authors = [data.author];
                delete data.author;
            }
            return Promise.resolve(data);
            // formate other data
        }).then((data) => {
            const self = this;
            Object.keys(data).forEach((key) => {
                if ("function" !== typeof self[key]) {
                    if ("undefined" === typeof self[key]) {
                        this._extended.push(key);
                    }
                    self[key] = data[key];
                }
            });
        });
    }
    destroy(...data) {
        return Promise.resolve().then(() => {
            // protected
            // params
            this._packageFile = "";
            this._descriptorFile = "";
            this._mediatorFile = "";
            this._serverFile = "";
            // extended
            this._extended.forEach((key) => {
                delete this[key];
            });
            this._extended = [];
            // public
            // native
            this.authors = [];
            this.description = "";
            this.dependencies = null;
            this.devDependencies = null;
            this.engines = null;
            this.license = "";
            this.main = "";
            this.name = "";
            this.scripts = null;
            this.version = "";
        }).then(() => {
            this.removeAllListeners();
        });
    }
    // init / release
    init(...data) {
        // ensure conf validity
        return Promise.resolve().then(() => {
            return this.checkConf();
            // get enable status
        }).then(() => {
            return this.isEnable();
        }).then(() => {
            return !this.enabled ? Promise.resolve() : Promise.resolve().then(() => {
                const SwaggerParser = require("@apidevtools/swagger-parser");
                // generate descriptor
                return SwaggerParser.bundle(this._descriptorFile).then((bundledDescriptor) => {
                    // force validate because of stupid malformatted references
                    return SwaggerParser.validate(bundledDescriptor).then((validatedDescriptor) => {
                        this._Descriptor = validatedDescriptor;
                        if (!this._Descriptor.servers) {
                            this._Descriptor.servers = [];
                        }
                    });
                }).then(() => {
                    return this.checkDescriptor().catch((err) => {
                        this._Descriptor = null;
                        return Promise.reject(err);
                    });
                    // compare title to package name
                }).then(() => {
                    return this._Descriptor.info.title !== this.name ? Promise.reject(new Error("The descriptor's title (\"" + this._Descriptor.info.title + "\") "
                        + "is not equals to "
                        + "the package's name (\"" + this.name + "\")")) : Promise.resolve();
                    // compare version to package version
                }).then(() => {
                    return this._Descriptor.info.version !== this.version ? Promise.reject(new Error("The descriptor's version (\"" + this._Descriptor.info.version + "\") "
                        + "is not equals to "
                        + "the package's version (\"" + this.version + "\")")) : Promise.resolve();
                });
                // create Mediator
            }).then(() => {
                // load
                return new Promise((resolve, reject) => {
                    try {
                        const val = require(this._mediatorFile);
                        if ("object" === typeof val && "function" === typeof val.default) {
                            resolve(val.default);
                        }
                        else if ("function" === typeof val) {
                            resolve(val);
                        }
                        else {
                            reject(new Error("Mediator file loaded (\"" + this._mediatorFile + "\") does not contain a valid Mediator"));
                        }
                    }
                    catch (e) {
                        reject(e);
                    }
                    // init
                }).then((PluginMediator) => {
                    this._Mediator = new PluginMediator({
                        "descriptor": this._Descriptor,
                        "externalRessourcesDirectory": this._externalRessourcesDirectory,
                        "logger": this._Logger
                    });
                    // check
                }).then(() => {
                    return this.checkMediator().then(() => {
                        // intercept errors to avoid non-catched ones
                        this._Mediator.on("error", (err) => {
                            this.emit("error", err);
                        });
                    });
                });
                // create Server
            }).then(() => {
                // load
                return new Promise((resolve, reject) => {
                    try {
                        const val = require(this._serverFile);
                        if ("object" === typeof val && "function" === typeof val.default) {
                            resolve(val.default);
                        }
                        else if ("function" === typeof val) {
                            resolve(val);
                        }
                        else {
                            reject(new Error("Server file loaded (\"" + this._serverFile + "\") does not contain a valid Server"));
                        }
                    }
                    catch (e) {
                        reject(e);
                    }
                    // init
                }).then((PluginServer) => {
                    this._Server = new PluginServer({
                        "descriptor": this._Descriptor,
                        "mediator": this._Mediator,
                        "externalRessourcesDirectory": this._externalRessourcesDirectory,
                        "logger": this._Logger
                    });
                    // check
                }).then(() => {
                    return this.checkServer().then(() => {
                        // intercept errors to avoid non-catched ones
                        this._Server.on("error", (err) => {
                            this.emit("error", err);
                        });
                    });
                });
            }).then(() => {
                return this._initWorkSpace(...data);
                // init Server (before Mediator)
            }).then(() => {
                return this._Server.init(...data).then(() => {
                    if (this._socketServer) { // delayed socketMiddleware
                        this._Server.socketMiddleware(this._socketServer);
                    }
                    if (!this._checkParameters) { // delayed checkParameters
                        this._Server.disableCheckParameters();
                    }
                    if (!this._checkResponse) { // delayed checkResponse
                        this._Server.disableCheckResponse();
                    }
                });
                // init Mediator
            }).then(() => {
                return this._Mediator.init(...data);
            }).then(() => {
                this.initialized = true;
                this.emit("initialized", ...data);
            });
        });
    }
    release(...data) {
        return Promise.resolve().then(() => {
            return this._Mediator ? this._Mediator.release(...data).then(() => {
                this._Mediator = null;
            }) : Promise.resolve();
        }).then(() => {
            return this._Server ? this._Server.release(...data).then(() => {
                this._Server = null;
            }) : Promise.resolve();
        }).then(() => {
            return this._releaseWorkSpace(...data);
        }).then(() => {
            this._Descriptor = null;
            this.initialized = false;
            this.emit("released", ...data);
        });
    }
    // write
    install(...data) {
        return Promise.resolve();
    }
    update(...data) {
        return Promise.resolve();
    }
    uninstall(...data) {
        return Promise.resolve();
    }
}
exports.default = Orchestrator;
