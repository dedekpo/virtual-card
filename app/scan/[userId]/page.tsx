import { prisma } from "../../../lib/prismadb";
import QRCode from "./qr-code";

// Page for reading and download the user's QR Code

export default async function User({ params }: { params: { userId: string } }) {
	const user = await prisma.user.findUnique({
		where: {
			id: params.userId,
		},
	});

	return (
		<div className="w-full h-screen flex items-center justify-center">
			<div className="flex flex-col border-2 rounded-md p-5">
				<p className="text-xl font-bold text-center mb-5">
					{user?.name}
				</p>
				<p className="text-gray-600 text-center">Scan Me</p>
				<QRCode userId={user?.id} userName={user?.name} />
			</div>
		</div>
	);
}
