"use client";

import { IAgendamento } from "@/types/IAgendamentos";
import { ICliente } from "@/types/ICliente";
import { IFuncionario } from "@/types/IFuncionario";
import { IPagination } from "@/types/IPgaination";
import { formatarPreco, formatPhoneNumber } from "@/utils/format";
import { Pencil, XSquare } from "lucide-react";

export default function FuncionarioTable({
	pagination,
	setItem,
}: {
	pagination: IPagination<IFuncionario>;
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
							id
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							nome
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							especialidade
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							email
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							status
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							telefone
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							tipo de funcionario
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-left capitalize text-nowrap">
							preco por hora
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-center capitalize text-nowrap">
							actions
						</th>
					</tr>
				</thead>
				<tbody>
					{pagination?.data.map((funcionario, index) => {
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
									{funcionario.nome}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center">
									{funcionario.especialidade}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center">
									{funcionario.email}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center">
									{funcionario.status}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center">
									{formatPhoneNumber(funcionario.telefone)}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center">
									{funcionario.funcionarioType}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center">
									{formatarPreco(funcionario.precoPorHora)}
								</td>
								<td className="p-3 text-sm text-gray-700 text-center flex flex-row justify-center gap-2">
									<Pencil
										color="#006deb"
										size={24}
										className="cursor-pointer"
										onClick={() => {
											setItem(null);
											setTimeout(() => setItem(funcionario), 0);
										}}
									/>
									<XSquare
										className="cursor-pointer"
										color="#eb0000"
										size={24}
									/>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}
