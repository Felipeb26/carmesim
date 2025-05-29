"use server";

import { Metadata } from "next";
import ArtistasContent from "./artista.content";
import { getFuncionariosAction } from "@/actions/funcionarios.actions";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Studio Carmesim | Artistas",
		description: "Artista de enorme qualidade, conhecimento e cuidado com e por você",
	};
}

export default async function Artistas() {
	const initialData = await getFuncionariosAction({ page: 0,size: 10});
	return <ArtistasContent initialData={initialData}/>
}