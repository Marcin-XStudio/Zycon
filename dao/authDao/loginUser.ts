import {ErrorModel} from "../../models";
import {directus} from "@/api/directus";
import {DAO_CODE} from "./_daoCode";
const FUNCTION_CODE = "GET_USER_TOKEN";

export async function loginUser(payload: { email: string; password: string }) {
	try {

		const result = await directus.login(payload.email, payload.password);

		console.log("result", result);
		
		return result;
	}
	catch (error: unknown | ErrorModel.Error) {
		if (typeof error !== typeof ErrorModel.ErrorSchema) {
			const newErr = ErrorModel.newError({
				trace: `${DAO_CODE}/${FUNCTION_CODE}/ERROR`,
				user_message: "Echec de connexion",
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