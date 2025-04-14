"use server";

import Link from "next/link";
import { retrieveCookie } from "@/utils/cookie";
import "./header.css"

export default async function Header() {
	const cookie = await retrieveCookie("token");

	return (
		<header className="h-25 w-full bg-black text-white flex flex-row items-center justify-around px-6 capitalize font-semibold tracking-wide">
			<h2 className="link">
				<Link
					href={"/galeria"}
					className="active:text-[var(--color950)] focus:text-[var(--color950)]"
				>
					galeria
				</Link>
			</h2>
			<h2 className="link">
				<Link
					href={"/artistas"}
					className="active:text-[var(--color950)] focus:text-[var(--color950)]"
				>
					artistas
				</Link>
			</h2>
			<h1 className="link uppercase tracking-wider text-lg font-bold">
				<Link
					href="/"
					className="active:text-[var(--color950)] focus:text-[var(--color950)]"
				>
					carmesim
				</Link>
			</h1>
			<h2 className="link">
				<Link
					href={"/eventos"}
					className="active:text-[var(--color950)] focus:text-[var(--color950)]"
				>
					eventos
				</Link>
			</h2>
			<h2 className="link">
				<Link
					href="/contatos"
					className="active:text-[var(--color950)] focus:text-[var(--color950)]"
				>
					contatos
				</Link>
			</h2>
			{cookie && (
				<h2 className="link">
					<Link href={"/auth/dashboard"}>dashboard</Link>
				</h2>
			)}
		</header>
	);
}
