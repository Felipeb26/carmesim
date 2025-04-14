/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatarStringDate, formatarStringDateZulu } from "@/utils/format";
import { addHours } from "date-fns";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface Evento {
	imagem: string;
	titulo: string;
	descricao: string;
	organizadoPor: string;
	dataEvento: Date | string;
	acompanhar: "remoto" | "presencial" | "hibrido";
	localidade: string;
	website: string;
}

export default function EventoCard({
	imagem = "https://i.pinimg.com/736x/f4/67/1a/f4671aecc3b283d3a1e5d93d8ba0d5c4.jpg",
	titulo = "Título padrão",
	descricao = "evento de teste",
	organizadoPor = "Organizador",
	dataEvento = new Date(),
	acompanhar = "remoto",
	localidade = "Local não informado",
	website = "#",
}: Evento) {
	const dataFinal = dataEvento;

	return (
		<>
			<Card className="pt-0">
				<img
					className="rounded-t-2xl w-100 aspect-square"
					src={imagem}
					alt="imagem de evento"
					width="150"
					height="150"
				/>
				<CardHeader>
					<CardTitle>{titulo}</CardTitle>
				</CardHeader>
				<CardContent>
					<Label>
						<Link
							className="flex flex-row flex-nowrap w-full items-center"
							href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${formatarStringDateZulu(
								dataEvento
							)}/${formatarStringDateZulu(
								addHours(dataFinal, 3)
							)}&details=${descricao}&location=${localidade}&sf=true&output=xml`}
							target="_blank"
						>
							<Calendar size="24" color="#710101" />
							{formatarStringDate(dataEvento, true)}
						</Link>
					</Label>
					<Label>{descricao}</Label>
					<Label>Acompanhar de forma: {acompanhar}</Label>
				</CardContent>
				<CardFooter className="gap-10">
					<div>
						<Label>{localidade}</Label>
						<a href={website}>website acesso</a>
					</div>
					<Label>{organizadoPor}</Label>
				</CardFooter>
			</Card>
		</>
	);
}
