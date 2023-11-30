import {logout} from "@directus/sdk";

import {DAO_CODE} from "./_daoCode";
import {client} from "@/lib/directus";
import {handleError} from "@/utils/handleError";
import {getCookie} from "@/lib/cookies";

const FUNCTION_CODE = "LOGOUT_USER";

export async function logoutUser() {

	try {
		const cookie = await getCookie();

		if (!cookie || !cookie.refresh_token) {
			throw Error("No cookie or refresh token");
		}

		return await client.request(logout(cookie.refresh_token));
	}
	catch (error: unknown | Error) {		
		handleError(
			error, 
			DAO_CODE, 
			FUNCTION_CODE,
			"Echec de la déconnexion",
		);
	}
}