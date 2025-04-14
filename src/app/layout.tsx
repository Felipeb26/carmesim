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
export const metadata: Metadata = {
	title: "Studio Carmesim",
	description:
		"Studio Carmesim - Arte autoral e tatuagens personalizadas com essência e identidade.",
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
		<html lang="pt-br">
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta charSet="UTF-8" />
				<meta
					name="description"
					content="Studio Carmesim - Arte autoral e tatuagens personalizadas com essência e identidade."
				/>
				<meta name="referrer" content="no-referrer-when-downgrade" />
				<meta httpEquiv="X-Content-Type-Options" content="nosniff" />
				<meta
					httpEquiv="Content-Security-Policy"
					content="default-src 'self'; script-src 'self'; object-src 'none';"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<body className={cn(`font-sans antialiased`, inter.className)}>
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
					<CursorProvider>{children}</CursorProvider>
				</Provider>
				<Footer />
			</body>
		</html>
	);
}
