
import { fetchApi } from "@/lib/api";
import { IAgendamento } from "@/types/IAgendamentos";
import { IException } from "@/types/errors/IException";
import { IPagination } from "@/types/api/IPgaination";
import { deleteCookie, retrieveCookie } from "@/actions/cookie.action";

export async function findAllAgendamentos({ page, size }: { page: number, size: number }) {

	const token = await retrieveCookie("token")
	if (!token) {
		return new IException([], "Unathorized", "/agendamentos", 401)
	}
	const authorization: Record<string, string> = { "authorization": `Bearer ${token}` }
	const response = await fetchApi<IPagination<IAgendamento>>(`agendamento/paginate?page=${page}&size=${size}`, "GET", null, authorization)

	if ("status" in response && (response.getStatus() === 401 || response.getStatus() === 403)) {
		deleteCookie("token")
		response.setMessage("Unathorized")
		return response;
	}
	return response
}