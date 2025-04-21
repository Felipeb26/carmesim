"use server";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet";
import { retrieveCookie } from "@/utils/cookie";
import {
	BookIcon,
	CalendarFold,
	ChartGantt,
	Contact2Icon,
	HomeIcon,
	MenuIcon,
	UsersRoundIcon,
	X
} from "lucide-react";
import { ActiveLink, ActiveListLink } from "./ActiveLink";
import { ChangeTheme } from "./ThemeButton";
import { LogoutButton } from "./logout.btn";

export default async function Header() {
	const cookie = await retrieveCookie("token");

	return (
		<header className="h-25 bg-black text-white w-full items-center flex flex-nowrap capitalize font-semibold tracking-wide px-10">
			<ChangeTheme className="hidden sm:block" />
			<nav className="w-full flex-row items-center justify-around px-6 hidden sm:flex">
				<h2 className="link">
					<ActiveLink
						href={"/galeria"}
						className="active:text-[var(--color950)] focus:text-[var(--color950)]"
					>
						galeria
					</ActiveLink>
				</h2>
				<h2 className="link">
					<ActiveLink
						href={"/artistas"}
						className="active:text-[var(--color950)] focus:text-[var(--color950)]"
					>
						artistas
					</ActiveLink>
				</h2>
				<h1 className="link uppercase tracking-wider text-lg font-bold">
					<ActiveLink
						href="/"
						className="active:text-[var(--color950)] focus:text-[var(--color950)]"
					>
						carmesim
					</ActiveLink>
				</h1>
				<h2 className="link">
					<ActiveLink
						href={"/eventos"}
						className="active:text-[var(--color950)] focus:text-[var(--color950)]"
					>
						eventos
					</ActiveLink>
				</h2>
				<h2 className="link">
					<ActiveLink
						href="/contatos"
						className="active:text-[var(--color950)] focus:text-[var(--color950)]"
					>
						contatos
					</ActiveLink>
				</h2>
				{cookie && (
					<Sheet>
						<SheetTrigger asChild>
							<MenuIcon className="cursor-pointer" size={40} />
						</SheetTrigger>
						<SheetContent
							side="right"
							className="bg-black py-15 px-8 capitalize font-bold tracking-wider text-lg text-white"
						>
							<SheetHeader>
								<SheetClose asChild>
									<button className="absolute right-4 top-4 text-red-500 hover:text-red-700 border-2 rounded-sm p-0.5" id="close-btn">
										<X />
									</button>
								</SheetClose>
								<SheetTitle className="text-center text-white tracking-wide text-lg">
									Carmesim
								</SheetTitle>
								<SheetDescription />
							</SheetHeader>
							<ul className="px-4 capitalize text-accent text-[1.2rem] font-bold flex flex-col gap-3">

								<ActiveListLink
									icon={<ChartGantt />}
									href={"/dashboard"}>
									dashboard
								</ActiveListLink>
								<li className="link flex flex-nowrap items-center gap-5 my-2 py-2 w-full">
									<LogoutButton />
								</li>
							</ul>
						</SheetContent>
					</Sheet>
				)}
			</nav>

			{/* Mobile View */}
			<nav className="sm:hidden flex w-full gap-10 ">
				<Sheet>
					<SheetTrigger asChild>
						<MenuIcon className="cursor-pointer" size={40} />
					</SheetTrigger>
					<SheetContent side="left" className="bg-black opacity-75 max-w-[300px]">
						<SheetClose asChild>
							<button className="absolute right-4 top-4 text-red-500 hover:text-red-700 border-2 rounded-sm p-0.5" id="close-btn">
								<X />
							</button>
						</SheetClose>
						<SheetHeader>
							<SheetTitle className="text-center text-white tracking-wide text-lg">
								Carmesim
							</SheetTitle>
							<SheetDescription />
						</SheetHeader>
						<ul className="px-4 capitalize text-accent text-[1.2rem] font-bold flex flex-col gap-3">
							<ActiveListLink
								icon={<HomeIcon />}
								href={"/"}
								className="active:text-[var(--color950)] focus:text-[var(--color950)]">
								carmesim
							</ActiveListLink>

							<ActiveListLink
								icon={<BookIcon />}
								href={"/galeria"}
								className="active:text-[var(--color950)] focus:text-[var(--color950)]"
							>
								galeria
							</ActiveListLink>
							<ActiveListLink
								icon={<UsersRoundIcon />}
								href={"/artistas"}
								className="active:text-[var(--color950)] focus:text-[var(--color950)]"
							>
								artistas
							</ActiveListLink>
							<ActiveListLink
								icon={<CalendarFold />}
								href={"/eventos"}
								className="active:text-[var(--color950)] focus:text-[var(--color950)]"
							>
								eventos
							</ActiveListLink>
							<ActiveListLink
								icon={<Contact2Icon />}
								href="/contatos"
								className="active:text-[var(--color950)] focus:text-[var(--color950)]"
							>
								contatos
							</ActiveListLink>
							{cookie && (
								<ActiveListLink
									icon={<ChartGantt />}
									href={"/dashboard"}>
									dashboard
								</ActiveListLink>
							)}
							{cookie && (
								<li className="link flex flex-nowrap items-center gap-5 my-2 py-2 w-full">
									<LogoutButton />
								</li>
							)}
							<ChangeTheme className="" />
						</ul>
					</SheetContent>
				</Sheet>
				<h1 className="link tracking-wider text-2xl font-bold capitalize text-center w-full">
					<ActiveLink
						href="/"
						className="active:text-[var(--color950)] focus:text-[var(--color950)] h-full"
					>
						carmesim
					</ActiveLink>
				</h1>
			</nav>
		</header>
	);
}
