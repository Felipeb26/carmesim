"use client"

import { getEventosAction } from "@/actions/eventos.request";
import Loader from "@/app/loading";
import { SlideInSection } from "@/components/shared/animation/slidein";
import ControlPageFlow from "@/components/shared/page/control-page-flow";
import { Button } from "@/components/ui/button";
import CalendarWithYearSelector from "@/components/ui/calendar.year";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRequest } from "@/hooks/query";
import { formatarStringDate } from "@/utils/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, subYears } from "date-fns";
import { CalendarIcon, Minus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
	dataDe: z.date().min(new Date(), { message: "Data não pode ser futura" }),
	dataAte: z.date().min(new Date(), { message: "Data não pode ser futura" }),
});

export default function Evento() {
	const [page, setPage] = useState({ currentPage: 0, size: 10 });

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			dataDe: new Date(),
			dataAte: new Date()
		},
	});

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

	if (!content || content instanceof Error) {
		return (
			<main className="bg-black flex flex-1 justify-center items-center text-white p-10 flex-col">
				<h1 className="text-2xl font-bold">Ainda nenhum evento encontrado</h1>
				<p className="text-gray-400 text-center">
					Ocorreu um erro ao carregar os eventos. Tente novamente mais tarde.
				</p>
			</main>
		)
	}

	if ("status" in content || (content.data && content.data.length <= 0)) {
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


	// Buscar eventos por data


	const eventos = content.data
	return (
		<>
			<main className="bg-[var(--light-background)]  min-h-screen flex flex-1 flex-col gap-10 text-white py-10 px-5">
				<ControlPageFlow
					color="var(--color950)" hoverColor="var(--color900)"
					page={{ currentPage: page.currentPage, size: page.size, totalItems: content.totalItems, "totalPages": content.totalPages }}
					changePageSize={handleChangePageSize}
					previousPage={handleChangePageChange}
					nextPage={handleChangePageChange}
				>
					{/* <Form {...form}>
						<form className="w-full grid grid-cols-2 gap-5 my-2">
							<FormField
								control={form.control}
								name="dataDe"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Data de Nascimento</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button variant={"outline"}>
														{field.value ? (
															format(
																field.value,
																"dd/MM/yyyy"
															)
														) : (
															<span>
																Selecione uma data
															</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto p-0"
												align="start"
											>
												<CalendarWithYearSelector
													minYear={1950}
													maxYear={subYears(
														new Date(),
														16
													).getFullYear()}
													selected={field.value}
													today={
														new Date()
													}
													onSelect={(date) => {
														if (date) {
															field.onChange(date);
														}
													}}
													onDisabled={(date) =>
														date >
														subYears(new Date(), 10) ||
														date < new Date("1900-01-01")
													}
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<button type="submit">
								enviar
							</button>
						</form>
					</Form> */}
				</ControlPageFlow>


				<div className="w-full  mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
					{eventos.map((evento, index) => (
						<SlideInSection key={index}>
							<Card className="group p-6 rounded-2xl bg-zinc-800 border border-zinc-700 shadow-md hover:border-[var(--color950)] hover:shadow-pink-700/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
								<div className="flex flex-col items-center text-center h-full text-gray-300">
									<Image
										className="w-full h-48 object-cover rounded-lg mb-4 transition duration-300 group-hover:brightness-125 group-hover:scale-105"
										src="/images/mandala_eu.webp"
										alt={evento.titulo}
										width={100}
										height={100}
										priority
									/>
									<CardTitle className="text-xl font-bold text-white mb-2">{evento.titulo}</CardTitle>
									<CardDescription className="text-base text-gray-300 mb-6">
										{evento.descricao}
									</CardDescription>
									<CardContent className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 mb-5">
										<span>{formatarStringDate(evento.dataInicio, true)}</span>
										<Minus className="w-4 h-4" />
										<span>{formatarStringDate(evento.dataFim, true)}</span>
									</CardContent>
									<span className="mt-auto text-gray-200 font-bold group-hover:underline transition trac">
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
