"use client";

import { GOOGLE_MAPS_LINK, GOOGLE_MAPS_EMBED } from "@/lib/constants"

export default function ContatosMap() {
	return (
		<div className="w-full h-64 rounded-xl overflow-hidden flex justify-center">
			<a
				href={GOOGLE_MAPS_LINK}
				target="_blank"
				rel="noopener noreferrer"
				className="w-[600px] md:w-1/2"
				aria-label="Abrir localização no Google Maps"
			>
				<iframe
					className="pointer-events-none w-full"
					src={GOOGLE_MAPS_EMBED}
					width="600"
					height="450"
					allowFullScreen
					loading="lazy"
				/>
			</a>
		</div>
	);
}