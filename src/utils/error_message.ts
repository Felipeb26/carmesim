import { IException } from "@/types/errors/IException";

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === "object" && error !== null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return String((error as any).message);
    }
    if (typeof error === "string") {
        try {
            const parsedError = JSON.parse(error);
            if (parsedError.message) {
                return String(parsedError.message);
            }
        } catch {
            return error;
        }
    }
    return String(error);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isException(obj: any): obj is IException {
    return obj && typeof obj === "object" && "message" in obj && "statusCode" in obj;
}