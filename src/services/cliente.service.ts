import { fetchApi } from "@/lib/api";
import { ICliente } from "@/types/ICliente";
import { IException } from "@/types/IException";
import { IPagination } from "@/types/IPgaination";
import { deleteCookie, retrieveCookie } from "@/utils/cookie";

let i = 0
export async function findAllClients({ page, size }: { page: number, size: number }) {
    console.log("requisicao realizada numero" + i++)
    const token = await retrieveCookie("token")
    if (!token) {
        return { status: 401, message: "unathorized" } as IException
    }
    const authorization: Record<string, string> = { "authorization": `Bearer ${token}` }
    const response = await fetchApi<IPagination<ICliente>>(`cliente/paginate?page=${page}&size=${size}`, "GET", null, authorization)

    console.log(response)
    if ("status" in response && (response.status == 401 || response.status == 403)) {
        deleteCookie("token")
        return { status: 401, message: "unathorized" } as IException
    }
    return response
}

export async function updateClient(id: number, cliente: ICliente) {
    const token = await retrieveCookie("token")

    if (!token) {
        return { status: 401, message: "unathorized" } as IException
    }

    const authorization: Record<string, string> = { "authorization": `Bearer ${token}` }
    const response = await fetchApi<ICliente>(`cliente/${id}`, "PUT", cliente, authorization)

    if ("status" in response && (response.status == 401 || response.status == 403)) {
        deleteCookie("token")
        return { status: 401, message: "unathorized" } as IException
    }
    return response
}

export async function deleteClient(id: number) {
    const token = await retrieveCookie("token")

    if (!token) {
        return { status: 401, message: "unathorized" } as IException
    }

    const authorization: Record<string, string> = { "authorization": `Bearer ${token}` }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await fetchApi<any>(`cliente/${id}`, "DELETE", null, authorization)

    if ("status" in response && (response.status == 401 || response.status == 403)) {
        deleteCookie("token")
        return { status: 401, message: "unathorized" } as IException
    }
    return response
}