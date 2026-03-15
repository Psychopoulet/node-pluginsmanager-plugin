import type { PathsObject, PathItemObject } from "../../openAPITypes";
export default function extractPattern(paths: PathsObject, pathname: string, method: keyof PathItemObject): string;
