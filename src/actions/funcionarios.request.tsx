"use server"

import { findAllWorkers } from "@/services/funcionario.service";
import { CustomHeaders } from "@/types/api/ApiPage";
import { IException } from "@/types/errors/IException";
import { getErrorMessage } from "@/utils/error_message";
import { API_KEY } from "@/utils/variables";

interface PageProps {
	page?: number, size?: number
}

export async function getFuncionariosAction({ page = 0, size = 10 }: PageProps) {
	try {
		if (!API_KEY) {
			throw new Error("api key naão existe")
		}
		
		const customHeaders: CustomHeaders = { cache: "force-cache", "X-API-KEY": API_KEY, next: { revalidade: 60, tags: ["funcionarios"] } }


		return await findAllWorkers({ page, size, customHeaders });
	} catch (err: unknown) {
		console.log(err)
		return { status: 400, message: getErrorMessage(err) } as IException;
	}
}
