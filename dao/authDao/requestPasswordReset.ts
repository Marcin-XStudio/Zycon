import {passwordRequest} from "@directus/sdk";

import {client} from "@/lib/directus";
import {DAO_CODE} from "./_daoCode";
import {handleError} from "@/utils/handleError";

const FUNCTION_CODE = "REQUEST_PASSWORD_RESET";

export async function requestPasswordReset(email: string) {
	try {
		return await client.request(passwordRequest(email));
	}
	catch (error: unknown | Error) {
		handleError(
			error, 
			DAO_CODE, 
			FUNCTION_CODE,
			"Echec de la demande de reset du mot de passe",
		);
	}
}