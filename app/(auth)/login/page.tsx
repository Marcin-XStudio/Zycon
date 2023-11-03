"use client";
import LoginForm from "./(components)/LoginForm";
import {useLocalStorage} from "@/utils";


const LoginPage = () => {

	const hello = useLocalStorage("item", "hello");

	console.log("hello", hello);
	
	return (
		<div className="flex flex-col justify-center min-h-screen bg-gray-100">
			<div className="container py-20 mx-auto w-96">
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
