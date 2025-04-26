"use server"

import { findAllEventos } from "@/services/eventos.service";
import { CustomHeaders } from "@/types/api/ApiPage";
import { IException } from "@/types/errors/IException";
import { getErrorMessage } from "@/utils/error_message";
import { API_KEY } from "@/utils/variables";

interface PageProps {
	page?: number, size?: number
}

export async function getEventosAction({ page = 0, size = 10 }: PageProps) {
	try {
		if(!API_KEY){
			throw new Error("api key naão existe")
		}

		const customHeaders: CustomHeaders = {
			cache: "force-cache",
			"X-API-KEY": API_KEY,
			next: { revalidade: 60 },

			// next: { revalidate: 60 },
		};

		return await findAllEventos({ page, size, customHeaders });
	} catch (err: unknown) {
		console.log(err)
		return { status: 400, message: getErrorMessage(err) } as IException;
	}
}
