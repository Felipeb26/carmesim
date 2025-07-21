"use server"

import { Metadata } from "next";
import EventsContent from "./eventos.content"
import { getEventosAction } from "@/actions/eventos.request";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Studio Carmesim | Eventos",
		description: "Eventos de tatuagen, conversas, promoções e muito mais!",
	};
}

export default async function Evento() {
	const initialData = await getEventosAction({ page: 0,size: 10});
	return <EventsContent initialData={initialData}/>
}