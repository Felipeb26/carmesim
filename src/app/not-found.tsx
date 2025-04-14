import Link from "next/link";

export default function NotFound(){
    return (
		<div className="flex flex-col items-center justify-center gap-2 mt-25">
			<h1 className="text-center font-bold mt-9 text-6xl">Pagina 404</h1>
			<p>pagina não existe na aplicação</p>
			<Link href="/">ir para home</Link>
		</div>
	);
}