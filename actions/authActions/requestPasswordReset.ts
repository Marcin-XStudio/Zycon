import {handleError} from "@/utils/handleError";
import {ACTION_CODE} from "./_actionCode";
import {LoggerService} from "@/services";
import {AuthDao} from "@/dao";

const FUNCTION_CODE = "REQUEST_PASSWORD_RESET";


export async function requestPasswordReset(email: string) {
	try {
		LoggerService.logInfo("Action - requestPasswordReset - Start");

		const response = await AuthDao.requestPasswordReset(email);

		LoggerService.logInfo("Action - requestPasswordReset - End - Success");
		
		return response;
	} 
    
	catch (error: unknown | Error) {
		handleError(
			error, 
			ACTION_CODE, 
			FUNCTION_CODE,
			"Echec du reset du mot de passe",
		);
	}
}
