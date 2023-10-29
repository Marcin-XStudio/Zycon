import * as z from "zod";
import * as errorFunctions from "./functions";
import {newTimestamp, TimestampSchema} from "../timestamp";

export const ErrorSchema = z.object({
	trace: z.string(),
	user_message: z.string(),
	debug_message: z.string(),
	createdTimestamp: TimestampSchema,
	error: z.any().default(null)
});

export const ErrorPartialSchema = ErrorSchema.partial();
export type ErrorPartial = z.infer<typeof ErrorPartialSchema>;
export type Error = z.infer<typeof ErrorSchema>;

export function newError(data: unknown) {
	if (data === null || data === undefined) {
		throw new Error("Payload can't be null or undefined.");
	}

	if (typeof data !== "object") {
		throw new Error("Payload has to be an object");
	}

	const returnValue = {
		...ErrorSchema.parse({...data, ...{createdTimestamp: newTimestamp()}}),
	};

	return returnValue;
}

export function parseError(data: unknown, partial = false) {
	if (!partial) {
		return {
			...ErrorSchema.parse(data),
			...errorFunctions
		};
	}
	else if (data === null || data === undefined) {
		throw new Error("Payload can't be null or undefined.");
	}
	else if (typeof data !== "object") {
		throw new Error("Payload has to be an object");
	}
	else if (Object.keys(data).length === 0) {
		throw new Error("Payload Object can't be null");
	}
	else {
		return {
			...ErrorPartialSchema.parse(data),
			...errorFunctions
		};
	}
}