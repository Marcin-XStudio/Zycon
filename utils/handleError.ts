import {ErrorSchema, newError} from "../dao/models";
import * as z from "zod";
export type Error = z.infer<typeof ErrorSchema>;

export const handleError = (
	error: unknown | Error, 
	layer_code: string, 
	function_code: string,
	user_message: string, 
) => {
	if (typeof error !== typeof ErrorSchema) {
		const newErr = newError({
			trace: `${layer_code}/${function_code}/ERROR`,
			user_message: user_message,
			error: error instanceof Error ? error.message : error
		});
		return newErr;
	} else {
		if (typeof error === typeof ErrorSchema) {
			return error;
		}
		return error;
	}
};