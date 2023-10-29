import {ErrorModel, ResultModel} from "../../models";
import {ACTION_CODE} from "./_actionCode";
import {LoggerService, AuthService} from "../../services";
const FUNCTION_CODE = "LOG_IN";

export async function loginUser(payload: { email: string; password: string }) {
	
	try {
		LoggerService.logInfo("Action - logIn - Start");
		// interface AuthentcateData {
		// 	access_token: string,
		// 	expires: number,
		// 	refresh_token: string,
		// }
		const getUserToken = await AuthService.loginUser(payload);

		LoggerService.logInfo("Action - logIn - End - Success");

		return ResultModel.newSuccessResult(getUserToken);
	}
	
	catch (error: unknown | ErrorModel.Error) {
		LoggerService.logInfo("authenticateUser - Error");
		if (typeof error !== typeof ErrorModel.ErrorSchema) {
			const newErr = ErrorModel.newError({
				trace: `${ACTION_CODE}/${FUNCTION_CODE}/ERROR`,
				user_message: "Echec de connection",
				debug_message: "Une erreur est survenue.",
				error: error
			});
			LoggerService.logError(error);
			return ResultModel.newErrorResult(newErr);
		} else {
			if (typeof error === typeof ErrorModel.ErrorSchema) {
				(error as ErrorModel.Error).trace = (error as ErrorModel.Error).trace + ` => ${ACTION_CODE}/${FUNCTION_CODE}/ERROR`;
			}
			LoggerService.logError(error);
			return ResultModel.newErrorResult(error); // fix type error here
		}
	}
}
