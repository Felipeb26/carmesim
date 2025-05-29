import { Clock, MapPin } from "lucide-react";

export default function ContatosInfo() {
	return (
		<div className="flex flex-col sm:flex-row gap-4 w-full justify-center my-5 sm:mt-2">
			<span className="flex items-center gap-2 justify-center">
				<MapPin className="mt-1" size={20} color="var(--color900)" />
				<p className="text-sm text-wrap">
					Avenida Interlagos, 2727
				</p>
			</span>
			<span className="flex items-center gap-2 justify-center">
				<Clock className="mt-1" size={20} color="var(--color900)" />
				<p className="text-sm text-wrap">
					Aberto de terça a domingo das 09:00 às 20:00
				</p>
			</span>
		</div>
	);
}
