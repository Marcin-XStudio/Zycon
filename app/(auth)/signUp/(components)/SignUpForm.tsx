"use client";

import {useState} from "react";
import {useForm} from "react-hook-form";
import Image from "next/image";
import {useRouter} from "next/navigation";

import {TextInput} from "@/components/ui/TextInput";
import {Button} from "@/components/ui/Button";
import {Checkbox} from "@/components/ui/Checkbox";
import {AuthActions} from "@/actions";
import roundedLogo from "@/public/zycon_logo.svg";

  interface Credentials {
	first_name: string,
	last_name: string,
	email: string,
	password: string
}

export default function SignUpForm({email}: {email: string}) {
	const [errorMessage, setErrorMessage] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const defaultValues = {
		fist_name: "",
		fast_name: "",
		email: email,
		password: "",
	};

	const {handleSubmit, control} = useForm<FormData | any>({defaultValues});

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
			password: data.password,
			first_name: data.first_name,
			last_name: data.last_name
		};
		
		const result = await AuthActions.updateCurrentUser(credentials);

		if(result) {
			setErrorMessage(false);
			router.push("/dashboard");
		} else {
			setLoading(false);
			setErrorMessage(true);
		}
	};

	const handleRemeberMe = (value: boolean) => {
		setRememberMe(value);
	};
	
	return (
		<div className="flex flex-col justify-center mx-auto w-6/12 max-w-[700px] min-h-screen px-6 py-12 lg:px-8">
			<div className="flex items-center justify-start w-full mx-auto">
				<Image
					src={roundedLogo}
					height={65}
					width={65}
					alt="Akteap"
				/>
				<h2 className="ml-8 text-3xl font-bold leading-9 tracking-tight text-center text-gray-900">
					Inscription
				</h2>
			</div>
  
			<div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] mt-10 w-full sm:mx-auto p-11 rounded-[11px] bg-[#ffffff]">
				{errorMessage && (
					<div className="flex items-center justify-center w-full h-12 mb-4 text-sm font-medium text-red-600 bg-red-100 rounded-md">
						<p>Impossible de vous inscrire, vérifié vos informations !</p>
					</div>
				)}
				
				<form className="space-y-6">
					<div className="flex flex-row justify-between mb-8 gap-x-4">
						<TextInput
							label="Prénom"
							name="first_name"
							control={control}
							placeholder="Prénom"
							rules={{required: "Prénom obligatoire"}}
							width="w-1/2"
						/>

						<TextInput
							label="Nom"
							name="last_name"
							control={control}
							placeholder="Nom"
							rules={{required: "Nom obligatoire"}}
							width="w-1/2"
						/>
					</div>
					
					<div className="mb-8">
						<TextInput
							label="Adresse Email"
							name="email"
							type="email"
							control={control}
							placeholder="Email"
							readOnly={true}
						/>
					</div>
					
					<div>
						<TextInput
							label="Mot de passe"
							name="password"
							control={control}
							placeholder="Mot de passe"
							type="password"
							rules={{required: "Mot de passe obligatoire"}}
						/>
					</div>
					
					<div className="flex items-center justify-start">
						<Checkbox 
							backgroundColor="blue-gradient"  
							width="w-[16px]" 
							height="h-[16px]" 
							onClick={handleRemeberMe}
							checked={rememberMe} 
						/>
						<p className="mb-1 ml-3 font-medium leading-none text-black">Se souvenir de moi</p>
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
