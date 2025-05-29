"use server"

import { Metadata } from "next";
import ContatosForm from "./contatos.form"
import ContatoMap from "./contatos.map";
import ContatosInfo from "./contatos.info";
import ContatoComments from "./contatos.comments";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Studio Carmesim | Contato",
		description: "Entre em contato a qualquer momento, faremos nosso melhor para lhe atender e agendarmos um horario",
	}
}

export default async function ContatoPage() {
	return <>
		<main className="bg-[var(--light-background)] flex flex-1 flex-col items-center text-white pt-10 px-10 lg:px-8 gap-5">
			<h2 className="text-center text-lg mb-4">
				Entre em contato conosco para marcar uma sessão ou entre em contatos para tirar suas dúvidas
			</h2>
			<ContatoMap />
			<ContatosForm />
			<ContatosInfo />
			<ContatoComments />
		</main>
	</>
}