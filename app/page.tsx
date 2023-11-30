"use client";

import {useState} from "react";

import {LoginForm} from "./(auth)/login/(components)/LoginForm";
import {ForgetForm} from "./(auth)/login/(components)/ForgetForm";

const page = () => {
	const [view, setView] = useState("login");

	return (
		<div className="bg-[#f8f9fa]">
			{view === "login" && (
				<LoginForm setView={setView} />
			)}

			{view === "forget" && (
				<ForgetForm setView={setView} />
			)}
		</div>
	);
};

export default page;
