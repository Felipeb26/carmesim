import { fetchApi } from "@/lib/api";
import { ICliente } from "@/types/ICliente";
import { IException } from "@/types/errors/IException";
import { IPagination } from "@/types/api/IPgaination";
import { deleteCookie, retrieveCookie } from "@/actions/cookie.action";

export async function findAllClients({ page, size }: { page: number, size: number }) {
	const token = await retrieveCookie("token")
	if (!token) {
		return new IException([], "Unathorized", "/cliente", 401)
	}
	const authorization: Record<string, string> = { "authorization": `Bearer ${token}` }
	const response = await fetchApi<IPagination<ICliente>>(`cliente/paginate?page=${page}&size=${size}`, "GET", null, authorization)

	if ("status" in response && (response.getStatus() == 401 || response.getStatus() == 403)) {
		deleteCookie("token")
		return new IException([], "Unathorized", "/cliente", 401)
	}
	return response
}

export async function updateClient(id: number, cliente: ICliente) {
	const token = await retrieveCookie("token")

	if (!token) {
		return new IException([], "Unathorized", "/cliente", 401)
	}

	const authorization: Record<string, string> = { "authorization": `Bearer ${token}` }
	const response = await fetchApi<ICliente>(`cliente/${id}`, "PUT", cliente, authorization)

	if ("status" in response && (response.getStatus() == 401 || response.getStatus() == 403)) {
		deleteCookie("token")
		return new IException([], "Unathorized", "/cliente", 401)
	}
	return response
}

export async function deleteClient(id: number) {
	const token = await retrieveCookie("token")

	if (!token) {
		return new IException([], "Unathorized", "/cliente", 401)
	}

	const authorization: Record<string, string> = { "authorization": `Bearer ${token}` }

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const response = await fetchApi<any>(`cliente/${id}`, "DELETE", null, authorization)

	if ("status" in response && (response.getStatus() == 401 || response.getStatus() == 403)) {
		deleteCookie("token")
		return new IException([], "Unathorized", "/cliente", 401)
	}
	return response
}