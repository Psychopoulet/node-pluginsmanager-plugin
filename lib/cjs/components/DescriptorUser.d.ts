/// <reference types="node" />
import { EventEmitter } from "node:events";
import type { OpenApiDocument } from "express-openapi-validate";
export type tLogType = "data" | "debug" | "log" | "info" | "success" | "warning" | "error";
export type tLogger = (type: tLogType, message: string | Error, bold?: boolean, pluginName?: string) => void;
export interface iDescriptorUserOptions {
    "externalRessourcesDirectory": string;
    "descriptor"?: OpenApiDocument;
    "logger"?: tLogger;
}
export default class DescriptorUser extends EventEmitter {
    initialized: boolean;
    protected _descriptorValidated: boolean;
    protected _externalRessourcesDirectory: string;
    protected _Descriptor: OpenApiDocument | null;
    protected _Logger: tLogger | null;
    constructor(options: iDescriptorUserOptions);
    protected _initWorkSpace(...data: any): Promise<void>;
    protected _releaseWorkSpace(...data: any): Promise<void>;
    protected _log(type: tLogType, message: string | Error, bold?: boolean): this;
    getPluginName(): string;
    getPluginVersion(): string;
    getPluginDescription(): string;
    init(...data: any): Promise<void>;
    release(...data: any): Promise<void>;
    checkDescriptor(): Promise<void>;
}
