// module

export default function removeFirstSlash (path: string): string {
    return "string" === typeof path && "/" === path[0] ? path.substring(1, path.length) : String(path);
}
