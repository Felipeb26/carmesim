"use client"

import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";


export default function ControlPageFlow(
	{ page, changePageSize, previosPage, nextPage, color = "bg-gray-300", hoverColor = "bg-gray-400", props }:
		{
			page: { currentPage: number, size: number, totalPages: number },
			changePageSize?: (size: number) => (void),
			previosPage?: (size: number) => (void),
			nextPage?: (size: number) => (void),
			color?: string,
			hoverColor?: string,
			props?: React.ReactElement
		}) {


	const chooseColor = (result: boolean, intensity: number, selectColor: string) => {
		if (result) {
			return "bg-gray-" + intensity;
		}
		return `${selectColor.includes("--") ? `bg-[${selectColor}]` : `${selectColor}`}`
	}


	return (
		<div className="max-h-fit w-full lg:w-1/2  lg:max-w-1/2 flex flex-wrap items-center justify-between items-center bg-[#000000a9] p-5 rounded-sm gap-2">
			<select
				id="pageSize"
				value={page.size}
				onChange={e => {
					e.preventDefault()
					if (e && changePageSize) {
						changePageSize(Number(e.target.value))
					}
				}}
				className="border rounded bg-[#000000bd] px-2 py-3 gap-2 cursor-pointer"
			>
				<option className="cursor-pointer" value={1}>1</option>
				<option className="cursor-pointer" value={5}>5</option>
				<option className="cursor-pointer" value={10}>10</option>
				<option className="cursor-pointer" value={15}>15</option>
				<option className="cursor-pointer" value={20}>20</option>
			</select>

			<div className="flex flex-row gap-4 items-center min-w-[250px]">
				<button
					className={`px-4 py-2 ${chooseColor(page.currentPage === 0, 300, color)} rounded hover:${chooseColor(page.currentPage === 0, 400, hoverColor)} disabled:opacity-50`}
					disabled={page.currentPage === 0}
					onClick={() => {
						if (previosPage) {
							previosPage(page.currentPage - 1)
						}
					}
					}
				>
					<ArrowLeft/>
				</button>

				<span>
					Pág{" "}
					{page.totalPages <= 0
						? page.currentPage
						: page.currentPage + 1}{" "}
					de {page.totalPages}
				</span>

				<button
					className={`px-4 py-2 ${chooseColor(page.currentPage + 1 === page.totalPages, 300, color)} rounded hover:${chooseColor(page.currentPage + 1 === page.totalPages, 400, hoverColor)} disabled:opacity-50`}
					disabled={page.currentPage + 1 === page.totalPages}
					onClick={() => {
						if (nextPage) {
							nextPage(page.currentPage + 1)
						}
					}
					}
				>
					<ArrowRight/>
				</button>
			</div>
				{props}
		</div>
	)
}