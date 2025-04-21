"use server";

import { getFuncionariosAction } from "@/actions/funcionarios.request";
import ArtistaCard from "./artistas.card";

export default async function Artistas() {

	const funcionarios = await getFuncionariosAction({ page: 0, size: 10 })

	return (
		<main className="flex flex-1 flex-row flex-wrap justify-center sm:justify-normal bg-[#000000d6] py-15 px-1 sm:px-10 gap-4">
			{funcionarios && <ArtistaCard artistas={funcionarios} />}
		</main>
	);
}
