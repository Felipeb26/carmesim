"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { sendMail } from "@/services/contato.service";
import { ASSUNTO_OPTIONS, ContactFormData, formSchema, IContatos } from "@/types/contatos/IContatos";
import { getErrorMessage } from "@/utils/error_message";
import { formatPhoneNumber } from "@/utils/format";
import { CAPTCHA_TOKEN } from '@/utils/variables';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


export default function ContatosForm() {
	const captchaRef = useRef(null);
	const [token, setToken] = useState<string | null>(null);

	const form = useForm<ContactFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: "",
			email: "",
			telefone: "",
			mensagem: "",
			assunto: "Orçamento para tatuagem",
			newsletter: true
		},
	});

	const submitForm: SubmitHandler<FieldValues> = async (data) => {
		if (!token) {
			toast.error("Captcha não foi validado!");
			return;
		}
		setToken(null);
		const contato: IContatos = {
			nome: data.nome,
			telefone: data.telefone,
			email: data.email,
			assunto: data.assunto,
			newsletter: data.newsletter
		};
		console.table(contato);
		const result = await sendMail({ data: contato });
		if ("message" in result) {
			toast.error(getErrorMessage(result));
		} else {
			toast.success('Email enviado com sucesso');
		}
	};

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-4 sm:w-[600px] md:w-1/2 min-w-[350px] h-fit p-0 lg:px-2"
				onSubmit={form.handleSubmit(submitForm)}
				autoComplete="on"
			>
				<div className="flex flex-row flex-nowrap w-full gap-5">
					<FormField
						control={form.control}
						name="nome"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormControl>
									<Input
										type="text"
										{...field}
										autoComplete="username webauthn"
										placeholder="Nome"
										required
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="telefone"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormControl>
									<Input
										type="tel"
										{...field}
										autoComplete="tel webauthn"
										placeholder="Telefone"
										onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="email"
									{...field}
									autoComplete="email"
									placeholder="E-mail"
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="assunto"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Selecione o tipo de documento" className="overflow-ellipsis" />
									</SelectTrigger>
									<SelectContent
										position="item-aligned"
										className="max-w-[90%] py-0 px-2 bg-[var(--light-background)] text-white"
									>
										{ASSUNTO_OPTIONS.map((option) => (
											<SelectItem
												key={option}
												className="bg-gray-700 text-white my-2 font-bold tracking-wider uppercase"
												value={option}
											>
												{option}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="mensagem"
					render={({ field }) => (
						<FormItem>
							<FormControl className="h-14">
								<Textarea
									className="resize-none"
									disabled={field.disabled}
									maxLength={150}
									placeholder="Mensagem"
									rows={3}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="newsletter"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center space-x-2 space-y-0">
							<FormControl>
								<Checkbox
									className="h-5 w-5 bg[val(--color950)]"
									id="newsletter"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<label
								htmlFor="newsletter"
								className="text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Quero receber novidades e eventos
							</label>
						</FormItem>
					)}
				/>

				<HCaptcha
					sitekey={CAPTCHA_TOKEN!}
					onVerify={(token: string) => setToken(token)}
					ref={captchaRef}
				/>

				<Button type="submit" className="text-lg tracking-wider bg-[var(--color950)]">
					enviar
				</Button>
			</form>
		</Form>
	);
}