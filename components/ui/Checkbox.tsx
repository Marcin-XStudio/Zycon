"use client";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import CheckIcon from "../../public/icons/check-icon.svg";
import {Control, useController} from "react-hook-form";

interface CheckBoxProps {
    backgroundColor?: string,
    name?: string | undefined | null,
    control?: Control;
    width?: string,
    height?: string,
    disabled?: boolean,
    checked?: boolean
    onClick?: (isChecked: boolean) => void;
}

export function Checkbox({
	name = null,
	control,
	disabled,
	backgroundColor = "blue",
	width = "w-fit",
	height = "h-fit",
	checked = false,
	onClick = () => null,
}: CheckBoxProps) {
	const [isChecked, setIsChecked] = useState(false);
	let onChange = (e: boolean) => {console.log(e);};
	let value = false;

	// if name and control are provided, we use react-hook-form to manage the state
	if (name && control) {
		const {field: {onChange: formOnChange, value: formValue}} = useController({name, control});
		onChange = formOnChange;
		value = formValue;
	}
    
	useEffect(() => {
		if (name && control) {
			setIsChecked(value);
		} else {
			setIsChecked(checked);
		}
	}, [checked, value]);

	const handleOnClick = () => {
		const newCheckedValue = !isChecked;
		setIsChecked(newCheckedValue);
		
		if (name && control) {
			onChange(newCheckedValue);
		} else {
			onClick(newCheckedValue);
		}
	};

	let background;

	switch (backgroundColor) {
	case "red":
		background = "bg-red";
		break;
	case "blue":
		background = "bg-blue";
		break;
	case "green":
		background = "bg-green";
		break;
	case "blue-gradient":
		background = "blue-gradient";
		break;
	case "white":
		background = "bg-white";
		break;
	case "grey":
		background = "bg-Grey";
		break;
	default:
		background = "bg-blue";
	}

	return (
		<button
			type="button"
			disabled={disabled}
			onClick={handleOnClick}
			className={`${width} ${height}`}
		>
			{disabled && (
				<div className={`flex ${width} ${height} justify-center rounded bg-[#D2D5DA] `}>
					<Image src={CheckIcon} alt="disabled-checkbox" />
				</div>
			)}
            
			{isChecked && !disabled && (
				<div className={`flex ${width} ${height} justify-center rounded ${background}`}>
					<Image src={CheckIcon} alt="checked-checkbox"/>
				</div>
			)}

			{!isChecked && !disabled && (
				<div className={`flex ${width} ${height} justify-center rounded border-[1px] border-[#D2D5DA]`} />
			)}
		</button>
        
	);
}