import { fetchApi } from "@/lib/api";
import { IException } from "@/types/IException";
import { IFuncionario } from "@/types/IFuncionario";
import { IPagination } from "@/types/IPgaination";
import { deleteCookie, retrieveCookie } from "@/utils/cookie";

interface APiPage {
  page: number;
  size: number;
  customHeaders?: Record<string, string>;
}

export async function findAllWorkers({ page, size, customHeaders }: APiPage) {

    const token = await retrieveCookie("token")
    if (!token) {
        return { status: 401, message: "unathorized" } as IException
    }
    let authorization: Record<string, string> = { "authorization": `Bearer ${token}` }

    if(customHeaders){
        authorization = { ...customHeaders, ...authorization};
    }
    const response = await fetchApi<IPagination<IFuncionario>>(`funcionario/paginate?page=${page}&size=${size}`, "GET", null, authorization)

    if ("status" in response && (response.status == 401 || response.status == 403)) {
        deleteCookie("token")
        return { status: 401, message: "unathorized" } as IException
    }
    return response
}