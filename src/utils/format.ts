import { ITipoDocumentos } from "@/types/ITipoDocumentos";
import { format } from "date-fns";

export const formatDocumento = (
	document: string,
	tipoDocumento: ITipoDocumentos
) => {
	if (tipoDocumento == "RG") {
		document = document.replace(/\D/g, "");
		document = document.replace(/(\d{2})(\d)/, "$1.$2");
		document = document.replace(/(\d{3})(\d)/, "$1.$2");
		return document.replace(/(\d{3})(\d{1})$/, "$1-$2");
	}
	if (tipoDocumento == "CPF") {
		document = document.replace(/\D/g, "");
		document = document.replace(/(\d{3})(\d)/, "$1.$2");
		document = document.replace(/(\d{3})(\d)/, "$1.$2");
		document = document.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
		return document;
	}
	if (tipoDocumento == "RNE") {
		document = document.toUpperCase().replace(/[^A-Z0-9]/g, "");
		return document.replace(/([A-Z]{1,2})(\d{0,7})/, "$1$2");
	}
};

export const formatPhoneNumber = (phoneNumber: string) => {
	const cleaned = phoneNumber.replace(/\D/g, "");

	// Com código de país
	if (cleaned.length >= 12 && cleaned.length <= 13) {
		const countryLength = cleaned.length === 13 ? 3 : 2;
		const country = cleaned.slice(0, countryLength);
		const ddd = cleaned.slice(countryLength, countryLength + 2);
		const number = cleaned.slice(countryLength + 2);

		if (number.length === 8) {
			return `+${country} (${ddd}) ${number.slice(0, 4)}-${number.slice(4)}`;
		} else {
			return `+${country} (${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`;
		}
	}

	// Sem código de país
	if (cleaned.length === 10) {
		const ddd = cleaned.slice(0, 2);
		const number = cleaned.slice(2);
		return `(${ddd}) ${number.slice(0, 4)}-${number.slice(4)}`;
	}

	if (cleaned.length === 11) {
		const ddd = cleaned.slice(0, 2);
		const number = cleaned.slice(2);
		return `(${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`;
	}

	// Retorna original se não encaixar em nenhum caso
	return phoneNumber;
};


export function formatarPreco(valor: number | undefined) {
	valor = valor == undefined ? 0 : valor;
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(valor);
}

export const formatarStringDate = (
	date: string | Date,
	horas?: boolean
): string => {
	const isString = typeof date === "string";
	const containsHora: boolean = isString && date.includes("T");

	if (horas) {
		if (date instanceof Date) {
			return date
				.toLocaleDateString("pt-BR", {
					timeZone: "America/Sao_Paulo",
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
					hour: "2-digit",
					hour12: false,
					minute: "2-digit",
				})
				.replace(",", "");
		}
		const data = containsHora ? date : date + "T00:00:00";
		return new Date(data)
			.toLocaleString("pt-BR", {
				timeZone: "America/Sao_Paulo",
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
			})
			.replace(",", "");
	}

	if (date instanceof Date) {
		return date
			.toLocaleDateString("pt-BR", {
				timeZone: "America/Sao_Paulo",
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			})
			.replace(",", "");
	}

	const data = containsHora ? date : date + "T00:00:00";
	return new Date(data)
		.toLocaleDateString("pt-BR", {
			timeZone: "America/Sao_Paulo",
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		})
		.replace(",", "");
};


export const formatarStringDateZulu = (data: string | Date) => {
	return format(data, "yyyyMMdd'T'HHmmss'Z'");
};
