import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
	title: "Virtual Card",
	description: "Created by André Elias",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={inter.className}>
			<body>{children}</body>
		</html>
	);
}
