"use client";

import ClientTable from "@/app/auth/dashboard/cliente/cliente.table";
import LoaderComponent from "@/components/shared/loader/loader";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useRequest } from "@/hooks/query";
import { useCursor } from "@/providers/cursor.provider";
import { findAllAgendamentos } from "@/services/agendamento.service";
import { findAllClients } from "@/services/cliente.service";
import { findAllWorkers } from "@/services/funcionario.service";
import { IAgendamento } from "@/types/IAgendamentos";
import { ICliente } from "@/types/ICliente";
import { IEvento } from "@/types/IEvento";
import { IException } from "@/types/IException";
import { IFuncionario } from "@/types/IFuncionario";
import { IPagination } from "@/types/IPgaination";
import { isException } from "@/utils/error_message";
import { useState } from "react";
import { toast } from "sonner";
import AgendamentoTable from "./agendamento/agendamento.table";
import ClienteCard from "./cliente/cliente.card";
import EventoCard from "./eventos/eventos.card";
import FuncionarioTable from "./funcionario/funcionario.table";
import { isMobileScreen } from "@/hooks/use-mobile";

const assertLoadingState = (loading: boolean[] | null) => {
	if (loading?.some((l) => l === true)) {
		return <LoaderComponent show={true} />;
	}
	return null;
};

export default function Dashboard() {
	const [item, setItem] = useState<
		ICliente | IFuncionario | IAgendamento | null
	>(null);
	const [page, setPage] = useState({ currentPage: 0, size: 10 });
	const [index, setIndex] = useState(3);
	const { setLoading } = useCursor();

	const {
		data: clientPagination,
		error: errorClient,
		isLoading: loadingCliente,
		isRefetching: refetchingCliente,
	} = useRequest({
		key: ["clientes", page],
		request: () => {
			try {
				setLoading(true);
				return findAllClients({
					page: page.currentPage,
					size: page.size,
				});
			} finally {
				setLoading(false);
			}
		},
		enabled: index === 0,
	});

	const {
		data: funcionarioPagination,
		error: errorFuncionario,
		isLoading: loadingFuncionario,
		isRefetching: refetchingFuncionario,
	} = useRequest({
		key: ["funcionarios", page],
		request: () =>
			findAllWorkers({ page: page.currentPage, size: page.size }),
		enabled: index === 1,
		refetchInterval: 5 * 30 * 100,
	});

	const {
		data: agendamentoPagination,
		error: errorAgendamento,
		isLoading: loadingAgedamento,
		isRefetching: refetchingAgendamento,
	} = useRequest({
		key: ["agendamentos", page],
		request: () =>
			findAllAgendamentos({
				page: page.currentPage,
				size: page.size,
			}),
		enabled: index === 2,
		refetchInterval: 5 * 30 * 100,
	});

	const handleError = (errors: Error[] | null) => {
		if (errors && errors.length > 0) {
			errors.forEach((error) => toast.error(error.message));
		}
	};

	handleError(
		[errorClient, errorFuncionario, errorAgendamento].filter(
			(e): e is Error => e !== null && e !== undefined
		)
	);

	const totalPages =
		(clientPagination &&
			!isException(clientPagination) &&
			clientPagination?.totalPages) ||
		(funcionarioPagination &&
			!isException(funcionarioPagination) &&
			funcionarioPagination?.totalPages) ||
		(agendamentoPagination &&
			!isException(agendamentoPagination) &&
			agendamentoPagination?.totalPages) ||
		0;

	const handlePageChange = (pageNumber: number) => {
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			setPage({ currentPage: pageNumber, size: page.size });
		}
	};

	function changeIndex(index: number) {
		setIndex(index);
		setItem(null);
		setPage({ currentPage: 0, size: 10 });
	}

	function getPaginationData<T>(
		data: IException | IPagination<T> | undefined
	): IPagination<T> | null {
		if (!data || isException(data)) return null;
		return data;
	}

	const evento: IEvento = {
		imagem: "https://i.pinimg.com/736x/f4/67/1a/f4671aecc3b283d3a1e5d93d8ba0d5c4.jpg",
		titulo: "Título padrão",
		descricao: "evento de teste",
		organizadoPor: "Organizador",
		dataEvento: new Date(),
		acompanhar: "remoto",
		localidade: "Local não informado",
		website: "#",
	};

	const handleOpenState = (open: boolean) => {
		if (!open) {
			setItem(null);
		}
	};

	const customDialog = () => {
		return (
			<>
				<Dialog open={item != null} onOpenChange={handleOpenState}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className="text-center font-bold tracking-wide">
								Alteração / Deleção
							</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						{item && "dataNascimento" in item && (
							<ClienteCard cliente={item} />
						)}
						{item && "dataHoraAgendada" in item && (
							<div>
								<p>
									<strong>Data agendada:</strong>
									{item.dataHoraAgendada}
								</p>
								<p>
									<strong>Status:</strong> {item.status}
								</p>
								<p>
									<strong>Preço estimado:</strong> R$
									{item.precoEstimado?.toFixed(2)}
								</p>
								<p>
									<strong>Pago:</strong>
									{item.pago ? "Sim" : "Não"}
								</p>
								{item.observacao && (
									<p>
										<strong>Obs:</strong> {item.observacao}
									</p>
								)}
							</div>
						)}
					</DialogContent>
				</Dialog>
			</>
		);
	};

	return (
		<main className="h-[calc(100dvh_-_var(--spacing)_*_25)] lg:flex lg:px-20 pt-10 pb-4 gap-5">
			<div className="block sm:hidden">
				{item && isMobileScreen() && customDialog()}
			</div>

			<ResizablePanelGroup direction="horizontal" className="h-full">
				<ResizablePanel
					className="rounded-t-2xl py-8 px-4 flex-col hidden lg:flex"
					defaultSize={25}
					minSize={18}
					maxSize={35}
				>
					{!item && <EventoCard evento={evento} />}
					{item && (
						<div className="mt-6 p-4 bg-gray-100 rounded">
							{item && (
								<Button
									className="bg-[#710101]"
									onClick={() => setItem(null)}
								>
									Limpar
								</Button>
							)}
							{"dataNascimento" in item && (
								<ClienteCard cliente={item} />
							)}
							{"dataHoraAgendada" in item && (
								<div>
									<p>
										<strong>Data agendada:</strong>
										{item.dataHoraAgendada}
									</p>
									<p>
										<strong>Status:</strong> {item.status}
									</p>
									<p>
										<strong>Preço estimado:</strong> R$
										{item.precoEstimado?.toFixed(2)}
									</p>
									<p>
										<strong>Pago:</strong>
										{item.pago ? "Sim" : "Não"}
									</p>
									{item.observacao && (
										<p>
											<strong>Obs:</strong>{" "}
											{item.observacao}
										</p>
									)}
								</div>
							)}
						</div>
					)}
				</ResizablePanel>

				<ResizableHandle withHandle className="hidden lg:flex" />

				<ResizablePanel
					minSize={30}
					className="rounded-t-2xl px-8 pb-8 pt-4"
				>
					<div className="bg-gray-50 mb-4 rounded-lg gap-4 items-center border-b-5 border-gray-400 flex-wrap sm:flex-row grid grid-cols-2 sm:grid-cols-none sm:flex">
						<h1
							className={`text-lg font-bold tracking-wide p-4 rounded-sm rounded-t-lg cursor-pointer transition duration-300
							${
								index === 0
									? "bg-gray-400 bg-opacity-100"
									: "bg-gray-300 bg-opacity-50 text-gray-500"
							}`}
							onClick={() => changeIndex(0)}
							title="Clientes"
						>
							Clientes
						</h1>
						<h1
							className={`text-lg font-bold tracking-wide p-4 rounded-lg cursor-pointer transition duration-300 bg-gray-300
							${
								index === 1
									? "bg-gray-400 bg-opacity-100"
									: "bg-gray-300 bg-opacity-30 text-gray-500"
							}`}
							onClick={() => changeIndex(1)}
							title="Funcionarios"
						>
							Funcionarios
						</h1>
						<h1
							className={`text-lg font-bold tracking-wide p-4 rounded-lg cursor-pointer transition duration-300 bg-gray-300
							${
								index === 2
									? "bg-gray-400 bg-opacity-100"
									: "bg-gray-300 bg-opacity-30 text-gray-500"
							}`}
							onClick={() => changeIndex(2)}
							title="Agendamentos"
						>
							Agendamentos
						</h1>
						<h1
							className={`text-lg font-bold tracking-wide p-4 rounded-lg cursor-pointer transition duration-300 bg-gray-300
							${
								index === 3
									? "bg-gray-400 bg-opacity-100"
									: "bg-gray-300 bg-opacity-30 text-gray-500"
							}`}
							onClick={() => changeIndex(3)}
							title="Eventos"
						>
							Eventos
						</h1>
					</div>

					<div className="mb-4 p-2 flex flex-row gap-6">
						<button className="uppercase bg-[#710101] text-white px-4 py-2 rounded-lg">
							pdf
						</button>
						<button className="uppercase px-4 py-2 bg-green-800 text-white rounded-lg">
							csv
						</button>
						{assertLoadingState(
							[
								loadingFuncionario,
								loadingAgedamento,
								loadingCliente,
							].filter((e) => e !== null && e !== undefined)
						)}
						{assertLoadingState(
							[
								refetchingCliente,
								refetchingFuncionario,
								refetchingAgendamento,
							].filter((e) => e !== null && e !== undefined)
						)}
					</div>

					<div className="overflow-auto mb-8 ">
						{index === 0 && getPaginationData(clientPagination) && (
							<ClientTable
								pagination={
									getPaginationData(clientPagination)!
								}
								setItem={setItem}
							/>
						)}
						{index === 1 &&
							getPaginationData(funcionarioPagination) && (
								<FuncionarioTable
									pagination={
										getPaginationData(
											funcionarioPagination
										)!
									}
									setItem={setItem}
								/>
							)}
						{index === 2 &&
							getPaginationData(agendamentoPagination) && (
								<AgendamentoTable
									pagination={
										getPaginationData(
											agendamentoPagination
										)!
									}
									setItem={setItem}
								/>
							)}
					</div>

					<div className="flex justify-between items-center mt-4">
						<div className="flex - flex-row gap-4">
							<select
								id="pageSize"
								value={page.size}
								onChange={(e) => {
									setPage({
										currentPage: 0,
										size: Number(e.target.value),
									});
								}}
								className="border p-2 rounded"
							>
								<option value={1}>1</option>
								<option value={5}>5</option>
								<option value={10}>10</option>
								<option value={15}>15</option>
								<option value={20}>20</option>
							</select>

							<button
								disabled={page.currentPage === 0}
								onClick={() =>
									handlePageChange(page.currentPage - 1)
								}
								className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
							>
								Anterior
							</button>
						</div>

						<span>
							Página{" "}
							{totalPages <= 0
								? page.currentPage
								: page.currentPage + 1}{" "}
							de {totalPages}
						</span>

						<button
							disabled={page.currentPage + 1 === totalPages}
							onClick={() =>
								handlePageChange(page.currentPage + 1)
							}
							className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
						>
							Próxima
						</button>
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</main>
	);
}
