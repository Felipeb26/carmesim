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
import { IEvento } from "@/types/IEvento";
import { formatarStringDate, formatarStringDateZulu } from "@/utils/format";
import { addHours } from "date-fns";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function EventoCard({ evento }: { evento: IEvento }) {
	const {
		imagem,
		titulo,
		descricao,
		organizadoPor,
		dataEvento,
		acompanhar,
		localidade,
		website,
	} = evento;

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
