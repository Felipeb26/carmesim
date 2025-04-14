import { fetchApi } from "@/lib/api";
import { IException } from "@/types/IException";
import { IFuncionario } from "@/types/IFuncionario";
import { IPagination } from "@/types/IPgaination";
import { deleteCookie, retrieveCookie } from "@/utils/cookie";

export async function findAllWorkers({ page, size }: { page: number, size: number }) {

    const token = await retrieveCookie("token")
    if (!token) {
        return { status: 401, message: "unathorized" } as IException
    }
    const authorization: Record<string, string> = { "authorization": `Bearer ${token}` }
    const response = await fetchApi<IPagination<IFuncionario>>(`funcionario/paginate?page=${page}&size=${size}`, "GET", null, authorization)

    if ("status" in response && (response.status == 401 || response.status == 403)) {
        deleteCookie("token")
        return { status: 401, message: "unathorized" } as IException
    }
    return response
}