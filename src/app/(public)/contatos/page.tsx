"use client"

import { SlideInSection } from "@/components/shared/animation/slidein";
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
import { Textarea } from "@/components/ui/textarea";
import { formatarStringDate, formatPhoneNumber } from "@/utils/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, MapPin, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// export const metadata: Metadata = {
// 	title: "Studio Carmesim | Contato",
// 	description: "Entre em contato a qualquer momento, faremos nosso melhor para lhe atender e agendarmos um horario",
// }

const link = "https://www.google.com/maps/place/Av.+Interlagos,+2727+-+Jardim+Umuarama,+S%C3%A3o+Paulo+-+SP,+04661-200/@-23.6770337,-46.6853879,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce501d31524e6f:0xb0d3d5c627326867!8m2!3d-23.6770338!4d-46.6805116!16s%2Fg%2F11csfwlvlc?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoASAFQAw%3D%3D"
const linkEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.9699186103567!2d-46.68538787521138!3d-23.67703372368533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce501d31524e6f%3A0xb0d3d5c627326867!2sAv.%20Interlagos%2C%202727%20-%20Jardim%20Umuarama%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004661-200!5e0!3m2!1spt-BR!2sbr!4v1745637879605!5m2!1spt-BR!2sbr"


const formSchema = z.object({
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
});

const fakeComments = [
	{
		id: 1,
		user: { name: "João Silva", avatar: "/avatar1.png" },
		rating: 4,
		date: "2025-04-20",
		text: "Muito bom atendimento, recomendo!",
		likes: 12,
	},
	{
		id: 2,
		user: { name: "Maria Oliveira", avatar: "/avatar2.png" },
		rating: 5,
		date: "2025-04-19",
		text: "Melhor experiência que tive nos últimos tempos.",
		likes: 30,
	},
	{
		id: 3,
		user: { name: "Carlos Andrade", avatar: "/avatar3.png" },
		rating: 3,
		date: "2025-04-18",
		text: "Bom, mas poderia ser mais rápido no atendimento.",
		likes: 5,
	},
	{
		id: 4,
		user: { name: "Fernanda Costa", avatar: "/avatar4.png" },
		rating: 4.5,
		date: "2025-04-15",
		text: "Ambiente limpo, organizado e profissionais incríveis!",
		likes: 22,
	}
];


export default function Contato() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: "",
			email: "",
			telefone: "",
			mensagem: "",
			newsletter: true
		},
	});

	const submitForm: SubmitHandler<FieldValues> = async (data) => {
		console.log(data)
		toast.success('Email não enviado com sucesso');
	}

	return (
		<main className="bg-[var(--light-background)] flex flex-1 flex-col items-center text-white pt-10 px-8 gap-5">
			<h2 className="text-center text-lg mb-4">Entre em contato conosco para marcar uma sessão ou entre em contatos para tirar suas dúvidas</h2>
			<div className="w-full h-64 rounded-xl overflow-hidden flex justify-center">
				<a href={link} target="_blank" rel="noopener noreferrer" className="w-[600px] md:w-1/2"
					aria-label="Abrir localização no Google Maps">
					<iframe
						className="pointer-events-none w-full"
						src={linkEmbed}
						width="600"
						height="450"
						allowFullScreen
						loading="lazy" />
				</a>
			</div>
			<Form {...form}>
				<form
					className="flex flex-col gap-4 sm:w-[600px] md:w-1/2 min-w-[350px] h-fit p-0 lg:px-2"
					onSubmit={form.handleSubmit(submitForm)} autoComplete="on"
				>
					<div className="flex flex-row flex-nowrap w-full gap-5">
						<FormField
							control={form.control}
							name="nome"
							render={({ field }) => {
								return (
									<FormItem className="flex-1">
										<FormControl>
											<Input
												type="text"
												{...field}
												autoComplete="username webauthn"
												placeholder={"Nome"}
												required
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="telefone"
							render={({ field }) => {
								return (
									<FormItem className="flex-1">
										<FormControl>
											<Input
												type="tel"
												{...field}
												autoComplete="tel webauthn"
												placeholder={"Telefone"}
												onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
					</div>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => {
							return (
								<FormItem>
									<FormControl>
										<Input
											type="email"
											{...field}
											autoComplete="email"
											placeholder={"E-mail"}
											required
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="mensagem"
						render={({ field }) => {
							return (
								<FormItem>
									<FormControl>
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
							);
						}}
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
					<Button type="submit" className="text-lg tracking-wider bg-[var(--color950)]">
						enviar
					</Button>
				</form>
			</Form>
			<div className="flex flex-col sm:flex-row gap-4 w-full justify-center my-5 sm:mt-2">
				<span className="flex items-center gap-2 justify-center">
					<MapPin className="mt-1" size={20} color="var(--color900)" />
					<p className="text-sm text-wrap">
						Avenida Interlagos, 2727
					</p>
				</span>
				<span className="flex items-center gap-2 justify-center">
					<Clock className="mt-1" size={20} color="var(--color900)" />
					<p className="text-sm text-wrap">
						Aberto de terça a domingo das 09:00 às 20:00
					</p>
				</span>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 gap-6">
				{fakeComments.map((comment, index) => (
					<SlideInSection key={index}>
						<div key={comment.id} className="flex items-start gap-4 bg-zinc-900 p-4 rounded-xl cursor-pointer">
							<Image
								src={"/images/icognito_user.webp"}
								width={50}
								height={50}
								alt={comment.user.name}
								className="w-10 h-10 rounded-full object-cover"
							/>
							<div className="flex-1">
								<div className="flex justify-between items-center">
									<span className="font-semibold">{comment.user.name}</span>
									<span className="text-sm text-zinc-400">{formatarStringDate(comment.date)}</span>
								</div>
								<div className="flex items-center gap-1 text-yellow-400 mb-1">
									{Array.from({ length: comment.rating }, (_, i) => (
										<Star key={i} size={16} fill="currentColor" />
									))}
								</div>
								<p className="text-zinc-300">{comment.text}</p>
								<div className="flex items-center gap-4 mt-2 text-zinc-400 text-sm">
									<button className="flex items-center gap-1 hover:text-white">
										<ThumbsUp size={16} /> {comment.likes}
									</button>
								</div>
							</div>
						</div>
					</SlideInSection>
				))}
			</div>

		</main>
	)
}