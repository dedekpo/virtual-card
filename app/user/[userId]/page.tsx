import { prisma } from "../../../lib/prismadb";
import Image from "next/image";
import Link from "next/link";

export default async function User({ params }: { params: { userId: string } }) {
	const user = await prisma.user.findUnique({
		where: {
			id: params.userId,
		},
	});

	return (
		<div className="w-full h-screen flex items-center justify-center border-2">
			<div className="flex flex-col border-2 rounded-md p-5">
				<div className="relative w-20 h-20  mx-auto">
					<Image
						src={user?.image_url || ""}
						alt={user?.name || ""}
						fill
						className="object-cover rounded-full"
					/>
				</div>
				<p className="text-center">Hello, my name is</p>
				<p className="text-xl font-bold text-center">{user?.name}</p>
				<p className="my-5">{user?.history}</p>
				<div className="flex justify-center gap-5">
					<Link href={user?.github_url || ""} target="_blank">
						<button className="px-3 py-1 border-[1px] rounded-md hover:bg-slate-100">
							Github
						</button>
					</Link>
					<Link href={user?.linkedin_url || ""} target="_blank">
						<button className="px-3 py-1 border-[1px] rounded-md hover:bg-slate-100">
							Linkedin
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
