"use client";

import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import Image from "next/image";

import {TextInput} from "@/components/ui/TextInput";
import {Button} from "@/components/ui/Button";
import {Checkbox} from "@/components/ui/Checkbox";
import {AuthActions} from "@/actions";
import roundedLogo from "@/public/zycon_logo.svg";

interface LoginFormProps {
	setView: React.Dispatch<React.SetStateAction<string>>;
  }

  interface Credentials {
	email: string,
	password: string
}

export function LoginForm({setView}: LoginFormProps) {
	const [errorMessage, setErrorMessage] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [loading, setLoading] = useState(false);
	
	const router = useRouter();

	const defaultValues = {
		email: "",
		password: "",
	};

	const {handleSubmit, control, reset} = useForm<FormData | any>({defaultValues});

	useEffect(() => {
		const rememberMe = localStorage.getItem("rememberMe") === "true";
		const email = rememberMe ? localStorage.getItem("email") : "";
		const password = rememberMe ? localStorage.getItem("password") : "";
		setRememberMe(rememberMe);
		reset({email, password});
	}, []);

	const onSubmit = async (data:Credentials) => {
		setLoading(true);

		if (rememberMe) {
			localStorage.setItem("rememberMe", "true");
			localStorage.setItem("email", data.email);
			localStorage.setItem("password", data.password);
		} else {
			localStorage.removeItem("rememberMe");
			localStorage.removeItem("email");
			localStorage.removeItem("password");
		}

		const credentials = {
			email: data.email,
			password: data.password
		};

		const result = await AuthActions.loginUser(credentials);

		if (result) {
			setErrorMessage(false);
			return router.push("/dashboard");
		}
		
		setLoading(false);
		setErrorMessage(true);
	};

	const handleRemeberMe = (value: boolean) => {
		setRememberMe(value);
	};
	
	return (
		<div className="flex flex-col justify-center w-6/12 max-w-[700px] min-h-screen px-6 py-12 mx-auto lg:px-8">
			<div className="flex items-center justify-start w-full mx-auto">
				<Image
					className=""
					src={roundedLogo}
					height={165}
					width={165}
					alt="Your Company"
				/>
				<h2 className="ml-8 text-3xl font-bold leading-9 tracking-tight text-center text-gray-900">
					Se connecter
				</h2>
			</div>
  
			<div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] mt-10 sm:mx-auto p-11 w-full rounded-[11px] bg-[#ffffff]">
				{errorMessage && (
					<div className="flex items-center justify-center w-full h-12 mb-4 text-sm font-medium text-red-600 bg-red-100 rounded-md">
						<p>Email ou mot de passe incorrect</p>
					</div>
				)}
				
				<form className="space-y-6">
					<div>
						<div className="mt-2">
							<TextInput
								label="Adresse Email"
								name="email"
								type="email"
								control={control}
								placeholder="Email"
								rules={{
									required: "Email is required",
									validate: {
										matchPattern: (v: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Le format de l'email est incorrect",
									}}}
							/>
						</div>
					</div>
					
					<div className="mt-2">
						<TextInput
							label="Mot de passe"
							name="password"
							control={control}
							placeholder="Mot de passe"
							type="password"
							rules={{required: "Mot de passe obligatoire"}}
						/>
					</div>
					
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start w-1/2">
							<Checkbox 
								backgroundColor="blue-gradient"  
								width="w-[16px]" 
								height="h-[16px]" 
								onClick={handleRemeberMe}
								checked={rememberMe} 
							/>
							<p className="ml-3 font-medium leading-none text-black">Se souvenir de moi</p>
						</div>
						<div className="text-sm">
							<p onClick={() => setView("forget")} className="cursor-pointer font-semibold text-[#4DBAB5] hover:text-[#4dbab4ab]">
								Mot de passe oublié ?
							</p>
						</div>
					</div>
  
					<div>
						<Button
							onClick={handleSubmit(onSubmit)}
							content="Confirmer"
							width="w-full"
							textPosition="center"
							textStyle="font-bold"
							loading={loading}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
  
