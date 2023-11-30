import {AuthDao} from "../../dao";
import {newError} from "../../dao/models/error/error";
import {SERVICE_CODE} from "./_serviceCode";
const FUNCTION_CODE = "GET_USER_TOKEN";

export async function loginUser(payload: { email: string; password: string }) {
	try {

		const result = await AuthDao.loginUser(payload);

		return result;
	}
	catch (error: unknown | Error) {
		if (typeof error !== typeof Error) {
			const newErr = newError({
				trace: `${SERVICE_CODE}/${FUNCTION_CODE}/ERROR`,
				user_message: "Echec de connection",
				debug_message: "Une erreur est survenue.",
				error: error
			});
			throw newErr;
		} else {
			if (typeof error === typeof Error) {
				throw error;
			}
			throw error;
		}
	}
}
