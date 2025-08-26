import type { IncomingMessage } from "node:http";
import type { iServerResponse } from "../components/Server";
export default function send(req: IncomingMessage, res: iServerResponse, code: number, content: any, options: {
    "apiVersion": string;
    "cors": boolean;
    "mime": string;
}): Promise<void>;
