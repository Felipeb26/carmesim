"use server"

import { getEventosAction } from "@/actions/eventos.request";
import { SlideInSection } from "@/components/shared/animation/slidein";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { formatarStringDate } from "@/utils/format";
import { Minus } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Studio Carmesim | Eventos",
		description: "Eventos promocionais e que exaltam qualidade e profissionalismo",
	};
}

export default async function Evento() {

	const data = await getEventosAction({ page: 0, size: 10 });

	if ("status" in data) {
		return (
			<main className="bg-black flex flex-1 justify-center items-center text-white p-10">
				<h1 className="text-2xl font-bold">Sem eventos encontrados</h1>
			</main>
		)
	}

	const eventos = data.data
	return (
		<>
			<main className="bg-[var(--light-background)]  min-h-screen flex flex-1 text-white py-10 px-5">
				<div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
					{eventos.map((evento, index) => (
						<SlideInSection key={index}>
							<Card
								key={index}
								className="group p-6 rounded-2xl shadow-md bg-zinc-700 border border-zinc-500 hover:border-white hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
							>
								<div className="flex flex-col items-center text-center h-full text-gray-300">
									<Image
										className="w-full h-48 object-cover rounded-lg mb-4"
										src="/images/mandala.webp"
										alt={evento.titulo}
										width={240}
										height={240}
										priority
									/>
									<CardTitle className="text-xl font-bold mb-2">{evento.titulo}</CardTitle>
									<CardDescription className="text-base mb-6">
										{evento.descricao}
									</CardDescription>
									<CardContent className="w-full flex flex-row justify-around mb-5">
										<span>{formatarStringDate(evento.dataInicio, true)}</span>
										<Minus />
										<span>{formatarStringDate(evento.dataFim, true)}</span>
									</CardContent>
									<span className="mt-auto text-gray-300 font-bold group-hover:underline">
										Saiba mais →
									</span>
								</div>
							</Card>
						</SlideInSection>
					))}
				</div>
			</main>
		</>
	);
}
