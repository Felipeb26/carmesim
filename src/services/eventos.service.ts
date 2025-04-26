import { deleteCookie, retrieveCookie } from "@/actions/cookie.action";
import { fetchApi } from "@/lib/api";
import { APiPage } from "@/types/api/ApiPage";
import { IEvento } from "@/types/IEvento";
import { IException } from "@/types/errors/IException";
import { IPagination } from "@/types/api/IPgaination";

export async function findAllEventos({ page, size, customHeaders }: APiPage) {

		const token = await retrieveCookie("token")
		let headers: Record<string, string| object> = { ...customHeaders };

		let next = { }
		if (token) {
			headers = {
				...headers,
				authorization: `Bearer ${token}`,
			};
		}

		if (customHeaders) {
			for (const [key, value] of Object.entries(customHeaders)) {
				if (key === "next" && typeof value === "object") {
					next = value;
				} else {
					headers[key] = value as string;
				}
			}
		}

		const response = await fetchApi<IPagination<IEvento>>(`eventos/paginate?page=${page}&size=${size}`, "GET", null, headers, undefined, next)

		if ("status" in response && (response.status === 401 || response.status === 403)) {
				deleteCookie("token")
				return { status: 401, message: "unathorized" } as IException
		}
		return response
}