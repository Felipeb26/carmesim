import { deleteCookie, retrieveCookie } from "@/actions/cookie.action";
import { fetchApi } from "@/lib/api";
import { APiPage } from "@/types/api/ApiPage";
import { IContatos } from "@/types/contatos/IContatos";
import { IException } from "@/types/errors/IException";

export async function sendMail({ data, customHeaders }: APiPage<IContatos>,) {

	const token = await retrieveCookie("token")
	let headers: Record<string, string | object> = { ...customHeaders };

	let next = {}
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

	const response = await fetchApi<object, IContatos>(`contatos/`, "POST", data, headers, undefined, next)
	if ("status" in response && (response.getStatus() === 401 || response.getStatus() === 403)) {
		deleteCookie("token")
		return new IException([], "Unathorized", "/contatos", 401)
	}
	return response
}