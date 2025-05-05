import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { DateRange, Matcher, OnSelectHandler } from "react-day-picker";

interface DatePatterns {
	minYear: number
	maxYear: number
	selected: Date;
	today?: Date;
	onSelect?: OnSelectHandler<Date | undefined>;
	onDisabled?: Matcher | Matcher[];
}

export default function CalendarSingleWithYearSelector(patterns: DatePatterns) {
	const [currentMonth, setCurrentMonth] = useState(patterns.selected);
	const [showYearPicker, setShowYearPicker] = useState(false);
	const [yearsPage, setYearsPage] = useState(0);
	const yearsPerPage = 12;

	const getCurrentYear = () => currentMonth.getFullYear();

	const getYearsRange = () => {
		const currentYear = getCurrentYear();
		const baseYear =
			currentYear -
			(currentYear % yearsPerPage) +
			yearsPage * yearsPerPage;
		const years = Array.from({ length: yearsPerPage }, (_, i) => baseYear + i);
		return years.filter((year) => year >= patterns.minYear && year <= patterns.maxYear);
	};

	const changeYearsPage = (amount: number) => {
		setYearsPage((prev) => prev + amount);
	};

	const handleYearSelect = (year: number) => {
		const newDate = new Date(currentMonth);
		newDate.setFullYear(year);
		setCurrentMonth(newDate);
		setShowYearPicker(false);

		if (patterns.onSelect) {
			const selectedDate = new Date(patterns.selected);
			selectedDate.setFullYear(year);
		}
	};

	const renderYearPicker = () => {
		const years = getYearsRange();
		const startYear = years[0];
		const endYear = years[years.length - 1];

		return (
			<div className="p-2">
				<div className="flex items-center justify-between mb-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => changeYearsPage(-1)}
						className="h-7 w-7 p-0"
						disabled={startYear <= patterns.minYear}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>

					<div className="font-medium text-sm">
						{startYear} - {endYear}
					</div>

					<Button
						variant="outline"
						size="sm"
						onClick={() => changeYearsPage(1)}
						className="h-7 w-7 p-0"
						disabled={endYear >= patterns.maxYear}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>

				<div className="grid grid-cols-3 gap-2">
					{years.map((year) => (
						<Button
							key={year}
							variant={
								year === getCurrentYear()
									? "default"
									: "outline"
							}
							className="h-10"
							onClick={() => handleYearSelect(year)}
						>
							{year}
						</Button>
					))}
				</div>
			</div>
		);
	};

	return (
		<>
			{showYearPicker ? (
				renderYearPicker()
			) : (
				<>
					<div className="mt-2 ml-3">
						<Button
							className="py-5 px-1 bg-white text-black hover:bg-white border-red-600 capitalize"
							onClick={() => setShowYearPicker((it) => !it)}
						>
							Mudar Ano
						</Button>
					</div>
					<Calendar
						mode="single"
						selected={patterns.selected}
						onSelect={patterns.onSelect}
						today={patterns.today}
						month={currentMonth}
						onMonthChange={setCurrentMonth}
						disabled={patterns.onDisabled}
						initialFocus={false}
					/>
				</>
			)}
		</>
	);
}


export function CalendarRangeWithYearSelector({
	minYear,
	maxYear,
	selected,
	today,
	onSelect,
	onDisabled,
	colorBg = "bg-[var(--light-background)]"
}: {
	minYear: number;
	maxYear: number;
	selected: DateRange | undefined;
	today?: Date;
	onSelect?: OnSelectHandler<DateRange | undefined>;
	onDisabled?: Matcher | Matcher[];
	colorBg?: string
}) {
	const initialMonth = selected?.from ?? new Date();

	const [currentMonth, setCurrentMonth] = useState<Date>(initialMonth);
	const [showYearPicker, setShowYearPicker] = useState(false);
	const [yearsPage, setYearsPage] = useState(0);
	const yearsPerPage = 12;

	const getCurrentYear = () => currentMonth.getFullYear();

	const getYearsRange = () => {
		const currentYear = getCurrentYear();
		const baseYear =
			currentYear - (currentYear % yearsPerPage) + yearsPage * yearsPerPage;
		const years = Array.from({ length: yearsPerPage }, (_, i) => baseYear + i);
		return years.filter(
			(year) => year >= minYear && year <= maxYear
		);
	};

	const changeYearsPage = (amount: number) => {
		setYearsPage((prev) => prev + amount);
	};

	const handleYearSelect = (year: number) => {
		const newDate = new Date(currentMonth);
		newDate.setFullYear(year);
		setCurrentMonth(newDate);
		setShowYearPicker(false);
	};

	const renderYearPicker = () => {
		const years = getYearsRange();
		const startYear = years[0];
		const endYear = years[years.length - 1];

		return (
			<div className="p-2 bg-[var(--light-background)] text-white">
				<div className="flex items-center justify-between mb-2 h-12">
					<Button
						size={"lg"}
						onClick={() => changeYearsPage(-1)}
						className={`p-0  ${startYear <= minYear ? 'bg-gray-800' : 'bg-red-50'}`}
						disabled={startYear <= minYear}
					>
						<ArrowLeft 	size={50} fill="white" />
					</Button>

					<div className="font-medium text-sm">
						{startYear} - {endYear}
					</div>

					<Button
						variant="outline"
						size={"lg"}
						onClick={() => changeYearsPage(1)}
						className={`p-0 ${endYear >= maxYear ? 'bg-gray-800': 'bg-red-50'}`}
						disabled={endYear >= maxYear}
					>
						<ArrowRight size={50} fill="white" />
					</Button>
				</div>

				<div className="grid grid-cols-3 gap-2">
					{years.map((year) => (
						<Button
							key={year}
							variant={
								year === getCurrentYear() ? "default" : "outline"
							}
							className={`${getCurrentYear() === year ? 'bg-[var(--color950)]' : 'bg-black'}  h-10`}
							onClick={() => handleYearSelect(year)}
						>
							{year}
						</Button>
					))}
				</div>
			</div>
		);
	};

	return (
		<>
			{showYearPicker ? (
				renderYearPicker()
			) : (
				<>
					<div className={`${colorBg} pt-2 pl-3`}>
						<Button
							className={`py-5 px-4 ${colorBg} text-white border-red-600 capitalize`}
							onClick={() => setShowYearPicker((it) => !it)}
						>
							Mudar Ano
						</Button>
					</div>

					<Calendar
						mode="range"
						className={`${colorBg} text-white`}
						selected={selected}
						onSelect={onSelect}
						month={currentMonth}
						onMonthChange={setCurrentMonth}
						today={today}
						disabled={onDisabled}
						min={0}
						max={59}
						autoFocus
					/>
				</>
			)}
		</>
	);
}
