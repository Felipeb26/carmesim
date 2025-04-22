import { fetchApi } from "@/lib/api";
import { IToken } from "@/types/IToken";
import { IUser } from "@/types/IUser";

export async function loginUser({
	authenticate,
	username,
	email,
	senha,
}: {
	authenticate:boolean
	username: string;
	email: string;
	senha: string;
}) {
	const user: IUser = { username: username, email: email, senha: senha }
	const response = await fetchApi<IToken, IUser>(authenticate ? "auth" : "auth/create", "POST", user)

	return response
}
