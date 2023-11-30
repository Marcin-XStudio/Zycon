import {updateMe, withToken} from "@directus/sdk";

import {client} from "@/lib/directus";
import {DAO_CODE} from "./_daoCode";
import {handleError} from "@/utils/handleError";
import {getCookie, type CookieData} from "@/lib/cookies";

import {parseUser, User} from "@/dao/models/user/models/user";
const FUNCTION_CODE = "UPDATE_CURRENT_USER";

export async function updateCurrentUser(payload: User) {
	try {
		const validPayload = parseUser(payload);

		console.log(parseUser(payload));

		const authCookie = await getCookie() as CookieData;
		const accessToken = authCookie?.access_token;

		if (!accessToken || !authCookie) {
			return "No cookie";
		}
	
		const result = await client.request(withToken(accessToken, updateMe(validPayload, {
			fields: ["id", "first_name", "last_name", "email", "avatar", "status", "description", "tags", "email_notifications"]
		})));

		console.log(result);

		return result;
	}
	catch (error: unknown | Error) {
		handleError(
			error, 
			DAO_CODE, 
			FUNCTION_CODE,
			"Échec de la mise à jour du profil",
		);
	}
}
