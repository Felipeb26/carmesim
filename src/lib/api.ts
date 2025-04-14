"use server"

import { IException } from "@/types/IException";
import { getErrorMessage } from "@/utils/error_message";
import { API_HOST, DEFAULT_HEADER } from "@/utils/variables";

export async function fetchApi<T, D = unknown>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    data?: D,
    customHeaders?: Record<string, string>,
): Promise<T | IException> {
    const url = API_HOST.concat(endpoint);

    const options: RequestInit = {
        method,
        headers: {
            ...DEFAULT_HEADER,
            ...customHeaders,
            "Cache-Control": "no-store",
        },
    };

    if (data && (method === "POST" || method === "PUT")) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);

        const contentType = response.headers.get("content-type");
        const status = response.status;

        if (!response.ok) {
            const errorText = await response.text();
            return {
                status,
                message: getErrorMessage(errorText) || "Erro desconhecido",
            } as IException;
        }

        if (!contentType || !contentType.includes("application/json")) {
            return {} as T;
        }

        const text = await response.text();
        if (!text) return {} as T;

        try {
            return JSON.parse(text) as T;
        } catch (err) {
            console.error("Erro ao fazer parse do JSON:", err);
            return {} as T;
        }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        console.error("Erro ao fazer requisição:", error);
        return {
            status: 500,
            message: error.message || "Erro de rede ou servidor",
        } as IException;
    }
}
