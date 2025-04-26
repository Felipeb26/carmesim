"use client";

import { IAgendamento } from "@/types/IAgendamentos";
import { ICliente } from "@/types/ICliente";
import { IFuncionario } from "@/types/IFuncionario";
import { IPagination } from "@/types/api/IPgaination";
import { formatarPreco } from "@/utils/format";
import { format } from "date-fns";
import { Pencil, XSquare } from "lucide-react";

export default function AgendamentoTable({
	pagination,
	setItem
}: {
	pagination: IPagination<IAgendamento>,
	setItem: React.Dispatch<
		React.SetStateAction<ICliente | IFuncionario | IAgendamento | null>
	>;
}) {
	return (
		<>
			<table className="w-full shadow">
				<thead className="bg-gray-300 border-b-2 border-gray-200">
					<tr>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							Id
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							Data/Hora
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							Cliente
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							Funcionario
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							Status
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							Observação
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							Preço estimado
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							Pago
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							Sinal Pago
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-center capitalize text-nowrap">
							actions
						</th>
					</tr>
				</thead>
				<tbody>
					{pagination?.data.map((agendamento, index) => {
						const bgColor =
							index % 2 == 0 ? "bg-white" : "bg-gray-300";
						return (
							<tr
								key={index}
								className={`${bgColor} houver:bg-gray-50`}
							>
								<td className="p-3 text-sm text-gray-900 text-center uppercase font-bold">
									{++index}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center">
									{format(
										new Date(agendamento.dataHoraAgendada),
										"dd/MM/yyyy"
									)}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center">
									{agendamento.clienteId}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center">
									{agendamento.funcionarioId}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center">
									{agendamento.status}
								</td>
								<td className="p-3 text-sm text-gray-700 text-nowrap">
									{agendamento.observacao}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center">
									{formatarPreco(agendamento.precoEstimado)}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center">
									{agendamento.pago}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center">
									{formatarPreco(agendamento.sinalPago)}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center flex flex-row justify-center gap-2">
									<Pencil
										color="#006deb"
										size={24}
										className="cursor-pointer"
										onClick={() => {
											setItem(null);
											setTimeout(
												() => setItem(agendamento),
												0
											);
										}}
									/>
									<XSquare color="#eb0000" size={24} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}
