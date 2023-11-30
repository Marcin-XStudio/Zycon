import {redirect} from "next/navigation";

import SignUpForm from "./(components)/SignUpForm";

const SignUpPage = ({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) => {
	let email = searchParams?.email;

	if (Array.isArray(email)) {
		email = email[0];
	}

	if (!email) {
		redirect("/login");
	}

	return (
		<div className="bg-[#f8f9fa]">
			<SignUpForm email={email} />
		</div>
	);
};

export default SignUpPage;
