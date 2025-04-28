import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import Provider from "@/providers/query.provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { CursorProvider } from "@/providers/cursor.provider";
import { Suspense } from "react";
import Loader from "./loader.page";
import CookieConsent from "@/components/shared/consent/coockie.consent";


export const metadata: Metadata = {
	title: "Studio Carmesim",
	description:
		"Studio Carmesim - Arte autoral e tatuagens personalizadas com essência e identidade.",
	manifest: '/site.webmanifest',
	icons: "/icons/favicon.ico",
	openGraph: {
		title: "Carmesim Studio",
		description: "Studio Carmesim where you body become a art",
	},
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang="pt-BR">
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta charSet="UTF-8" />
				<meta name="referrer" content="no-referrer-when-downgrade" />
				<meta httpEquiv="X-Content-Type-Options" content="nosniff" />
				<meta
					httpEquiv="Content-Security-Policy"
					content="default-src 'self'; script-src 'self'; object-src 'none';"
				/>
				<link rel="icon" href="/icons/favicon.ico" />
			</Head>
			<body className={cn(`font-sans antialiased min-h-screen flex flex-col`, inter.className)}>
				<Toaster
					position="top-right"
					closeButton
					duration={3500}
					richColors
					theme="system"
					visibleToasts={2}
				/>
				<Header />
				<Provider>
					<CursorProvider>
						<Suspense fallback={<Loader />}>
							<main className="flex-1 flex flex-col flex-nowrap">
								{children}
							</main>
						</Suspense>
					</CursorProvider>
				</Provider>
				<CookieConsent/>
				<Footer />
			</body>
		</html>
	);
}
