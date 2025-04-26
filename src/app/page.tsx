"use server"

import AutoCarousel from "@/components/shared/carrousel/autocarrousel";
import Instagram from "@/components/shared/icons/Instagram";
import WhatsApp from "@/components/shared/icons/Whatsapp";
import { CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {


	const images: string[] = [
		"/images/animal_0.webp",
		"/images/animal.webp",
		"/images/leg.webp",
		"/images/mandala.webp",
		"/images/pecoco.webp",
		"/images/pombo-tattoo.webp",
		"/images/realismo_0.webp",
		"/images/realismo_1.webp",
		"/images/seio_tattoo.webp",
	]

	const artistas: string[] = [
		"/images/women-tattoo.webp",
		"/images/women-tattoo-floral.webp",
		"/images/secretario.webp"
	]
	async function gotoScreenArtistas() {
		"use server"
		redirect("/artistas")
	}

	async function gotoScreenGaleria() {
		"use server"
		redirect("/galeria")
	}

	return (
		<main className="flex-1 flex-col">
			<div className="flex-1/2">
				<div className="flex flex-col lg:flex-row h-fit">

					<div className="flex-[0.1] lg:max-w-[3rem] flex items-center justify-center bg-red-800">
						<p className="lg:rotate-90 w-full uppercase font-bold whitespace-nowrap text-center flex flex-nowrap justify-center gap-5 text-white">
							<Link
								className="text-purple-300 hover:text-purple-400 underline font-semibold transition flex items-center gap-2"
								href="https://www.instagram.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Instagram />
								instagram
							</Link>
							&nbsp;/&nbsp;
							<Link
								className="text-green-300 hover:text-green-400 underline font-semibold transition flex items-center gap-2"
								href="https://wa.me/+5511971404157?text=Olá%20meu%20nome%20é%20fulano%20gostaria%20de%20questionar%20sobre%20os%20cursos"
								target="_blank"
								rel="noopener noreferrer"
							>
								<WhatsApp />
								whatsapp
							</Link>
						</p>
					</div>

					<div className="flex-1 flex flex-nowrap flex-col bg-black opacity-85 pt-8 pb-2 lg:py-0 lg:content-center px-10 text-white gap-4 justify-center">
						<h1 className="text-3xl font-bold tracking-wide font-serif">
							Studio Carmesim
						</h1>
						<CardTitle className="mb-3 tracking-wider">
							Transforme Sua História em Arte: Tatuagens Exclusivas Para Você!
						</CardTitle>
						<p>Cada tatuagem que fazemos é única, assim como você. Nossa missão é ajudar a expressar sua verdadeira essência através de uma arte duradoura e personalizada. Com artistas experientes e dedicados, criamos tatuagens que falam por si mesmas. Entre em contato e venha criar sua próxima obra de arte!
						</p>
						<Link href={"/contatos"} className="font-bold text-blue-500 underline cursor-pointer">
							Agende sua consulta agora e comece sua jornada para uma tatuagem inesquecível!
						</Link>
					</div>

					<div className="flex-1 flex bg-[#000000d9] items-baseline xls:flex p-5">
						<Image
							className="w-full max-h-[70%] aspect-square min-h[200px] rounded-sm"
							src="/images/mandala_eu.webp"
							alt="imagem"
							width="240"
							height="240"
							priority
						/>
					</div>
				</div>
			</div>
			<section className="bg-[#0B0B0B] flex-1/2 grid grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 text-white">
				<div className="bg-[#5E3838] flex justify-center items-center p-1 lg:ml-10 rounded-2xl transition-opacity duration-700 opacity-0 animate-[fadeIn_0.7s_forwards]">
					<Image
						className="w-full aspect-auto rounded-lg"
						src="/images/realismo_1.webp"
						alt="imagem"
						width={240}
						height={240}
					/>
				</div>
				<div
					onClick={gotoScreenGaleria}
					className="flex flex-col lg:px-10 transition-opacity duration-700 opacity-0 animate-[fadeIn_0.7s_forwards] gap-2 cursor-pointer">
					<h1 className="capitalize font-bold text-2xl">Galeria</h1>
					<div className="bg-[#710101] p-2 rounded-sm flex justify-center items-center">
						<AutoCarousel images={images} />
					</div>
				</div>
				<div className="flex flex-col lg:px-10 transition-opacity duration-700 opacity-0 animate-[fadeIn_0.7s_forwards] gap-2 cursor-pointer">
					<h1 className="capitalize font-bold text-2xl">Booking</h1>
					<div className="bg-transparent border-2 p-2 rounded-sm flex justify-center items-center">
						<Image
							className="w-full aspect-auto rounded-lg"
							src="/images/undraw_schedule_6t8k.svg"
							alt="imagem"
							width={240}
							height={240}
						/>
					</div>
				</div>
				<div onClick={gotoScreenArtistas}
					className="flex flex-col lg:px-10 transition-opacity duration-700 opacity-0 animate-[fadeIn_0.7s_forwards] gap-2 cursor-pointer">
					<h1 className="capitalize font-bold text-2xl">Artistas</h1>
					<div className="bg-[#710101] p-2 rounded-sm flex justify-center items-center">
						<AutoCarousel images={artistas} time={7000} />
					</div>
				</div>
			</section>
		</main>
	);
}
