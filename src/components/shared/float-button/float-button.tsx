import Link from "next/link";
import WhatsApp from "../icons/Whatsapp";

export default function FloatButton({ className }: { className?: string }) {
	return <span className={`fixed right-4 bottom-10 z-10 opacity-75 text-green-700 transition-all duration-300 hover:text-green-400 ${className}`}>
		<Link href="https://wa.me/+5511971404157?text=Olá%20meu%20nome%20é%20fulano%20gostaria%20de%20questionar%20sobre%20os%20cursos"
			target="_blank"
			rel="noopener noreferrer">
			<WhatsApp size={50} />
		</Link>
	</span>
}