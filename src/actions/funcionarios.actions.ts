"use server"

import { findAllWorkers } from "@/services/funcionario.service";
import { APiPage, CustomHeaders } from "@/types/api/ApiPage";
import { IException } from "@/types/errors/IException";
import { getErrorMessage } from "@/utils/error_message";
import { API_KEY } from "@/utils/variables";

export async function getFuncionariosAction({ page = 0, size = 10 }: APiPage) {
	try {
		if (!API_KEY) {
			throw new Error("api key não existe")
		}

		const customHeaders: CustomHeaders = { cache: "force-cache", "X-API-KEY": API_KEY, next: { revalidate: 60 * 10, tags: ["funcionarios"] } }


		return await findAllWorkers({ page, size, customHeaders });
	} catch (err) {
		console.log(err)
		return new IException([], getErrorMessage((err as Error).message), "endpoint", 500, undefined,);
	}
}
