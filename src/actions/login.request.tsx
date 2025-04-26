"use server";

import { deleteCookie, saveCookie } from "@/actions/cookie.action";
import { loginUser } from "@/services/auth.service";
import { IException } from "@/types/errors/IException";
import { getErrorMessage } from "@/utils/error_message";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
	try {
		const username = formData.get("username") as string;
		const email = formData.get("email") as string;
		const senha = formData.get("senha") as string;

		const result = await loginUser({ authenticate: false, username, email, senha });

		if ("message" in result) {
			return { sucess: false, message: result.message };
		}

		const sucess = { sucess: true, message: "" };
		if ("token" in result) {
			return saveCookie({ id: "token", to_guard: result.token })
				.then(() => sucess)
				.catch((error) => ({ sucess: false, message: error }));
		} else {
			const except = result as IException
			return { sucess: false, message: except.message };
		}
	} catch (err: unknown) {
		console.log("linha31", err)
		return { sucess: false, message: getErrorMessage(err) };
	}
}

export async function authenticateAction(formData: FormData) {
	try {
		const username = formData.get("username") as string;
		const email = formData.get("email") as string;
		const senha = formData.get("senha") as string;

		const result = await loginUser({ authenticate: true, username, email, senha });

		if ("message" in result) {
			return { sucess: false, message: result.message };
		}

		const sucess = { sucess: true, message: "" };
		if ("token" in result) {
			return saveCookie({ id: "token", to_guard: result.token })
				.then(() => sucess)
				.catch((error) => ({ sucess: false, message: error }));
		} else {
			const except = result as IException
			return { sucess: false, message: except.message };
		}
	} catch (err: unknown) {
		console.log("linha58", err)
		return { sucess: false, message: getErrorMessage(err) };
	}
}

export async function exitLogin() {
	await deleteCookie("token")
	redirect("/")
}