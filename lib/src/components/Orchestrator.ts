// deps

    // natives
    import { join } from "node:path";

    // locals

    import { checkObject } from "../checkers/TypeError/checkObject";

    import MediatorUser from "./MediatorUser";
    import Server from "./Server";

    import checkFile from "../utils/file/checkFile";
    import readJSONFile from "../utils/file/readJSONFile";

// types & interfaces

    // natives
    import type { IncomingMessage } from "node:http";

    // externals

    import type { OpenApiDocument } from "express-openapi-validate";
    import type { OpenAPI } from "openapi-types";
    import type { Server as SocketIOServer } from "socket.io";
    import type { Server as WebSocketServer } from "ws";

    // locals

    import type { iServerResponse } from "./Server";

    import type Mediator from "./Mediator";
    import type { tLogger, tEventMap, iEventsMinimal } from "./DescriptorUser";

    export interface iOrchestratorOptions {
        "externalRessourcesDirectory": string; // used to write local data like sqlite database, json files, pictures, etc...
        "packageFile": string; // package file used by the plugin (absolute path)
        "descriptorFile": string; // descriptor file used by the plugin (absolute path)
        "mediatorFile": string; // mediator file used by the plugin (absolute path)
        "serverFile": string; // server file used by the plugin (absolute path)
        "logger"?: tLogger;
    }

// module

export default class Orchestrator<T extends tEventMap<T> = iEventsMinimal> extends MediatorUser<T> {

    // attributes

        // protected

            protected _Server: Server | null;
            protected _socketServer: WebSocketServer | SocketIOServer | null;
            protected _checkParameters: boolean;
            protected _checkResponse: boolean;

            // params
            protected _packageFile: string;
            protected _descriptorFile: string;
            protected _mediatorFile: string;
            protected _serverFile: string;

            protected _extended: string[];

        // public

            public enabled: boolean;

            // native
            public authors: string[];
            public description: string;
            public dependencies: object | null;
            public devDependencies: object | null;
            public engines: object | null;
            public license: string;
            public main: string;
            public name: string;
            public scripts: object | null;
            public version: string;

    // constructor

    public constructor (options: iOrchestratorOptions) {

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

            public checkConf (): Promise<void> {
                return Promise.resolve();
            }

            public isEnable (): Promise<void> {

                this.enabled = true;

                return Promise.resolve();

            }

            public checkFiles (): Promise<void> {

                // check package
                return Promise.resolve().then((): Promise<void> => {

                    return checkFile(this._packageFile).catch((err: Error): Promise<void> => {

                        err.message = "package : " + err.message;

                        return Promise.reject(err);

                    });

                // check Descriptor
                }).then((): Promise<void> => {

                    return checkFile(this._descriptorFile).catch((err: Error): Promise<void> => {

                        err.message = "descriptor : " + err.message;

                        return Promise.reject(err);

                    });

                // check Mediator
                }).then((): Promise<void> => {

                    return checkFile(this._mediatorFile).catch((err: Error): Promise<void> => {

                        err.message = "mediator : " + err.message;

                        return Promise.reject(err);

                    });

                // check Server
                }).then((): Promise<void> => {

                    return checkFile(this._serverFile).catch((err: Error): Promise<void> => {

                        err.message = "server : " + err.message;

                        return Promise.reject(err);

                    });

                });

            }

            public checkServer (): Promise<void> {

                return checkObject("Server", this._Server).then((): Promise<void> => {

                    return this._Server instanceof Server ? Promise.resolve() : Promise.reject(new TypeError(
                        "The plugin has an invalid Server which is not an instance (or a child) of the official Server class"
                    ));

                });

            }

        // middlewares

            public disableCheckParameters (): this {

                this.checkServer().then((): void => {

                    (this._Server as Server).disableCheckParameters();

                }).catch((): void => {

                    this._checkParameters = false; // delay checkParameters if necessary

                });

                return this;

            }

            public enableCheckParameters (): this {

                this.checkServer().then((): void => {

                    (this._Server as Server).enableCheckParameters();

                }).catch((): void => {

                    this._checkParameters = true; // delay checkParameters if necessary

                });

                return this;

            }

            public disableCheckResponse (): this {

                this.checkServer().then((): void => {

                    (this._Server as Server).disableCheckResponse();

                }).catch((): void => {

                    this._checkResponse = false; // delay checkResponse if necessary

                });

                return this;

            }

            public enableCheckResponse (): this {

                this.checkServer().then((): void => {

                    (this._Server as Server).enableCheckResponse();

                }).catch((): void => {

                    this._checkResponse = true; // delay checkResponse if necessary

                });

                return this;

            }

            public disableCors (): this {

                this.checkServer().then((): void => {

                    (this._Server as Server).disableCors();

                }).catch((err: Error): void => {
                    this._emitEventGenericForTSPurposeDONOTUSE("error", err);
                });

                return this;

            }

            public enableCors (): this {

                this.checkServer().then((): void => {

                    (this._Server as Server).enableCors();

                }).catch((err: Error): void => {
                    this._emitEventGenericForTSPurposeDONOTUSE("error", err);
                });

                return this;

            }

            public appMiddleware (req: IncomingMessage, res: iServerResponse, next: () => void): void {

                if (!this.enabled) {

                    next();

                }
                else if (!this.initialized) {

                    next();

                }
                else {

                    this.checkServer().then((): void => {

                        (this._Server as Server).appMiddleware(req, res, next);

                    }).catch((): void => {

                        next();

                    });

                }

            }

            public socketMiddleware (server: WebSocketServer | SocketIOServer): void {

                if (!this.enabled) {

                    this._socketServer = server; // delay socketMiddleware if necessary

                }
                else {

                    this.checkServer().then((): void => {

                        (this._Server as Server).socketMiddleware(server);

                    }).catch((): void => {

                        this._socketServer = server; // delay socketMiddleware if necessary

                    });

                }

            }

        // load / destroy

            public load (...data: any): Promise<void> {

                return this.checkFiles().then((): Promise<any> => {
                    return readJSONFile(join(__dirname, "..", "..", "..", "package.json"));
                }).then(({ engines }: { "engines": { "node": string; }; }): Promise<any> => {

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

                    return readJSONFile(this._packageFile);

                // formate authors
                }).then((data: Record<string, any>): Promise<Record<string, any>> => {

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

                        this.authors = [ data.author as string ];
                        delete data.author;

                    }

                    return Promise.resolve(data);

                // formate other data
                }).then((data: Record<string, any>): void => {

                    const self: Record<string, any> = this;

                    Object.keys(data).forEach((key: string): void => {

                        if ("function" !== typeof self[key]) {

                            if ("undefined" === typeof self[key]) {
                                this._extended.push(key);
                            }

                            self[key] = data[key];

                        }

                    });

                });

            }

            public destroy (...data: any): Promise<void> {

                return Promise.resolve().then((): void => {

                    // protected

                        // params
                        this._packageFile = "";
                        this._descriptorFile = "";
                        this._mediatorFile = "";
                        this._serverFile = "";

                        // extended

                        this._extended.forEach((key: string): void => {
                            delete (this as Record<string, any>)[key];
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

                }).then((): void => {

                    this.removeAllListeners();

                });

            }

        // init / release

            public init (...data: any): Promise<void> {

                // ensure conf validity
                return Promise.resolve().then((): Promise<void> => {

                    return this.checkConf();

                // get enable status
                }).then((): Promise<void> => {

                    return this.isEnable();

                }).then((): Promise<void> => {

                    return !this.enabled ? Promise.resolve() : Promise.resolve().then((): Promise<void> => {

                        const SwaggerParser = require("@apidevtools/swagger-parser");

                        // generate descriptor
                        return SwaggerParser.bundle(this._descriptorFile).then((bundledDescriptor: OpenAPI.Document): Promise<OpenApiDocument> => {

                            // force validate because of stupid malformatted references
                            return SwaggerParser.validate(bundledDescriptor).then((validatedDescriptor: OpenApiDocument): void => {

                                this._Descriptor = validatedDescriptor;

                                if (!(this._Descriptor as OpenApiDocument).servers) {
                                    (this._Descriptor as OpenApiDocument).servers = [];
                                }

                            });

                        }).then((): Promise<void> => {

                            return this.checkDescriptor().catch((err: Error): Promise<void> => {

                                this._Descriptor = null;

                                return Promise.reject(err);

                            });

                        // compare title to package name
                        }).then((): Promise<void> => {

                            return (this._Descriptor as OpenApiDocument).info.title !== this.name ? Promise.reject(new Error(
                                "The descriptor's title (\"" + (this._Descriptor as OpenApiDocument).info.title + "\") "
                                + "is not equals to "
                                + "the package's name (\"" + this.name + "\")"
                            )) : Promise.resolve();

                        // compare version to package version
                        }).then((): Promise<void> => {

                            return (this._Descriptor as OpenApiDocument).info.version !== this.version ? Promise.reject(new Error(
                                "The descriptor's version (\"" + (this._Descriptor as OpenApiDocument).info.version + "\") "
                                + "is not equals to "
                                + "the package's version (\"" + this.version + "\")"
                            )) : Promise.resolve();

                        });

                    // create Mediator
                    }).then((): Promise<void> => {

                        // load
                        return new Promise((resolve: (value: typeof Mediator) => void, reject: (err: Error) => void): void => {

                            try {

                                const val: any = require(this._mediatorFile);

                                if ("object" === typeof val && "function" === typeof val.default) {
                                    resolve(val.default as typeof Mediator);
                                }
                                else if ("function" === typeof val) {
                                    resolve(val as typeof Mediator);
                                }
                                else {
                                    reject(new Error("Mediator file loaded (\"" + this._mediatorFile + "\") does not contain a valid Mediator"));
                                }

                            }
                            catch (e) {
                                reject(e as Error);
                            }

                        // init
                        }).then((PluginMediator: typeof Mediator): void => {

                            this._Mediator = new PluginMediator({
                                "descriptor": this._Descriptor as OpenApiDocument,
                                "externalRessourcesDirectory": this._externalRessourcesDirectory,
                                "logger": this._Logger as tLogger
                            });

                        // check
                        }).then((): Promise<void> => {

                            return this.checkMediator().then((): void => {

                                // intercept errors to avoid non-catched ones
                                (this._Mediator as Mediator).on("error", (err: Error): void => {
                                    this._emitEventGenericForTSPurposeDONOTUSE("error", err);
                                });

                            });

                        });

                    // create Server
                    }).then((): Promise<void> => {

                        // load
                        return new Promise((resolve: (value: typeof Server) => void, reject: (err: Error) => void) => {

                            try {

                                const val: any = require(this._serverFile);

                                if ("object" === typeof val && "function" === typeof val.default) {
                                    resolve(val.default as typeof Server);
                                }
                                else if ("function" === typeof val) {
                                    resolve(val as typeof Server);
                                }
                                else {
                                    reject(new Error("Server file loaded (\"" + this._serverFile + "\") does not contain a valid Server"));
                                }

                            }
                            catch (e) {
                                reject(e as Error);
                            }

                        // init
                        }).then((PluginServer: typeof Server): void => {

                            this._Server = new PluginServer({
                                "descriptor": this._Descriptor as OpenApiDocument,
                                "mediator": this._Mediator as Mediator,
                                "externalRessourcesDirectory": this._externalRessourcesDirectory,
                                "logger": this._Logger as tLogger
                            });

                        // check
                        }).then((): Promise<void> => {

                            return this.checkServer().then((): void => {

                                // intercept errors to avoid non-catched ones
                                (this._Server as Server).on("error", (err: Error): void => {
                                    this._emitEventGenericForTSPurposeDONOTUSE("error", err);
                                });

                            });

                        });

                    }).then((): Promise<void> => {

                        return this._initWorkSpace(...data);

                    // init Server (before Mediator)
                    }).then((): Promise<void> => {

                        return (this._Server as Server).init(...data).then((): void => {

                            if (this._socketServer) { // delayed socketMiddleware
                                (this._Server as Server).socketMiddleware(this._socketServer);
                            }

                            if (!this._checkParameters) { // delayed checkParameters
                                (this._Server as Server).disableCheckParameters();
                            }

                            if (!this._checkResponse) { // delayed checkResponse
                                (this._Server as Server).disableCheckResponse();
                            }

                        });

                    // init Mediator
                    }).then((): Promise<void> => {

                        return (this._Mediator as Mediator).init(...data);

                    }).then((): void => {

                        this.initialized = true;
                        this._emitEventGenericForTSPurposeDONOTUSE("initialized", ...data);

                    });

                });

            }

            public release (...data: any): Promise<void> {

                return Promise.resolve().then((): Promise<void> => {

                    return this._Mediator ? this._Mediator.release(...data).then((): void => {
                        this._Mediator = null;
                    }) : Promise.resolve();

                }).then((): Promise<void> => {

                    return this._Server ? this._Server.release(...data).then((): void => {
                        this._Server = null;
                    }) : Promise.resolve();

                }).then((): Promise<void> => {

                    return this._releaseWorkSpace(...data);

                }).then((): void => {

                    this._Descriptor = null;

                    this.initialized = false;
                    this._emitEventGenericForTSPurposeDONOTUSE("released", ...data);

                });

            }

        // write

            public install (...data: any): Promise<void> {

                return Promise.resolve();

            }

            public update (...data: any): Promise<void> {

                return Promise.resolve();

            }

            public uninstall (...data: any): Promise<void> {

                return Promise.resolve();

            }

}
