import {ReactNode} from "react";
import tw from "tailwind-styled-components";

export default function AuthLayout({
	children
}: {
	children: ReactNode
}) {


	return (
		<Container>
			<TopBar/>
			{children}
			<BottomBar/>
		</Container>
	);
}

const Container = tw.div`
	h-screen flex flex-col justify-between
`;

const TopBar = tw.div`
	flex flex-row justify-end items-center p-4
`;

const BottomBar = tw.div`
	bg-sky-500 p-4
`;
