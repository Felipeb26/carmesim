interface ShowComponent {
	show?:boolean
}

export default function LoaderComponent(load: ShowComponent) {
	return (
		<>
			{load.show && (
				<div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
			)}
		</>
	);
}
