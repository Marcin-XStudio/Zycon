"use client";

import {useState} from "react";

import {LoginForm} from "./(components)/LoginForm";
import {ForgetForm} from "./(components)/ForgetForm";

const LoginPage = () => {
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

export default LoginPage;
