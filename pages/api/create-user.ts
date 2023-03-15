import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prismadb";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).send({ message: "Only POST requests allowed" });
	}

	const { values, imageUrl } = req.body;

	try {
		const newUser = await prisma.user.create({
			data: {
				name: values.name,
				image_url: imageUrl,
				linkedin_url: values.linkedin,
				github_url: values.github,
				history: values.about,
			},
		});

		return res.status(200).json({
			message: "User created!",
			userId: newUser.id,
		});
	} catch (error) {
		return res.status(400).send({
			error: (error as Error).message,
		});
	}
}
