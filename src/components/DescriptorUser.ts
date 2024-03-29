//  deps

    // natives
    import { EventEmitter } from "node:events";

    // locals
    import { checkObject } from "../checkers/TypeError/checkObject";
    import { checkNonEmptyObject } from "../checkers/RangeError/checkNonEmptyObject";
    import { checkNonEmptyString } from "../checkers/RangeError/checkNonEmptyString";

// types & interfaces

    // externals
    import type { OpenApiDocument } from "express-openapi-validate";

    // locals

    export type tLogType = "data" | "debug" | "log" | "info" | "success" | "warning" | "error";
    export type tLogger = (type: tLogType, message: string | Error, bold?: boolean, pluginName?: string) => void;

    export interface iDescriptorUserOptions {
        "externalRessourcesDirectory": string; // used to write local data like sqlite database, json files, pictures, etc...
        "descriptor"?: OpenApiDocument; // not sended by Orchestrator
        "logger"?: tLogger;
    }

// consts

    const LOG_TYPES_ALLOWED: tLogType[] = [
        "log",
        "info",
        "success",
        "warning",
        "error"
    ];

// module

// Please note the fact that "_initWorkSpace" and "_releaseWorkSpace" method MUST be re-writted in Mediator class, and not in MediatorUser childs.
// Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic.
export default class DescriptorUser extends EventEmitter {

    // attributes

        // public

            public initialized: boolean;

        // protected

            protected _descriptorValidated: boolean;
            protected _externalRessourcesDirectory: string;
            protected _Descriptor: OpenApiDocument | null;
            protected _Logger: tLogger | null;

    // constructor

    public constructor (options: iDescriptorUserOptions) {

        super();

        // public

            this.initialized = false;

        // protected

            this._descriptorValidated = false;

            this._externalRessourcesDirectory = "string" === typeof options?.externalRessourcesDirectory
                ? options.externalRessourcesDirectory
                : "";

            this._Descriptor = "object" === typeof options?.descriptor
                ? options.descriptor
                : null;

            this._Logger = "function" === typeof options?.logger
                ? options.logger
                : null;

    }

    // protected

        // must be inherited
        protected _initWorkSpace (...data: any): Promise<void> {

            return Promise.reject(new Error("\"_initWorkSpace\" method must be inherited"));

        }

        // must be inherited
        protected _releaseWorkSpace (...data: any): Promise<void> {

            return Promise.reject(new Error("\"_releaseWorkSpace\" method must be inherited"));

        }

        protected _log (type: tLogType, message: string | Error, bold?: boolean): this {

            if (Boolean(message) && "function" === typeof this._Logger && LOG_TYPES_ALLOWED.includes(type)) {
                (this._Logger as tLogger)(type, message, bold, this.getPluginName());
            }

            return this;

        }

    // public

        public getPluginName (): string {
            return this._Descriptor && this._Descriptor.info && this._Descriptor.info.title ? this._Descriptor.info.title : "";
        }

        public getPluginVersion (): string {
            return this._Descriptor && this._Descriptor.info && this._Descriptor.info.version ? this._Descriptor.info.version : "";
        }

        public getPluginDescription (): string {
            return this._Descriptor && this._Descriptor.info && this._Descriptor.info.description ? this._Descriptor.info.description : "";
        }

        // must be inherited
        public init (...data: any): Promise<void> {

            console.log("DescriptorUser", "init", ...data);

            return Promise.reject(new Error("\"init\" method must be inherited"));

        }

        // must be inherited
        public release (...data: any): Promise<void> {

            console.log("DescriptorUser", "release", ...data);

            return Promise.reject(new Error("\"release\" method must be inherited"));

        }

        // must be inherited
        public checkDescriptor (): Promise<void> {

            // check Descriptor object
            return this._descriptorValidated ? Promise.resolve() : checkNonEmptyObject("Descriptor", this._Descriptor).then((): Promise<void> => {

                // check info object
                return checkNonEmptyObject("Descriptor.info", (this._Descriptor as OpenApiDocument).info).then((): Promise<void> => {

                    // check title
                    return checkNonEmptyString("Descriptor.info.title", (this._Descriptor as OpenApiDocument).info.title).then((): Promise<void> => {

                        return (this._Descriptor as OpenApiDocument).info.title !== (this._Descriptor as OpenApiDocument).info.title.toLowerCase()
                            ? Promise.reject(new Error(
                                "The descriptor's title (\"" + (this._Descriptor as OpenApiDocument).info.title + "\") "
                                + "is not equals in lower case (package.json convention)"
                            ))
                            : Promise.resolve();

                    // check version
                    }).then((): Promise<void> => {
                        return checkNonEmptyString("Descriptor.info.version", (this._Descriptor as OpenApiDocument).info.version);
                    });

                });

            }).then((): Promise<void> => {

                // check paths object
                return (checkObject("Descriptor.paths", (this._Descriptor as OpenApiDocument).paths)).then((): Promise<void> => {

                    // check multiple operationIds
                    return Promise.resolve().then((): Promise<void> => {

                        const operationIds: string[] = [];
                        Object.keys((this._Descriptor as OpenApiDocument).paths).forEach((p: string): void => {

                            Object.keys((this._Descriptor as OpenApiDocument).paths[p]).forEach((m: string): void => {

                                const path: Record<string, any> = (this._Descriptor as OpenApiDocument).paths[p];

                                if (path[m].operationId) {
                                    operationIds.push(path[m].operationId);
                                }

                            });

                        });

                        let multiple: boolean = false;
                        for (let i: number = 0; i < operationIds.length - 1; ++i) {

                            for (let j: number = i + 1; j < operationIds.length; ++j) {

                                if (operationIds[i] === operationIds[j]) {
                                    multiple = true; break;
                                }

                            }

                            if (multiple) {
                                break;
                            }

                        }

                        return multiple ? Promise.reject(new Error(
                            "There is multiple operationIds in [\" " + operationIds.join("\", ") + " \"]"
                        )) : Promise.resolve();

                    });

                });

            }).then((): void => {
                this._descriptorValidated = true;
            });

        }

}
