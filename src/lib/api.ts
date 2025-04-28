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
		return new IException(
			[],
			getErrorMessage(error.message),
			endpoint,
			500,
			undefined,
		);
	}
}

const wait = (time: number) => {
	new Promise<void>((resolve) => {
		setTimeout(() => resolve(), time)
	})
}

export async function fetchRetry<T, D = unknown>(
	endpoint: string,
	method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
	data?: D,
	customHeaders?: Record<string, string | object>,
	timeout?: number,
	next?: {
		revalidate?: number;
		tags?: string[];
	},
	retries = 2
): Promise<T | IException> {
	let count = retries
	let increaseTimeout = 2

	while (count > 0) {
		try {
			return await fetchApi(endpoint, method, data, customHeaders, timeout, next)
		} catch (err) {
			count--;
			increaseTimeout = Math.pow(increaseTimeout, 2)
			console.log((err as Error).message)
			await wait(increaseTimeout)
		}
	}
	return Promise.reject(new Error(`Requisição falhou com ${retries} tentativas`))
}