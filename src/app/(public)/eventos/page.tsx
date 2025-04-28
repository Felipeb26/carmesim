"use client"

import { getEventosAction } from "@/actions/eventos.request";
import Loader from "@/app/loader.page";
import { SlideInSection } from "@/components/shared/animation/slidein";
import ControlPageFlow from "@/components/shared/page/control-page-flow";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRequest } from "@/hooks/query";
import { formatarStringDate } from "@/utils/format";
import { Minus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Evento() {
	const [page, setPage] = useState({ currentPage: 0, size: 10 });

	const { data: content, isLoading } = useRequest({
		key: ["eventos_page", page],
		request: () =>
			getEventosAction({ page: page.currentPage, size: page.size }),
		enabled: true,
		refetchInterval: 50 * 600 * 1000,
	});

	if (isLoading) {
		return <Loader />
	}

	if (!content) {
		return (
			<main className="bg-black flex flex-1 justify-center items-center text-white p-10 flex-col">
				<h1 className="text-2xl font-bold">Ainda nenhum evento encontrado</h1>
				<p className="text-gray-400 text-center">
					Ocorreu um erro ao carregar os eventos. Tente novamente mais tarde.
				</p>
			</main>
		)
	}

	if ("status" in content || content.data.length <= 0) {
		return (
			<main className="bg-black flex flex-1 justify-center items-center text-white p-10 flex-col">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Sem evento encontrados</h1>
					<p className="text-gray-400 text-center">
						Ocorreu um erro ao carregar os eventos. Tente novamente mais tarde.
					</p>
				</div>
			</main>
		);
	}

	const handleChangePageChange = (pageNumber: number) => {
		if (pageNumber >= 0 && pageNumber <= content.totalPages) {
			setPage({ currentPage: pageNumber, size: page.size });
		}
	};

	const handleChangePageSize = (pageSize: number) => {
		setPage({
			currentPage: 0,
			size: pageSize
		});
	};

	const eventos = content.data
	return (
		<>
			<main className="bg-[var(--light-background)]  min-h-screen flex flex-1 flex-col gap-10 text-white py-10 px-5">
				<ControlPageFlow
					color="var(--color950)" hoverColor="var(--color900)"
					page={{ currentPage: page.currentPage, size: page.size, "totalPages": content.totalPages }}
					changePageSize={handleChangePageSize}
					previosPage={handleChangePageChange}
					nextPage={handleChangePageChange}
					props={
						<div className="w-full grid grid-cols-2 gap-5 my-2">
							<Input type="date" />
							<Input type="date" />
						</div>

					}
				/>
				<div className="w-full  mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

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
