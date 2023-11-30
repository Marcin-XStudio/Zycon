import {handleError} from "@/utils/handleError";
import {ACTION_CODE} from "./_actionCode";
import {LoggerService} from "@/services";
import {AuthDao} from "@/dao";

const FUNCTION_CODE = "REFRESH_USER_TOKEN";


export async function refreshUserToken(accessToken: string) {
	try {
		LoggerService.logInfo("Action - refreshUserToken - Start");

		const refreshedToken = await AuthDao.refreshUserToken(accessToken);

		LoggerService.logInfo("Action - refreshUserToken - End - Success");
		
		return refreshedToken;
	} 
    
	catch (error: unknown | Error) {
		handleError(
			error, 
			ACTION_CODE, 
			FUNCTION_CODE,
			"Echec du rafraichissement du token",
		);
	}
}
