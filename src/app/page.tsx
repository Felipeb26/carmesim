import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div>
			<main className="flex flex-col h-[calc(70dvh_-_var(--spacing)_*_25)]">
				<div className="flex flex-col lg:flex-row flex-1">
					<div className="flex-[0.1] lg:max-w-[3rem] flex flex-wrap content-center justify-center bg-red-800 w-full">
						<p className="lg:rotate-90 w-full uppercase font-bold text-nowrap text-center">
							<Link
								className="text-blue-400 hover:text-blue-200 underline font-semibold transition"
								href="https://www.instagram.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								@rede social
							</Link>
							&nbsp;/&nbsp;
							<Link
								className="text-green-500 hover:text-green-300 underline font-semibold transitiontext-green-500"
								href="https://wa.me/+5511971404157?text=Olá%20meu%20nome%20é%20fulano%20gostaria%20de%20questionar%20sobre%20os%20cursos"
								target="_blank"
								rel="noopener noreferrer"
							>
								@whatsapp
							</Link>
						</p>
					</div>
					<div className="flex-1 bg-black opacity-85 py-8 lg:py-0 lg:content-center px-4 text-white">
						<h1 className="capitalize font-bold text-2xl mb-5">
							Studio Carmesim
						</h1>
						<p>
							é um espaço onde arte, identidade e alma se
							encontram. Com uma equipe de artistas talentosos e
							autorais, oferecemos tatuagens personalizadas,
							feitas com técnica, cuidado e estilo. Inspirados por
							elementos místicos, culturais e contemporâneos,
							criamos obras que eternizam histórias na pele. Com
							um ambiente acolhedor e seguro, priorizamos a
							experiência única de cada cliente, desde a primeira
							ideia até o traço final. No Carmesim, cada tatuagem
							carrega significado, essência e personalidade.
						</p>
						<p>
							Agende sua sessão e transforme sua inspiração em
							arte.
						</p>
					</div>
					<div className="flex-1 bg-black opacity-85 justify-center hidden lg:flex xls:flex">
						<Image
							src="globe.svg"
							alt="imagem"
							width="240"
							height="240"
						/>
					</div>
				</div>
			</main>
			<section className="bg-[#0B0B0B] grid grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 text-white">
				<div className="bg-[#5E3838] flex justify-center items-center p-1 lg:ml-10 rounded-2xl">
					<Image
						src="globe.svg"
						alt="imagem"
						width={240}
						height={240}
					/>
				</div>
				<div className="flex flex-col items-center">
					<h1 className="capitalize font-bold text-2xl">Galeria</h1>
					<div className="bg-[#710101] py-2 px-8 max-w-fit rounded-sm flex justify-center items-center">
						<Image
							src="globe.svg"
							alt="imagem"
							width={240}
							height={240}
						/>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<h1 className="capitalize font-bold text-2xl">Booking</h1>
					<div className="bg-[#710101] py-2 px-8 max-w-fit rounded-sm flex justify-center items-center">
						<Image
							src="globe.svg"
							alt="imagem"
							width={240}
							height={240}
						/>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<h1 className="capitalize font-bold text-2xl">Artistas</h1>
					<div className="bg-[#710101] py-2 px-8 max-w-fit rounded-sm flex justify-center items-center">
						<Image
							src="globe.svg"
							alt="imagem"
							width={240}
							height={240}
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
