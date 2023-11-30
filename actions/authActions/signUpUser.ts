import {ResultModel} from "../../dao/models/index";
import {handleError} from "../../utils/handleError";
import {ACTION_CODE} from "./_actionCode";
import {LoggerService, AuthService} from "../../services";
const FUNCTION_CODE = "SIGN_UP";

export async function signUpUser(payload: { 
    firstName: string, lastName: string, email: string; password: string 
}) {
	
	try {
		LoggerService.logInfo("Action - signUp - Start");

		const getUserToken = await AuthService.signUpUser(payload);

		LoggerService.logInfo("Action - signUp - End - Success");

		return ResultModel.newSuccessResult(getUserToken);
	}
	catch (error: unknown | Error) {
		handleError(
			error, 
			ACTION_CODE, 
			FUNCTION_CODE,
			"Echec de création de compte",
		);
	}
}
