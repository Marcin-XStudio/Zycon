import {client} from "@/lib/directus";
import {createUser} from "@directus/sdk";
import {DAO_CODE} from "./_daoCode";
import {handleError} from "@/utils/handleError";
const FUNCTION_CODE = "SIGN_UP";

export async function signUpUser(payload: { 
    firstName: string, lastName: string, email: string; password: string 
}) {
	try {

		const newPayload = {
			first_name: payload.firstName,
			last_name:payload.lastName,
			email: payload.email,
			password: payload.password
		};

		const result = await client.request(createUser(newPayload));

		// const result = await directus.request(readMe({
		// 	fields: ["*"],
		// }));

		console.log("result", result);
		
		return result;
	}
	catch (error: unknown | Error) {
		handleError(
			error, 
			DAO_CODE, 
			FUNCTION_CODE,
			"Echec de création de compte",
		);
	}
}