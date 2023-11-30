import {handleError} from "@/utils/handleError";
import {ACTION_CODE} from "./_actionCode";
import {LoggerService} from "@/services";
import {AuthDao} from "@/dao";
import {newSuccessResult} from "@/models/result/result";

import {deleteAuthCookie} from "@/lib/cookies";

const FUNCTION_CODE = "LOG_OUT";

export async function logoutUser() {
	
	try {
		LoggerService.logInfo("Action - logoutUser - Start");

		const result = await AuthDao.logoutUser();

		await deleteAuthCookie();

		LoggerService.logInfo("Action - logoutUser - End - Success");

		return newSuccessResult(result);
	}
	
	catch (error: unknown | Error) {
		handleError(
			error, 
			ACTION_CODE, 
			FUNCTION_CODE,
			"Echec de déconnexion",
		);
	}
}
