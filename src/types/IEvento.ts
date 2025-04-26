export interface IEvento {
	id: number;
	imagem: string;
	titulo: string;
	descricao: string;
	organizadoPor: string;
	dataInicio: Date | string;
	dataFim: Date | string;
	acompanhar: "remoto" | "presencial" | "hibrido";
	localidade: string;
	website: string;
}