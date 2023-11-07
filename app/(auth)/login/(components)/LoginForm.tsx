"use client";

import {useForm} from "react-hook-form";
import {Controller} from "react-hook-form";
import {TextInput, Button} from "@/components/ui";
import {AuthActions} from "@/actions";
import Hotjar from "@hotjar/browser";
// import {redirect} from "next/navigation";
import {useRouter} from "next/navigation";



function LoginForm() {

	const router = useRouter();

	const defaultValues = {
		email: "",
		password: "",
	};

	const {handleSubmit, control} = useForm({defaultValues: defaultValues});

	interface Credentials {
		email: string,
		password: string
	}
	const onSubmit = async (data:Credentials) => {
	
		Hotjar.identify, null, { 
			email: data.email,
			password: data.password
		};
		const credentials = {
			email: data.email,
			password: data.password,
		};


		const result = await AuthActions.loginUser(credentials);
		
		if (result.success) {
			router.push("/coming-soon");
		}

		if (!result.success) {
			router.push("/coming-soon");
			console.log(result);
				
		}
	};
	
    
	return (
		<div>
			<div className="flex flex-row justify-between px-4 pt-2 pb-4">
				<div className="flex flex-col justify-between">
					<div className="mb-2">
						<Controller
							name="email"
							control={control}
							rules={{
								required: {
									value: true,
									message: "Ce champ est requis"
								}}}
							render={({
								field: {onChange, value},
								fieldState: {error}
							}) => (
								<TextInput
									label={"Email"}
									name="email"
									type="email"
									onChange={onChange}
									value={value}
									placeholder="Email"
									error={error}
								/>
							)}
						/>
					</div>
					<div className="mb-2">
						<Controller
							name="password"
							control={control}
							rules={{
								required: {
									value: true,
									message: "Ce champ est requis"
								}
							}}
							render={({
								field: {onChange, value},
								fieldState: {error}
							}) => (
								<TextInput
									label={"Mot de passe"}
									name="password"
									onChange={onChange}
									value={value}
									error={error}
									placeholder="Mot de passe"
									type="password"
								/>
							)}
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-center pb-2">
				<div className="flex justify-center pb-2">
					<Button
						content={"Valider"}
						onClick={handleSubmit(onSubmit)}
					/>
				</div>
				{/* <Error errors={errors}/> */}
			</div>
		</div>
	);
}

export default LoginForm;
