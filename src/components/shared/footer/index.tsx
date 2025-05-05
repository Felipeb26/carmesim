import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import Link from "next/link";
import WhatsApp from "../icons/Whatsapp";
import Instagram from "../icons/Instagram";

export default function Footer() {
    return (
        <footer className=" bg-black w-full p-6 text-gray-200">
            <div className="container mx-auto flex flex-col items-center gap-4 text-center">

                <div className="flex gap-6">
                    <Link href="https://github.com/seu-usuario" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 flex items-center gap-2 transition">
                        <WhatsApp size={20} className={"hover:scale-110 transition-transform"} />
                        WhatsApp
                    </Link>
                    <Link href="https://instagram.com/seu-usuario" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 flex items-center gap-2 transition">
                        <Instagram size={20} className={"hover:scale-110 transition-transform"} />
                        Instagram
                    </Link>
                    <Link href="mailto:seuemail@dominio.com" className="hover:text-red-400 flex items-center gap-2 transition">
                        <Mail className="h-5 w-5 hover:scale-110 transition-transform" />
                        Email
                    </Link>
                </div>

                <Separator className="w-1/2 sm:hidden" />

                <div className="text-sm flex flex-col gap-2">
                    <p>&copy; {new Date().getFullYear()} Batsworks Carmesim. Todos os direitos reservados.</p>

                    <div className="flex gap-4 justify-center">
                        <Link href="/politicas/privacidade" className="hover:underline">
                            Política de Privacidade
                        </Link>
                        <Link href="/politicas/cookies" className="hover:underline">
                            Política de Cookies
                        </Link>
                    </div>
                </div>
            </div>
            <div className="text-gray-700 mt-5">Studio Carmesim © {new Date().getFullYear()}</div>
        </footer>
    );
}