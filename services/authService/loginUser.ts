import {AuthDao} from "../../dao";
import {ErrorModel} from "../../models";
import {SERVICE_CODE} from "./_serviceCode";
const FUNCTION_CODE = "GET_USER_TOKEN";

export async function loginUser(payload: { email: string; password: string }) {
	try {

		const result = await AuthDao.loginUser(payload);

		return result;
	}
	catch (error: unknown | ErrorModel.Error) {
		if (typeof error !== typeof ErrorModel.ErrorSchema) {
			const newErr = ErrorModel.newError({
				trace: `${SERVICE_CODE}/${FUNCTION_CODE}/ERROR`,
				user_message: "Echec de connection",
				debug_message: "Une erreur est survenue.",
				error: error instanceof Error ? error.message : error
			});
			return newErr;
		} else {
			if (typeof error === typeof ErrorModel.ErrorSchema) {
				return error;
			}
			return error;
		}
	}
}
