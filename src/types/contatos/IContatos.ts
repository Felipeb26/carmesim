import { z } from "zod";

export interface IContatos {
	nome: string;
	email: string;
	telefone?: string;
	assunto: "Outros assuntos" |"Orçamento para tatuagem" | "Dúvidas sobre estilo de tatuagem" | "Agendamento de sessão" | "Consultoria sobre design de tatuagem" | "Informações sobre cuidados pós-tatuagem";
	mensagem?: string;
	newsletter: boolean;
}

export const ASSUNTO_OPTIONS = [
	"Orçamento para tatuagem",
	"Dúvidas sobre estilo de tatuagem",
	"Agendamento de sessão",
	"Consultoria sobre design de tatuagem",
	"Informações sobre cuidados pós-tatuagem",
	"Outros assuntos"
] as const;


export const formSchema = z.object({
	nome: z
		.string()
		.min(6, "Username minimo é de 6 caracters")
		.max(50, "Username deve contem maximo de 50 caracters"),
	email: z.string().email("Email invalido"),
	telefone: z
		.string()
		.min(9, "Telefone invalido")
		.max(15, "Telefone tem no maximo 11 caracters")
		.nonempty("telefone não pode estar vazio"),
	mensagem: z.string().max(150, "mensagem muito grande").optional(),
	newsletter: z.boolean().optional(),
	assunto: z.enum(["Outros assuntos", "Orçamento para tatuagem", "Dúvidas sobre estilo de tatuagem", "Agendamento de sessão", "Consultoria sobre design de tatuagem", "Informações sobre cuidados pós-tatuagem"]),
});

export type ContactFormData = z.infer<typeof formSchema>;
