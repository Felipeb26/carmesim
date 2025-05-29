import { SlideInSection } from "@/components/shared/animation/slidein";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Studio Carmesim | Galeria",
};

const obras: string[] = [
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

export default function Galeria() {
	return (
		<main className="bg-[var(--light-background)]  min-h-screen flex flex-1 flex-col gap-10 text-white py-10 px-5">
			<div className="container mx-auto p-6">
				<h1 className="text-4xl font-bold text-center mb-8" aria-label="Galeria de Tatuagens">Galeria de Tatuagens</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{obras.map((obra, index) => (
						<SlideInSection key={index}>
							<div
								key={index}
								className="relative group cursor-pointer rounded-lg overflow-hidden"
								role="link"
								aria-labelledby={`obra-${index}`}
							>
								<Image
									src={obra}
									alt={`imagem ${index}`}
									className="w-full h-auto object-cover aspect-square transition-transform duration-300 ease-in-out group-hover:scale-105"
									aria-describedby={`desc-${index}`}
									width={240}
									height={240}
								/>
								<div
									className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
									aria-hidden="true"
								>
								</div>
							</div>
						</SlideInSection>
					))}
				</div>
			</div>
		</main>
	);
}
