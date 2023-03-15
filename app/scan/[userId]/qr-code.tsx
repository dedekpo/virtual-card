"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

export default function QRCode({
	userId,
	userName,
}: {
	userId: string | undefined;
	userName: string | undefined;
}) {
	const canvasRef = useRef() as React.MutableRefObject<HTMLInputElement>;

	function handleButtonClicked() {
		const canvas = canvasRef.current.children[0]?.children[0] as any;
		const pngFile = canvas.toDataURL("image/png");

		const downloadLink = document.createElement("a");
		downloadLink.download = `${userName} - ${new Date().toLocaleDateString()}`;
		downloadLink.href = `${pngFile}`;
		downloadLink.click();
	}

	return (
		<div ref={canvasRef} className="flex flex-col">
			<div className="mx-auto">
				<QRCodeCanvas
					value={`https://${window.location.hostname}/user/${userId}`}
				/>
			</div>
			<button
				onClick={handleButtonClicked}
				className="text-sm border-[1px] px-3 py-1 mt-3 hover:bg-slate-100"
			>
				Download QR Code
			</button>
		</div>
	);
}
