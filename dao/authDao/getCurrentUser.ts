import {readMe, withToken} from "@directus/sdk";

import {client} from "@/lib/directus";
import {DAO_CODE} from "./_daoCode";
import {handleError} from "@/utils/handleError";
import {getCookie, type CookieData} from "@/lib/cookies";

const FUNCTION_CODE = "GET_CURRENT_USER";

export async function getCurrentUser() {
	try {
		const authCookie = await getCookie() as CookieData;
		const accessToken = authCookie?.access_token;

		if (!accessToken || !authCookie) {
			return "No cookie";
		}

		return await client.request(withToken(accessToken, readMe()));
	}
	
	catch (error: unknown | Error) {
		handleError(
			error, 
			DAO_CODE, 
			FUNCTION_CODE,
			"Echec de la récupération de l'utilisateur courant",
		);
	}
}