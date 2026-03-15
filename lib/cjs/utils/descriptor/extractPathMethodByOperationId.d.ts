import type { PathsObject, tMethod } from "../../openAPITypes";
export interface iPathMethod {
    "path": string;
    "method": tMethod;
    "operationId": string;
}
export default function extractPathMethodByOperationId(paths: PathsObject | null | undefined, operationId: string): iPathMethod | undefined;
