import Image from "next/image";

import spinnerIcon from "@/public/icons/spinner.png";

interface ButtonProps {
    content: string,
	backgroundColor?: string,
	width?: string,
	textColor?: string,
	leftIcon?: string,
	rightIcon?: string,
	textPosition?: string,
	disabled?: boolean,
	onClick?: () => void,
	textStyle?: string,
	loading?: boolean
}

export function Button({
	content,
	disabled = false,
	onClick, 
	backgroundColor,
	leftIcon,
	rightIcon,
	textColor,
	width = "w-fit",
	textPosition = "text-left",
	textStyle,
	loading = false
}: ButtonProps) {
	let background;
	let text;
	let position;

	switch (backgroundColor) {
	case "red":
		background = "bg-Red";
		break;
	case "blue":
		background = "bg-Blue";
		break;
	case "green":
		background = "bg-Green";
		break;
	case "blue-gradient":
		background = "blue-gradient";
		break;
	case "white":
		background = "bg-white";
		break;
	case "gray":
		background = "bg-[#c4cdd5]";
		break;
	default:
		background = "bg-Blue";
	}

	switch (textColor) {
	case "white":
		text = "text-white";
		break;
	case "black":
		text = "text-Black";
		break;
	default:
		text = "text-white";
	}

	switch (textPosition) {
	case "center":
		position = "text-center";
		break;
	case "right":
		position = "text-right";
		break;
	default:
		position = "text-left";
	}


	return (
		<button
			type="button"
			disabled={disabled || loading}
			onClick={onClick}
			className={
				disabled ?
					`${width} bg-Disabled-bg-grey text-Disabled-text-grey flex flex-row justify-between leading-none items-center rounded-md px-3.5 h-10 text-sm font-normal`
					:
					`${background} ${text} ${width} flex flex-row justify-between leading-none items-center rounded-md px-3.5 h-10 text-sm font-normal shadow-sm hover:opacity-90`
			}
		>
			{leftIcon && (
				<span className="w-fit">
					<Image src={leftIcon} alt="button-icon" />
				</span>
			)}

			{!loading ? (
				<p className={`w-full ${leftIcon && "ml-4"} ${position} ${textStyle}`}>{content}</p>
			) : (
				<div className="mx-auto animate-spin">
					<Image src={spinnerIcon} height={20} width={20} alt="loading"/>
				</div>
			)}
			
			{rightIcon && (
				<span className="w-fit">
					<Image src={rightIcon} alt="button-icon" />
				</span>
			)}
		</button>
		
	);
}
