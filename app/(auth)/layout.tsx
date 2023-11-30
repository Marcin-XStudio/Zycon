import {ReactNode} from "react";
import tw from "tailwind-styled-components";

export default function AuthLayout({
	children
}: {
	children: ReactNode
}) {


	return (
		<Container>
			{children}
		</Container>
	);
}

const Container = tw.div`
	h-screen flex flex-col justify-between
`;
