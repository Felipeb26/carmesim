"use server";

import { IException } from "@/types/errors/IException";
import { getErrorMessage } from "@/utils/error_message";
import { API_HOST, DEFAULT_HEADER } from "@/utils/variables";

export async function fetchApi<T, D = unknown>(
	endpoint: string,
	method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
	data?: D,
	customHeaders?: Record<string, string | object>,
	timeout?: number,
	next?: {
		revalidate?: number;
		tags?: string[];
	}
): Promise<T | IException> {
	const url = API_HOST.concat(endpoint);

	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout || 40000);

	const isForceCache = customHeaders?.["cache"] === "force-cache";

	const options: RequestInit = {
		method,
		headers: {
			...DEFAULT_HEADER,
			...customHeaders,
		},
		signal: controller.signal,
		cache: isForceCache ? "force-cache" : "no-store",
		next: next,
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
			clearTimeout(id);
			return new IException(
				[],
				getErrorMessage(errorText),
				endpoint,
				status,
				undefined,
			);
		}

		if (!contentType || !contentType.includes("application/json")) {
			clearTimeout(id);
			return {} as T;
		}

		const text = await response.text();
		if (!text) {
			clearTimeout(id);
			return {} as T;
		}

		try {
			clearTimeout(id);
			return JSON.parse(text) as T;
		} catch (err) {
			clearTimeout(id);
			console.error("Erro ao fazer parse do JSON:", err);
			return {} as T;
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		clearTimeout(id);
		console.error("Erro ao fazer requisição:", error);
		return  new IException(
				[],
				getErrorMessage(error.message),
				endpoint,
				500,
				undefined,
			);
	}
}

export async function apiRetry<T>(
	fn: () => Promise<T>,
	retries = 3,
	delayMs = 1000
): Promise<T> {
	try {
		const response = await fn();
		if(response instanceof IException){
			throw new Error()
		}
		return response;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		if (retries <= 0 || !(error instanceof IException)) {
			throw error;
		}
		await new Promise((resolve) => setTimeout(resolve, delayMs));
		return apiRetry(fn, retries - 1, delayMs);
	}
}
