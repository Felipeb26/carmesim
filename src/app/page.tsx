"use server"

import { SlideInSection } from "@/components/shared/animation/slidein";
import AutoCarousel from "@/components/shared/carrousel/autocarrousel";
import Instagram from "@/components/shared/icons/Instagram";
import WhatsApp from "@/components/shared/icons/Whatsapp";
import { CardTitle } from "@/components/ui/card";
import { ARTISTAS, IMAGES } from "@/lib/constants";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

	return (
		<main className="flex-1 flex-col">
			<div className="flex-1/2">
				<div className="flex flex-col lg:flex-row h-fit lg:max-h-[850px]">

					<div className="flex-[0.1] lg:max-w-[3rem] flex items-center justify-center bg-[var(--color950)] p-1">
						<p className="lg:rotate-90 w-full uppercase font-bold whitespace-nowrap text-center flex flex-nowrap justify-center gap-5 text-white">
							<Link
								className="text-purple-300 hover:text-purple-400 underline font-bold transition flex items-center gap-2"
								href="https://www.instagram.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Instagram />
								instagram
							</Link>
							&nbsp;/&nbsp;
							<Link
								className="text-green-300 hover:text-green-400 underline font-bold transition flex items-center gap-2"
								href="https://wa.me/+5511971404157?text=Olá%20meu%20nome%20é%20fulano%20gostaria%20de%20questionar%20sobre%20os%20cursos"
								target="_blank"
								rel="noopener noreferrer"
							>
								<WhatsApp />
								whatsapp
							</Link>
						</p>
					</div>

					<div className="flex-1/5 flex flex-nowrap flex-col bg-[var(--light-background)] pt-8 pb-2 lg:py-0 lg:content-center px-6 sm:px-8 lg:px-10 text-white gap-4 justify-center">
						<h1 className="text-3xl font-bold tracking-wide font-serif">
							Studio Carmesim
						</h1>
						<CardTitle className="mb-3 tracking-wider text-lg font-serif">
							Transforme Sua História em Arte: Tatuagens Exclusivas Para Você!
						</CardTitle>
						<p className="leading-relaxed whitespace-normal break-words hyphens-auto">Cada tatuagem que fazemos é única, assim como você. Nossa missão é ajudar a expressar sua verdadeira essência através de uma arte duradoura e personalizada. Com artistas experientes e dedicados, criamos tatuagens que falam por si mesmas. Entre em contato e venha criar sua próxima obra de arte!
						</p>
						<Link href={"/contatos"} className="flex flex-row items-center gap-2 font-bold text-[var(--color900)] underline cursor-pointer tracking-wider hover:scale-105">
							<Calendar size={50} fill="cyan" />
							Agende sua consulta agora e comece sua jornada para uma tatuagem inesquecível!
						</Link>
					</div>

					<div className="flex-1 flex items-center bg-[var(--light-background)] xls:flex py-3 px-[5%]">
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

			<section className="bg-[var(--light-background)] flex flex-row w-full justify-center">
				<div className="py-4 grid grid-cols-1 lg:grid-cols-3 gap-20 text-white">
					<SlideInSection>
						<h2 className="text-xl md:text-2xl font-bold text-white mb-4">Primeira vez aqui? Veja como funciona:</h2>
						<ol className="list-decimal list-inside p-3 flex flex-col flex-nowrap gap-4">
							<li>Escolha seu estilo favorito ou artista preferido</li>
							<li>Converse conosco e compartilhe sua ideia</li>
							<li>Garanta seu horário com um sinal antecipado</li>
							<li>Venha viver a experiência de uma tatuagem única e personalizada</li>
						</ol>
					</SlideInSection>
					<SlideInSection>
						<h2 className="text-xl md:text-2xl font-bold text-white mb-4">O que você pode esperar:</h2>
						<ul className="list-disc list-inside p-3 flex flex-col flex-nowrap gap-4">
							<li>Atendimento acolhedor e personalizado</li>
							<li>Estúdio seguro, higienizado e com equipamentos de ponta</li>
							<li>Artistas com portfólio variado e experiência</li>
							<li>Criação de arte exclusiva para você</li>
						</ul>
					</SlideInSection>
					<SlideInSection>
						<h2 className="text-xl md:text-2xl font-bold text-white mb-4">Dicas para se preparar:</h2>
						<ul className="list-disc list-inside p-3 flex flex-col flex-nowrap gap-4">
							<li>Durma bem e esteja hidratado no dia da tatuagem</li>
							<li>Evite álcool e exposição ao sol nas 24h anteriores e posterioes</li>
							<li>Vista roupas confortáveis e que facilitem o acesso à área</li>
							<li>Confie no processo e aproveite a jornada</li>
						</ul>
					</SlideInSection>
				</div>
			</section>

			<section className="bg-[#0B0B0B] flex-1/2 px-4 py-8 text-white">
				<SlideInSection className="grid grid-cols-2 lg:grid-cols-4 gap-6 ">
					<div
						className="bg-[#5E3838] flex justify-center items-center p-1 lg:ml-10 rounded-2xl transition-opacity duration-700 opacity-0 animate-[fadeIn_0.7s_forwards] hover:brightness-115">
						<Image
							className="w-full aspect-auto rounded-lg"
							src="/images/realismo_1.webp"
							alt="imagem"
							width={240}
							height={240}
						/>
					</div>
					<Link href={"galeria"}
						className="flex flex-col lg:px-10 transition-all duration-700 opacity-0 animate-[fadeIn_0.7s_forwards] gap-2 cursor-pointer">
						<h1 className="capitalize font-bold text-2xl">Galeria</h1>
						<div className="bg-[#710101] p-2 rounded-sm flex justify-center items-center hover:brightness-125 hover:scale-105 transition-all duration-800">
							<AutoCarousel images={IMAGES} />
						</div>
					</Link>
					<Link href={"contatos"}
						className="flex flex-col lg:px-10 transition-all duration-700 opacity-0 animate-[fadeIn_0.7s_forwards] gap-2 cursor-pointer">
						<h1 className="capitalize font-bold text-2xl">Agendamento</h1>
						<div className="bg-transparent border-2 p-2 rounded-sm flex justify-center items-center hover:brightness-125 hover:scale-105 transition-all duration-800">
							<Image
								className="w-full aspect-auto rounded-lg"
								src="/images/undraw_schedule_6t8k.svg"
								alt="imagem"
								width={240}
								height={240}
							/>
						</div>
					</Link>
					<Link href={"artistas"}
						className="flex flex-col lg:px-10 transition-all duration-700 opacity-0 animate-[fadeIn_0.7s_forwards] gap-2 cursor-pointer">
						<h1 className="capitalize font-bold text-2xl">Artistas</h1>
						<div className="bg-[#710101] p-2 rounded-sm flex justify-center items-center hover:brightness-125 hover:scale-105 transition-all duration-800">
							<AutoCarousel images={ARTISTAS} time={7000} />
						</div>
					</Link>
				</SlideInSection>
			</section>
		</main>
	);
}