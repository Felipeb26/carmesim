"use server";

import { exitLogin } from "@/actions/login.request";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { retrieveCookie } from "@/utils/cookie";
import {
	BookIcon,
	CalendarFold,
	ChartGantt,
	Contact2Icon,
	HomeIcon,
	LogOutIcon,
	MenuIcon,
	UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";

export default async function Header() {
	const cookie = await retrieveCookie("token");

	return (
		<header className="h-25 w-full bg-black text-white items-center flex flex-nowrap capitalize font-semibold tracking-wide">
			<nav className="w-full flex-row items-center justify-around px-6 hidden sm:flex">
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
					<Sheet>
						<SheetTrigger asChild>
							<MenuIcon className="cursor-pointer" size={40} />
						</SheetTrigger>
						<SheetContent
							side="right"
							className="bg-gray-800 py-15 px-8 capitalize font-bold tracking-wider text-lg text-white"
						>
							<h2 className="link flex items-center gap-4">
								<ChartGantt />
								<Link href={"/auth/dashboard"}>dashboard</Link>
							</h2>
							<h2
								className="link flex items-center gap-4"
								onClick={exitLogin}
							>
								<LogOutIcon />
								<Link href="">logout</Link>
							</h2>
						</SheetContent>
					</Sheet>
				)}
			</nav>

			<nav className="sm:hidden flex w-full gap-10 px-10">
				<Sheet>
					<SheetTrigger asChild>
						<MenuIcon className="cursor-pointer" size={40} />
					</SheetTrigger>
					<SheetContent side="left" className="bg-gray-600">
						<SheetHeader>
							<SheetTitle className="text-center text-white tracking-wide text-lg">
								Carmesim
							</SheetTitle>
						</SheetHeader>
						<ul className="px-4 capitalize text-accent text-lg font-bold flex flex-col">
							<li className="link flex flex-nowrap items-center gap-5 my-2">
								<HomeIcon />
								<Link
									href="/"
									className="active:text-[var(--color950)] focus:text-[var(--color950)]"
								>
									carmesim
								</Link>
							</li>
							<li className="link flex flex-nowrap items-center gap-5 my-2">
								<BookIcon />
								<Link
									href={"/galeria"}
									className="active:text-[var(--color950)] focus:text-[var(--color950)]"
								>
									galeria
								</Link>
							</li>
							<li className="link flex flex-nowrap items-center gap-5 my-2">
								<UsersRoundIcon />
								<Link
									href={"/artistas"}
									className="active:text-[var(--color950)] focus:text-[var(--color950)]"
								>
									artistas
								</Link>
							</li>
							<li className="link flex flex-nowrap items-center gap-5 my-2">
								<CalendarFold />
								<Link
									href={"/eventos"}
									className="active:text-[var(--color950)] focus:text-[var(--color950)]"
								>
									eventos
								</Link>
							</li>
							<li className="link flex flex-nowrap items-center gap-5 my-2">
								<Contact2Icon />
								<Link
									href="/contatos"
									className="active:text-[var(--color950)] focus:text-[var(--color950)]"
								>
									contatos
								</Link>
							</li>
							{cookie && (
								<li className="link flex flex-nowrap items-center gap-5 my-2">
									<ChartGantt />
									<Link href={"/auth/dashboard"}>
										dashboard
									</Link>
								</li>
							)}
							{cookie && (
								<li>
									<LogOutIcon />
								</li>
							)}
						</ul>
					</SheetContent>
				</Sheet>
				<h1 className="link tracking-wider text-2xl font-bold capitalize text-center w-full">
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
