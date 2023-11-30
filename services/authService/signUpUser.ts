import {AuthDao} from "../../dao/index";
import {handleError} from "@/utils/handleError";
import {SERVICE_CODE} from "./_serviceCode";
const FUNCTION_CODE = "SIGN_UP";

// Add two numbers

export async function signUpUser(payload: { 
    firstName: string, lastName: string, email: string; password: string 
}) {
	try {

		const result = await AuthDao.signUpUser(payload);

		return result;
	}
	catch (error: unknown | Error) {
		handleError(
			error, 
			SERVICE_CODE, 
			FUNCTION_CODE,
			"Echec de création de compte",
		);
	}
}
