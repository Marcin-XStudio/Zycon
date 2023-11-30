import {handleError} from "@/utils/handleError";
import {ACTION_CODE} from "./_actionCode";
import {LoggerService} from "@/services";
import {AuthDao} from "@/dao";
import {createCookie} from "@/lib/cookies";

const FUNCTION_CODE = "UPDATE_CURRENT_USER";

interface Payload {
	first_name?: string;
	last_name?: string;
	email?: string;
	password?: string;
}

export interface CookieData {
	[key: string]: number | string | null | undefined;
	access_token?: string | null;
	refresh_token?: string | null;
    expires_at?: number | null;
    expires?: number | null;
}

export async function updateCurrentUser(payload: Payload) {
	try {
		LoggerService.logInfo("Action - updateCurrentUser - Start");
		let updatedUser;

		const email = payload.email as string;

		const getUserToken = await AuthDao.loginUser({email, password: "1234"}) as CookieData;

		if (getUserToken) {
			await createCookie(getUserToken);
			updatedUser = await AuthDao.updateCurrentUser(payload);
		} 

		LoggerService.logInfo("Action - updateCurrentUser - End - Success");

		return updatedUser;
	}
	
	catch (error: unknown | Error) {
		handleError(
			error, 
			ACTION_CODE, 
			FUNCTION_CODE,
			"Echec de la mise à jour du profil",
		);
	}
}
