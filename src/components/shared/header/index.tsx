"use server";

import { retrieveCookie } from "@/utils/cookie";
import Link from "next/link";
import "./header.css";

export default async function Header() {
	const cookie = await retrieveCookie("token");

	return (
		<header className="h-25 w-full bg-black text-white items-center flex flex-nowrap capitalize font-semibold tracking-wide">
			<nav className="flex-row items-center justify-around px-6 hidden lg:flex">
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
			</nav>

			<nav className="lg:hidden flex w-full gap-10 px-10">
				<h1 className="link tracking-wider text-lg font-bold capitalize">
					<Link
						href="/"
						className="active:text-[var(--color950)] focus:text-[var(--color950)]"
					>
						carmesim
					</Link>
				</h1>
			</nav>
		</header>
	);
}
