"use client";

import {localStorage} from "../utils/";

export default function Page() {
	const [name, setName] = localStorage.useLocalStorage("key", "");

	return (
		<div>
			<h1>{"title"}</h1>
			<p>{name}</p>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
		</div>
	);
}
