"use client";

import {Control, useController} from "react-hook-form";
import {ExclamationCircleIcon} from "@heroicons/react/20/solid";
import tw from "tailwind-styled-components";

interface TextInputProps {
    label: string;
    name: string;
	control: Control;
	rules?: Record<string, unknown>;
    placeholder?: string;
	readOnly?: boolean;
    type?: string;
	required?: boolean;
	width?: string;
}

export function TextInput({
	label, 
	type, 
	name,
	required = false,
	readOnly = false,
	placeholder,
	control,
	rules = {},
	width
}: TextInputProps) {
	const {field: {onChange, ref, value = ""}, fieldState: {error}} = useController({name, control, rules});
	
	
	return (
		<div className={`${width}`}>
			<label htmlFor={name} className="block text-sm font-medium leading-6 pl-[3px]">
				{label}
				{required ? <span className="text-Red"> * </span> : null}
			</label>
			
			<div className="relative mt-2 rounded-md shadow-sm">
				<Input
					type={type}
					onChange={onChange}
					value={value}
					name={name}
					id={name}
					ref={ref}
					placeholder={placeholder || ""}
					aria-invalid="true"
					aria-describedby="error"
					disabled={readOnly}
					readOnly={readOnly}
				/>
				
				{error ? <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
					<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
				</div> : ""}
			</div>

			{error ? <p className="text-xs text-red-600" id="email-error">
				{error.message}
			</p>: ""}
		</div>
	);
}

export const Input = tw.input<{ readOnly?: boolean }>`
	block
	w-full
	h-[56px]
	text-Black
	text-base
	font-normal
	rounded-md 
	border 
	border-[#d5d9dd]
	outline-none 
	focus:border-2 
	focus:border-[#d5d9dd] 
	focus:ring-transparent 
	py-1.5
	pr-10
	leading-none
	placeholder:text-[#d5d9dd]
	placeholder:text-dark-grey
	${p => p.readOnly ? "bg-[#F1F1F1]" : ""}
`;
