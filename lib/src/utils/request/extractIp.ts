// types & interfaces

    // natives
    import type { iIncomingMessage } from "../../components/Server";

// module

export default function extractIp (_req: unknown): string {

    if ("object" !== typeof _req || null === _req) {
        return "";
    }
    else {

        const req: iIncomingMessage = _req as iIncomingMessage;

        let result: string = "";

        if (req.ip) {
            result = req.ip;
        }
        else if ("object" === typeof req.headers && "string" === typeof req.headers["x-forwarded-for"]) {
            result = req.headers["x-forwarded-for"].split(",").pop() as string;
        }
        else if ("object" === typeof req.socket && "string" === typeof req.socket.remoteAddress) {
            result = req.socket.remoteAddress;
        }
        else if ("object" === typeof req.connection) {

            const { connection }: { "connection": Record<string, unknown> } = req as unknown as { "connection": Record<string, unknown> };

            if ("string" === typeof connection.remoteAddress) {
                result = connection.remoteAddress;
            }
            else if ("object" === typeof connection.socket) {

                const { socket }: { "socket": Record<string, string> } = connection as { "socket": Record<string, string> };

                if (socket.remoteAddress) {
                    result = socket.remoteAddress;
                }
                else {
                    result = "";
                }

            }
            else {
                result = "";
            }

        }
        else {
            result = "";
        }

        return result
            .replace("::ffff:", "")
            .replace("localhost", "127.0.0.1")
            .replace("::1", "127.0.0.1");

    }

}
