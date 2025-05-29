"use client"

import { getFuncionariosAction } from "@/actions/funcionarios.actions"
import Loader from "@/app/loading"
import { SlideInSection } from "@/components/shared/animation/slidein"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { useRequest } from "@/hooks/query"
import { ARTISTAS } from "@/lib/constants"
import { IPagination } from "@/types/api/IPgaination"
import { IException } from "@/types/errors/IException"
import { IFuncionario } from "@/types/IFuncionario"
import { formatPhoneNumber } from "@/utils/format"
import Image from "next/image"
import { Suspense, useState } from "react"


export default function ArtistasContent({ initialData }: { initialData: IException | IPagination<IFuncionario> }) {

	const [page] = useState({ page: 0, size: 10 });

	const { data: content, isLoading } = useRequest({
		key: ["eventos_page", page],
		request: () =>
			getFuncionariosAction({ page: page.page, size: page.size }),
		enabled: true,
		refetchInterval: 50 * 600 * 1000,
		initialData: initialData
	});

	if (isLoading) {
		return <Loader />
	}


	if (!content || content instanceof Error) {
		return (
			<main className="bg-black flex flex-1 justify-center items-center text-white p-10">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Sem artistas encontrados</h1>
					<p className="text-gray-400">
						Ocorreu um erro ao carregar os artistas. Tente novamente mais tarde.
					</p>
				</div>
			</main>
		);
	}

	if ("status" in content) {
		return (
			<main className="bg-black flex flex-1 justify-center items-center text-white p-10">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Sem artistas encontrados</h1>
					<p className="text-gray-400">
						Ocorreu um erro ao carregar os artistas. Tente novamente mais tarde.
					</p>
				</div>
			</main>
		);
	}

	if (!content.data || content.data.length === 0) {
		return (
			<main className="bg-black flex flex-1 justify-center items-center text-white p-10">
				<h1 className="text-2xl font-bold">Nenhum artista disponível no momento</h1>
			</main>
		);
	}

	const artistas = content.data
	return (content &&
		<Suspense fallback={<Loader />}>
			<main className="flex flex-1 flex-row flex-wrap justify-center sm:justify-around bg-[#000000d6] py-15 px-1 sm:px-10 gap-4">
				{artistas.map((func, index) => {
					return (
						<SlideInSection key={index}>
							<Card key={index} className="min-w-[350px] w-[22%] flex flex-col px-3 h-fit shadow-md bg-zinc-700 border border-zinc-500 text-white">
								<CardTitle className="text-2xl tracking-wider font-serif font-bold">
									{func.nome}
								</CardTitle>
								<Image
									className="w-full aspect-square rounded-md max-h-[350px]"
									src={ARTISTAS[index]}
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
						</SlideInSection>
					)
				})}
			</main>
		</Suspense>
	)
}