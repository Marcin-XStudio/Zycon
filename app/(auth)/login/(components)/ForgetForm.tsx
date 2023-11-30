import {useState} from "react";
import {useForm} from "react-hook-form";
import Image from "next/image";

import {TextInput} from "@/components/ui/TextInput";
import {Button} from "@/components/ui/Button";
import roundedLogo from "@/public/zycon_logo.svg";
import {AuthActions} from "@/actions";

interface LoginFormProps {
	setView: React.Dispatch<React.SetStateAction<string>>;
  }

export function ForgetForm ({setView}: LoginFormProps) {
	const [successMessage, setSuccessMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [loading, setLoading] = useState(false);

	const defaultValues = {
		email: ""
	};

	const {handleSubmit, control} = useForm<FormData | any>({defaultValues});

	const onSubmit = async (data: {email: string}) => {
		setLoading(true);

		try {
			await AuthActions.requestPasswordReset(data.email);
			
			setErrorMessage(false);
			setSuccessMessage(true);
		} catch (error) {
			setErrorMessage(true);
		}

		setLoading(false);
	};

	return (
		<div className="flex flex-col mx-auto  w-6/12 max-w-[700px] justify-center min-h-screen px-6 py-12 lg:px-8">
			<div className="flex items-center justify-start w-full-auto">
				<Image
					className=""
					src={roundedLogo}
					height={65}
					width={65}
					alt="Your Company"
				/>
				<h2 className="ml-8 text-3xl font-bold leading-9 tracking-tight text-center text-gray-900">
					Mot de passe oublié
				</h2>
			</div>

			<div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] mt-10 w-full sm:mx-auto p-11 rounded-[11px] bg-[#ffffff]">
				<div onClick={() => setView("login")} className="flex items-center justify-start mb-5 border-b-2 cursor-pointer w-fit border-b-transparent hover:border-b-2 hover:border-Blue">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#272c56" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
					</svg>
					<p className="mb-1 ml-2 text-Blue">Revenir</p>
				</div>

				{errorMessage && (
					<div className="flex items-center justify-center w-full h-12 mb-4 text-sm font-medium text-red-600 bg-red-100 rounded-md">
						<p>Une erreur vient de se produire, veuillez réessayer.</p>
					</div>
				)}
				
				{!successMessage ? ( 
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
					</form>) : (
					<div className="flex items-center justify-center w-full h-12 text-sm font-medium text-green-600 bg-green-100 rounded-md">
						<p>Votre demande à bien été pris en compte.</p>
					</div>
				)}
			</div>
		</div>
	);
}