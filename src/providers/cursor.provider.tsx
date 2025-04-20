/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Loader from "@/app/loader.page";

const CursorContext = createContext({
	setLoading: (loading: boolean) => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		document.body.style.cursor = loading ? "wait" : "default";
	}, [loading]);

	return (
		<CursorContext.Provider value={{ setLoading }}>
			{loading && <Loader />}
            {!loading && children}
		</CursorContext.Provider>
	);
}

export function useCursor() {
	return useContext(CursorContext);
}
