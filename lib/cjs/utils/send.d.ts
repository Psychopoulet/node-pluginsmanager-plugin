import type { iIncomingMessage, iServerResponse } from "../components/Server";
export default function send(req: iIncomingMessage, res: iServerResponse, code: number, content: any, options: {
    "apiVersion": string;
    "cors": boolean;
    "mime": string;
}): Promise<void>;
