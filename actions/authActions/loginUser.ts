// import {ResultModel} from "../../dao/models";
import {handleError} from "@/utils/handleError";
import {ACTION_CODE} from "./_actionCode";
import {LoggerService} from "@/services";
import {AuthDao} from "@/dao/index";
import {createCookie} from "@/lib/cookies";

const FUNCTION_CODE = "LOG_IN";

export interface CookieData {
	[key: string]: number | string | null | undefined;
	access_token?: string | null;
	refresh_token?: string | null;
    expires_at?: number | null;
    expires?: number | null;
}


export async function loginUser(payload: { email: string; password: string }) {
	
	try {
		LoggerService.logInfo("Action - loginUser - Start");

		const getUserToken = await AuthDao.loginUser(payload) as CookieData;

		if (getUserToken) {
			await createCookie(getUserToken);
		} 

		LoggerService.logInfo("Action - loginUser - End - Success");
		
		return getUserToken;
	}
	
	catch (error: unknown | Error) {
		handleError(
			error, 
			ACTION_CODE, 
			FUNCTION_CODE,
			"Echec de connexion",
		);
	}
}
