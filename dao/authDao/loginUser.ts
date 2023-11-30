import {client} from "@/lib/directus";
import {DAO_CODE} from "./_daoCode";
import {handleError} from "@/utils/handleError";
const FUNCTION_CODE = "GET_USER_TOKEN";

export async function loginUser(payload: { email: string; password: string }) {

	try {
		const result = await client.login(payload.email, payload.password);

		if (!result.access_token) {
			throw "No access token found";
		}

		return result;
	}
	catch (error: unknown | Error) {		
		handleError(
			error, 
			DAO_CODE, 
			FUNCTION_CODE,
			"Echec de connexion",
		);
	}
}