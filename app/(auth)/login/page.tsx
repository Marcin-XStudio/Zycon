import LoginForm from "./(components)/LoginForm";

const LoginPage = () => {

	return (
		<div className="flex flex-col justify-center min-h-screen bg-gray-100">
			<div className="container py-20 mx-auto w-96">
				<LoginForm />
			</div>
		</div>
	);
};

export default LoginPage;
