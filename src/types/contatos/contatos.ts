export interface IContatos {
	nome: string;
	email: string;
	telefone?: string;
	assunto: "Outros assuntos" |"Orçamento para tatuagem" | "Dúvidas sobre estilo de tatuagem" | "Agendamento de sessão" | "Consultoria sobre design de tatuagem" | "Informações sobre cuidados pós-tatuagem";
	mensagem?: string;
	newsletter: boolean;
}
