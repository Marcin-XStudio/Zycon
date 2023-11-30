import {newError} from "../../dao/models";
import {SERVICE_CODE} from "./_serviceCode";
const FUNCTION_CODE = "LOG_ERROR";

/**
 * logError
 * @param {any} error
 * @return {Promise<Result>}
 * @author titouan@x-studio.fr
 */
export async function logError(error: unknown) {
	try {
		console.error(error);
	}
	catch (error) {
		console.error(newError({
			code: `${SERVICE_CODE}/${FUNCTION_CODE}/ERROR`,
			message: "Une erreur est survenue.",
			error: error
		}));
	}
}
