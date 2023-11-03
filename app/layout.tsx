"use client";
import {hotjar} from "react-hotjar";
import {useEffect} from "react";
import {ReactNode} from "react";
import "/styles/globals.css"; // Assurez-vous d'avoir un fichier CSS global dans ce chemin si vous voulez utiliser des styles globaux.
import {Inter} from "next/font/google";
import {CrispChat} from "@/components/ui";


const inter = Inter({
	subsets: ["latin"],
	display: "swap"
});


function RootLayout({
	children,
}: {
		children: ReactNode,
		params: { locale: string }
	}) {


	useEffect(() => {
		hotjar.initialize(3721150, 6);
	}, []);

	return (
		<html className={`${inter.className}`}>
			<CrispChat/>
			{/* Hotjar Tracking Code for https://zycon.vercel.app/ */}
			<body 
				suppressHydrationWarning={true}
			>
				{children}
			</body>
		</html>
	);
}

export default RootLayout;
