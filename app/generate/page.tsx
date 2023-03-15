"use client";

// Page that generates a new user given the data on the form

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { uploadImagesToS3 } from "@/lib/uploadImagesToS3";
import { useRouter } from "next/navigation";

export default function Generate() {
	const router = useRouter();
	const [selectedImage, setSelectedImage] = useState("");
	const [productImage, setProductImage] = useState<File>();

	const {
		handleSubmit,
		register,
		reset,
		clearErrors,
		formState: { isSubmitting },
	} = useForm<any>();

	function onImagesSelect(event: any) {
		if (event.target.files[0]) {
			var url = URL.createObjectURL(event.target.files[0]);
			setSelectedImage(url);
			setProductImage(event.target.files[0]);
		}
	}

	async function onSubmit(values: any) {
		const imageUrl = await uploadImagesToS3(productImage);
		const res = await fetch("/api/create-user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ values, imageUrl }),
		});
		const response = await res.json();
		if (res.ok) {
			const { userId } = response;
			router.push(`/scan/${userId}`);
			return;
		}
		setSelectedImage("");
		reset();
		return;
	}

	return (
		<div className="max-w-5xl mx-auto mt-10">
			<h1 className="text-xl font-bold mb-5">QR Code Image Generator</h1>
			<form
				onSubmit={(e) => {
					clearErrors();
					handleSubmit(onSubmit)(e);
				}}
			>
				<div className="flex flex-col gap-5">
					<div className="flex w-full border-2 rounded-md h-10">
						<span className="w-[30%] bg-gray-300 text-center h-full flex items-center justify-center text-gray-700 font-medium">
							Name
						</span>
						<input
							type="text"
							placeholder="John doe"
							className="w-[70%] h-full px-4"
							{...register("name", {
								required: "Please, fill your name",
							})}
						/>
					</div>
					<div className="flex w-full border-2 rounded-md h-10">
						<span className="w-[30%] bg-gray-300 text-center h-full flex items-center justify-center text-gray-700 font-medium">
							Linkedin URL
						</span>
						<input
							type="text"
							placeholder="https://www.linkedin.com/in/andr%C3%A9-elias/"
							className="w-[70%] h-full px-4"
							{...register("linkedin")}
						/>
					</div>
					<div className="flex w-full border-2 rounded-md h-10">
						<span className="w-[30%] bg-gray-300 text-center h-full flex items-center justify-center text-gray-700 font-medium">
							Github URL
						</span>
						<input
							type="text"
							placeholder="https://github.com/dedekpo"
							className="w-[70%] h-full px-4"
							{...register("github")}
						/>
					</div>
					<div className="flex w-full border-2 rounded-md h-10">
						<span className="w-[30%] bg-gray-300 text-center h-full flex items-center justify-center text-gray-700 font-medium">
							Who are you?
						</span>
						<input
							type="text"
							placeholder="I'm a software engineer ..."
							className="w-[70%] h-full px-4"
							{...register("about")}
						/>
					</div>
					<div className="flex w-full border-2 rounded-md h-10">
						<span className="w-[30%] bg-gray-300 text-center h-full flex items-center justify-center text-gray-700 font-medium">
							Profile Picture
						</span>
						<input
							type="file"
							accept="image/png, image/jpeg, image/jpg"
							multiple={false}
							className="ml-4 my-auto"
							onChange={onImagesSelect}
						/>
					</div>
					{selectedImage && (
						<div className="relative h-[200px] w-[200px] mx-auto">
							<Image
								src={selectedImage}
								alt={""}
								fill
								className="object-cover rounded-full"
							/>
						</div>
					)}
					<button
						type="submit"
						disabled={isSubmitting}
						className="rounded-md border-2 border-black py-2 font-bold hover:bg-slate-100"
					>
						Generate Image
					</button>
				</div>
			</form>
		</div>
	);
}
