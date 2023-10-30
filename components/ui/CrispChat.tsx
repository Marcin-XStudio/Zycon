import {Crisp} from "crisp-sdk-web";
import {useEffect} from "react";

export function CrispChat() {
	useEffect(() => {
		Crisp.configure("97808bc1-ec1e-4d9f-82d7-78cc74c01137");

	});
	return null;
}