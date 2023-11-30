import {newError} from "../../dao/models";
import {SERVICE_CODE} from "./_serviceCode";
const FUNCTION_CODE = "LOG_INFO";

/**
 * logInfo
 * @param {string} msg
 * @return {Promise<Result>}
 * @author titouan@x-studio.fr
 */
export async function logInfo(msg: string) {
	try {
		console.log(msg);
	}
	catch (error) {
		console.error(newError({
			code: `${SERVICE_CODE}/${FUNCTION_CODE}/ERROR`,
			message: "Une erreur est survenue.",
			error: error
		}));
	}
}
