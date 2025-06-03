import CookieConsent from "@/components/shared/consent/coockie.consent";
import FloatButton from "@/components/shared/float-button/float-button";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { CursorProvider } from "@/providers/cursor.provider";
import Provider from "@/providers/query.provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import Loader from "./loading";


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
				<script src="https://js.hcaptcha.com/1/api.js" async defer></script>
			</Head>
			<body className={cn(`font-sans antialiased min-h-screen min-w-full flex flex-col`, inter.className)}>
				<Toaster
					position="top-right"
					closeButton
					duration={3500}
					richColors
					theme="system"
					visibleToasts={2}
				/>
				<div className="h-captcha" data-sitekey="9d16f80c-4208-4530-b410-a25cc9c8d1f0"></div>
				<FloatButton />
				<Header />
				<Provider>
					<CursorProvider>
						<Suspense fallback={<Loader />}>
							<div className="flex-1 flex flex-col flex-nowrap">
								{children}
							</div>
						</Suspense>
					</CursorProvider>
				</Provider>
				<CookieConsent />
				<Footer />
    <Script async defer src="https://tianji.batsworks.com.br/tracker.js"   data-website-id="cmbghxvrz000214fhy8pcoqoj"></Script>
			</body>
		</html>
	);
}
