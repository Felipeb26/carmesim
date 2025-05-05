"use client";

import { Button } from "@/components/ui/button";
import CalendarSingleWithYearSelector from "@/components/ui/calendar.year";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useCursor } from "@/providers/cursor.provider";
import { deleteClient, updateClient } from "@/services/cliente.service";
import { ICliente } from "@/types/ICliente";
import { IException } from "@/types/errors/IException";
import { formatDocumento } from "@/utils/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContent } from "@radix-ui/react-select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, subYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	nome: z.string().max(50),
	documento: z.string().min(9).max(12),
	email: z.string().email(),
	dataNascimento: z
		.date()
		.max(new Date(), { message: "Data não pode ser futura" }),
	telefone: z.string().min(9).max(11),
	termoConsentimento: z.boolean().default(false).optional(),
	tipoDocumento: z.enum(["CPF", "RG", "RNE"]),
});

export default function ClienteCard({ cliente }: { cliente: ICliente }) {
	const queryClient = useQueryClient();
	const { setLoading } = useCursor();

	const [checked, isChecked] = useState<boolean>(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: cliente.nome,
			email: cliente.email,
			documento: cliente.documento,
			telefone: cliente.telefone,
			termoConsentimento: cliente.termoConsentimento,
			tipoDocumento: cliente.tipoDocumento,
			dataNascimento: new Date(cliente.dataNascimento),
		},
	});

	const deleteClientMutation = useMutation({
		mutationFn: async (id: number) => {
			setLoading(true);
			try {
				return await deleteClient(id);
			} finally {
				setLoading(false);
			}
		},
		onSuccess: (data: ICliente | IException) => {
			if ("message" in data) {
				toast.error(data.message);
			} else {
				queryClient.invalidateQueries({
					queryKey: ["clientes"],
					fetchStatus: "idle",
					exact: false,
					type: "all",
				});
				toast.success(`Cliente ${data.nome} deletado com sucesso!`);
			}
		},
		onError: () => {
			toast.error("Erro ao deletar cliente.");
		},
	});

	const updateClientMutation = useMutation({
		mutationFn: async ({
			id,
			cliente,
		}: {
			id: number;
			cliente: ICliente;
		}) => {
			setLoading(true);
			try {
				return await updateClient(id, cliente);
			} finally {
				setLoading(false);
			}
		},
		onSuccess: (data: ICliente | IException) => {
			if ("message" in data) {
				toast.error(data.message);
			} else {
				queryClient.invalidateQueries({
					queryKey: ["clientes"],
					fetchStatus: "idle",
					exact: false,
					type: "all",
				});
				toast.success(`Cliente ${data.nome} atualizado com sucesso!`);
			}
		},
		onError: () => {
			toast.error("Erro ao atualizar cliente.");
		},
	});

	const handleSubmit: SubmitHandler<FieldValues> = (campos) => {
		setLoading(true);
		const clienteForm: ICliente = {
			id: cliente.id,
			nome: campos.nome,
			email: campos.email,
			documento: campos.documento,
			tipoDocumento: campos.tipoDocumento,
			dataNascimento: format(campos.dataNascimento, "yyyy-MM-dd"),
			telefone: campos.telefone,
			termoConsentimento: campos.termoConsentimento,
		};
		updateClientMutation.mutate({ id: cliente.id, cliente: clienteForm });
		setLoading(false);
	};

	const handleDeleteSubmit = () => {
		deleteClientMutation.mutate(cliente.id);
	};

	return (
		<div className="p-4 bg-gray-100 rounded flex flex-col flex-nowrap gap-4">
			<div className="flex-1 flex flex-row flex-nowrap my-4 lg:my-0 items-center gap-4">
				<Label
					htmlFor="edit-delete"
					className={`text-base  font-bold uppercase ${!checked ? "opacity-100" : "opacity-35"
						}`}
				>
					Alterar
				</Label>
				<Switch
					id="edit-delete"
					checked={checked}
					onCheckedChange={(it) => isChecked(it)}
				/>
				<Label
					htmlFor="edit-delete"
					className={`text-base font-bold uppercase ${checked ? "opacity-100" : "opacity-35"
						}`}
				>
					Deletar
				</Label>
			</div>
			<Form {...form}>
				<form
					className="max-w-md w-full flex flex-col gap-4"
					onSubmit={form.handleSubmit(handleSubmit)}
				>
					<FormField
						control={form.control}
						name="nome"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>nome</FormLabel>
									<FormControl>
										<Input
											placeholder={cliente.nome}
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
						name="email"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder={cliente.email}
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
						name="documento"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>documento</FormLabel>
									<FormControl>
										<Input
											placeholder={cliente.documento}
											value={formatDocumento(
												field.value || "",
												cliente.tipoDocumento
											)}
											onChange={(e) => {
												const rawValue = e.target.value.replace(/\D/g, '');
												field.onChange(rawValue);
											}}
										// {...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="tipoDocumento"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tipo de Documento</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value}
									>
										<SelectTrigger>
											<SelectValue
												placeholder="Selecione o tipo de documento"
												className="overflow-ellipsis"
											/>
										</SelectTrigger>
										<SelectContent
											position="popper"
											className="z-[9999]"
										>
											<SelectItem value="RG">
												RG
											</SelectItem>
											<SelectItem value="CPF">
												CPF
											</SelectItem>
											<SelectItem value="RNE">
												RNE
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="dataNascimento"
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
										<CalendarSingleWithYearSelector
											minYear={1950}
											maxYear={subYears(
												new Date(),
												16
											).getFullYear()}
											selected={field.value}
											today={
												new Date(cliente.dataNascimento)
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
					<FormField
						control={form.control}
						name="telefone"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>telefone</FormLabel>
									<FormControl>
										<Input
											placeholder={cliente.telefone}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					{!checked && (
						<Button disabled={checked} type="submit">
							alterar
						</Button>
					)}
					{checked && (
						<Button
							disabled={!checked}
							onClick={() => handleDeleteSubmit()}
						>
							deletar
						</Button>
					)}
				</form>
			</Form>
		</div>
	);
}
