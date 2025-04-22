"use server"

import { findAllWorkers } from "@/services/funcionario.service";
import { IException } from "@/types/IException";
import { getErrorMessage } from "@/utils/error_message";

interface PageProps {
	page?: number, size?: number
}

export async function getFuncionariosAction({ page = 0, size = 10 }: PageProps) {
	try {
		const customHeaders = { cache: "force-cache", "X-API-KEY": "minha-chave-top-secreta-123" }
		return await findAllWorkers({ page, size, customHeaders });
	} catch (err: unknown) {
		return { status: 400, message: getErrorMessage(err) } as IException;
	}
}
