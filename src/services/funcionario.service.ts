import { deleteCookie, retrieveCookie } from "@/actions/cookie.action";
import { fetchRetry } from "@/lib/api";
import { APiPage } from "@/types/api/ApiPage";
import { IPagination } from "@/types/api/IPgaination";
import { IFuncionario } from "@/types/IFuncionario";

export async function findAllWorkers({ page, size, customHeaders }: APiPage) {
	const token = await retrieveCookie("token");
	let headers: Record<string, string | object> = { ...customHeaders };

	let next = {};
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

	const response = await fetchRetry<IPagination<IFuncionario>>(
		`funcionario/paginate?page=${page}&size=${size}`,
		"GET",
		null,
		headers,
		undefined,
		next
	);

	if (
		"status" in response &&
		(response.getStatus() == 401 || response.getStatus() == 403)
	) {
		deleteCookie("token");
		response.setMessage("Unauthorize acess");
		return response;
	}
	return response;
}
