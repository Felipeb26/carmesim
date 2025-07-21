import { z } from "zod";

export const loginSchema = z.object({
	username: z
		.string()
		.min(6, "Username minimo é de 6 caracters")
		.max(50, "Username deve contem maximo de 50 caracters"),
	email: z.string().email("Email invalido"),
	senha: z
		.string()
		.min(4, "Senha deve ter minimo de 4 caracters")
		.max(10, "Senha tem no maximo 10 caracters"),
});