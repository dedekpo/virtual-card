import Link from "next/link";
import Image from "next/image";
import { prisma } from "../lib/prismadb";

import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const revalidate = 0;

export default async function Home() {
	const users = await prisma.user.findMany();

	return (
		<main>
			<div className="max-w-[90%] md:max-w-5xl mx-auto my-10">
				<div className="h-[60vh] w-[80vw] absolute mx-auto left-0 right-0 top-[40vh] -z-10">
					<Image
						src="/girl-illustration.svg"
						alt="Girl illustration"
						fill
						className="object-cover"
					/>
				</div>
				<div>
					<h1 className="text-4xl font-bold">
						Checkout all our users
					</h1>
					<p className="text-gray-600">
						All have created their QR Code, create yours as well!
					</p>
				</div>
				<div className="mt-10 flex flex-wrap items-center gap-3">
					<Link href="/generate">
						<div className="border-2 flex flex-col items-center justify-center w-[43vw] h-[160px] md:w-[180px] md:h-[180px] rounded-md hover:bg-slate-50 shadow-sm">
							<button className="w-[50px] h-[50px] border-[1px] bg-purple-700 text-white rounded-full font-bold">
								+
							</button>
							<span className="text-xs text-gray-500 mt-2 font-bold">
								Create my QR Code
							</span>
						</div>
					</Link>
					{users.map((user) => (
						<User key={user.id} user={user} />
					))}
				</div>
			</div>
		</main>
	);
}

function User({
	user,
}: {
	user: {
		id: string;
		name: string;
		image_url: string | null;
		linkedin_url: string | null;
		github_url: string | null;
		history: string | null;
		created_at: Date;
	};
}) {
	return (
		<Link href={`/scan/${user.id}`}>
			<div className="flex flex-col items-center gap-2 border-2 p-5 rounded-md w-[43vw] h-[160px] md:w-[180px] md:h-[180px] hover:bg-slate-50 shadow-sm">
				<div className="relative w-16 h-16">
					<Image
						src={user.image_url || ""}
						alt={user.name}
						fill
						className="rounded-full object-cover"
					/>
				</div>
				<span className="text-sm text-gray-600 text-center">
					{user.name}
				</span>
				<span className="text-gray-500 text-xs mt-auto">
					{format(new Date(user.created_at), "d MMM", {
						locale: ptBR,
					}).toLocaleUpperCase()}
				</span>
			</div>
		</Link>
	);
}
