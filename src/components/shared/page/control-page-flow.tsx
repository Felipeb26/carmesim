"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

export default function ControlPageFlow({
	page,
	changePageSize,
	previousPage,
	nextPage,
	color = "bg-red-600",
	hoverColor = "bg-red-200",
	children,
}: {
	page: { currentPage: number; size: number; totalItems: number; totalPages: number };
	changePageSize?: (size: number) => void;
	previousPage?: (page: number) => void;
	nextPage?: (page: number) => void;
	color?: string;
	hoverColor?: string;
	children?: React.ReactNode;
}) {

	const chooseColor = (result: boolean, intensity: number, selectColor: string) => {
		if (result) {
			return "bg-gray-" + intensity;
		}
		return `${selectColor.includes("--") ? `bg-[${selectColor}]` : `${selectColor}`}`
	}

	return (
		<div className="w-full max-w-3xl mx-auto flex flex-wrap items-center justify-between bg-black/70 p-4 rounded-xl gap-4">
			<select
				id="pageSize"
				value={page.size}
				onChange={(e) => changePageSize?.(+e.target.value)}
				className="bg-zinc-900 text-white border border-zinc-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color900)]"
			>
				{[1, 5, 10, 15, 20].map((val) => (
					<option key={val} value={val}>
						{val}
					</option>
				))}
			</select>
			<span>Eventos {page.size} - {page.totalItems}</span>

			<div className="flex flex-row items-center gap-4 text-white">
				<button
					className={`px-4 py-2 ${chooseColor(page.currentPage === 0, 300, color)} rounded hover:${chooseColor(page.currentPage === 0, 400, hoverColor)} disabled:opacity-50`}
					disabled={page.currentPage === 0}
					onClick={() => previousPage?.(page.currentPage - 1)}
				>
					<ArrowLeft />
				</button>

				<span className="text-sm text-gray-300">
					Página <strong>{page.currentPage + 1}</strong> de{" "}
					<strong>{page.totalPages}</strong>
				</span>

				<button
					className={`px-4 py-2 ${chooseColor(page.currentPage + 1 === page.totalPages, 300, color)} rounded hover:${chooseColor(page.currentPage + 1 === page.totalPages, 400, hoverColor)} disabled:opacity-50`}
					disabled={page.currentPage + 1 === page.totalPages}
					onClick={() => nextPage?.(page.currentPage + 1)}
				>
					<ArrowRight />
				</button>
			</div>

			{children && children}
		</div>
	);
}
