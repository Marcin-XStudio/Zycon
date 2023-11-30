import {refresh} from "@directus/sdk";

import {client} from "@/lib/directus";
import {DAO_CODE} from "./_daoCode";
import {handleError} from "@/utils/handleError";

const FUNCTION_CODE = "REFRESH_USER_TOKEN";

export async function refreshUserToken(refreshToken: string) {
	try {
		if (!refreshToken) {
			throw "No refresh token";
		}

		const result = await client.request(refresh("json", refreshToken));

		return {...result, expires_at: Date.now() + 850_000};
	}
	catch (error: unknown | Error) {
		handleError(
			error, 
			DAO_CODE, 
			FUNCTION_CODE,
			"Echec du rafraichissement du token",
		);
	}
}