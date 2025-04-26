"use server";

import { getFuncionariosAction } from "@/actions/funcionarios.request";
import Loader from "@/app/loader.page";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { formatPhoneNumber } from "@/utils/format";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Studio Carmesim | Artistas",
		description: "Artista de enorme qualidade, conhecimento e cuidado com e por você",
	};
}

export default async function Artistas() {

	const photos: string[] = [
		"/images/women-tattoo.webp",
		"/images/women-tattoo-floral.webp",
		"/images/secretario.webp"
	]


	const data = await getFuncionariosAction({ page: 0, size: 10 })
	if ("status" in data) {
		return (
			<main className="bg-black flex flex-1 justify-center items-center text-white p-10">
				<h1 className="text-2xl font-bold">Sem eventos encontrados</h1>
			</main>
		)
	}

	const artistas = data.data
	return (
		<Suspense fallback={<Loader />}>
			<main className="flex flex-1 flex-row flex-wrap justify-center sm:justify-around bg-[#000000d6] py-15 px-1 sm:px-10 gap-4">
				{artistas.map((func, index) => {
					return (
						<Card key={index} className="min-w-[350px] flex flex-col px-3 h-fit shadow-md bg-zinc-700 border border-zinc-500">
							<CardTitle className="text-lg tracking-wider font-bold">
								{func.nome}
							</CardTitle>
							<Image
								className="w-full aspect-square rounded-md max-h-[350px]"
								src={photos[index]}
								alt={`IMagem de numero ${index}`}
								width={240}
								height={240}
							/>
							<CardDescription>
								<p>
									{func.bio}
								</p>
								<span>
									{func.especialidade}
								</span>
							</CardDescription>
							<CardContent className="flex flex-col gap-2 px-0 ">
								<p>
									{func.email}
								</p>
								<p>
									{formatPhoneNumber(func.telefone)}
								</p>
								<p>
									{func.funcionarioType}
								</p>
							</CardContent>
						</Card>
					)
				})}
			</main>
		</Suspense>
	);
}
