"use client";

import { loginAction } from "@/actions/login.request";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCursor } from "@/providers/cursor.provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Github } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
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

export default function Login() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			senha: "",
		},
	});
	const [showPass, setShowPass] = useState(false);

	const { setLoading } = useCursor();

	const [isPending, startTransition] = useTransition();
	const route = useRouter();

	const submitForm: SubmitHandler<FieldValues> = (data) => {
		setLoading(true);
		startTransition(async () => {
			const form = new FormData();
			form.append("username", data.username);
			form.append("email", data.email);
			form.append("senha", data.senha);

			const response = await loginAction(form);

			if (response.sucess) {
				setLoading(false);
				toast.success("Login realizado com sucesso");
				route.push("/auth/dashboard");
			} else {
				setLoading(false);
				toast.error(response.message);
			}
		});
	};

	return (
		<>
			<div className="h-[calc(90.6dvh_-_var(--spacing)_*_25)] bg w-full flex justify-center py-20 lg:py-30">
				<Form {...form}>
					<form
						className="shadow-[0_0_0.5rem_black] rounded-2xl p-8 px-15 flex flex-col gap-6 w-1/3 min-w-[350px] h-fit"
						onSubmit={form.handleSubmit(submitForm)}
					>
						<h1 className="mb-10 text-2xl font-bold underline text-center">
							Realizar Login {isPending}
						</h1>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel className="capitalize">
											username
										</FormLabel>
										<FormControl>
											<Input
												type="text"
												{...field}
												autoComplete="username"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel className="capitalize">
											email
										</FormLabel>
										<FormControl>
											<Input
												type="email"
												{...field}
												autoComplete="email"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="senha"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel className="capitalize">
											senha
										</FormLabel>
										<FormControl className="flex flex-row flex-nowrap">
											<div>
												<Input
													type={
														showPass
															? "text"
															: "password"
													}
													{...field}
													autoComplete="current-password webauthn"
												/>
												<Button
													type="button"
													className="bg-white text-black border-0 hover:bg-accent hover:text-accent-foreground"
													onClick={() =>
														setShowPass((p) => !p)
													}
												>
													{showPass && (
														<EyeOff size={24} />
													)}
													{!showPass && (
														<Eye size={20} />
													)}
												</Button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<div className="w-full flex justify-center items-center text-blue-500 font-bold underline text-sm">
							<a href="#" className="text-nowrap capitalize">
								criar login
							</a>
							&nbsp;&nbsp;/&nbsp;&nbsp;
							<a href="#" className="text-nowrap capitalize">
								esqueci a senha
							</a>
						</div>

						<div className="w-full flex flex-row justify-center items-center gap-8 my-4">
							<Button
								type="button"
								className="bg-white text-red-500 font-bold uppercase border-2 border-black py-2 p-4 rounded-lg"
							>
								<Image
									src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
									alt="login google" width={15} height={15}
								/>
								google
							</Button>
							<Button
								type="button"
								className="bg-white text-black uppercase font-bold border-2 border-black py-2 px-4 rounded-lg hover:text-white"
							>
								<Github />
								github
							</Button>
						</div>
						<Button type="submit" className="text-lg">
							enviar
						</Button>
					</form>
				</Form>
			</div>
		</>
	);
}
