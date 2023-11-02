"use client";

import {localStorage} from "../utils";
import {Button} from "../components/ui/Button";

export default function Page() {

	const setItem = () => {
		localStorage.setItem("id", "zycon");
	};

	const getItem = () => {
		const item = localStorage.getItem("id");
		console.log("item", item);
	};

	const removeItem = () => {
		localStorage.removeItem("id");
	};

	return (
		<div>
			<h1>{"title"}</h1>
			<Button content="set" onClick={setItem}/>
			<Button content="get" onClick={getItem}/>
			<Button content="remove" onClick={removeItem}/>
		</div>
	);
}
