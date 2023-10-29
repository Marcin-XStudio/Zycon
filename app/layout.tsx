"use client";

import {ReactNode} from "react";
import "/styles/globals.css"; // Assurez-vous d'avoir un fichier CSS global dans ce chemin si vous voulez utiliser des styles globaux.
import {Inter} from "next/font/google";


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


	

	return (
		<html className={`${inter.className}`}>
			<body>{children}</body>
		</html>
	);
}

export default RootLayout;
