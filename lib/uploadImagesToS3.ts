import ReactS3Client from "react-aws-s3-typescript";

const config = {
	accessKeyId: "AKIA3EA275TNAGFP45MK",
	secretAccessKey: "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",
	bucketName: "bot2",
	region: "sa-east-1",
};

export async function uploadImagesToS3(image: File | undefined) {
	if (!image) return [];

	const s3 = new ReactS3Client(config);

	try {
		const res = await s3.uploadFile(image);
		const imageUrl = res.location;
		return imageUrl;
	} catch (exception) {
		console.log(exception);
		/* handle the exception */
	}
}
