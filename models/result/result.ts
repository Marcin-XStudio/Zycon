import * as z from "zod";
import {ErrorModel} from "../error";
import * as resultFunctions from "./functions";

export const ErrorResultSchema = z.object({
	success: z.literal(false),
	error: ErrorModel.ErrorSchema
}).strict();

export const ErrorResultPartialSchema = ErrorResultSchema.partial();
export type ErrorResultPartial = z.infer<typeof ErrorResultPartialSchema>;
export type ErrorResult = z.infer<typeof ErrorResultSchema>;

export function newErrorResult(error: ErrorModel.Error | unknown) {
	return {
		...ErrorResultSchema.parse({success: false, error: error}),
		...resultFunctions
	};
}

export function parseErrorResult(data: unknown, partial = false) {
	if (!partial) {
		return {
			...ErrorResultSchema.parse(data),
			...resultFunctions
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
			...ErrorResultPartialSchema.parse(data),
			...resultFunctions
		};
	}
}

export const SuccessResultSchema = z.object({
	success: z.literal(true),
	data: z.any()
}).strict();

export const SuccessResultPartialSchema = SuccessResultSchema.partial();
export type SuccessResultPartial = z.infer<typeof SuccessResultPartialSchema>;
export type SuccessResult = z.infer<typeof SuccessResultSchema>;

export function newSuccessResult(data: unknown) {
	return {
		...SuccessResultSchema.parse({success: true, data: data}),
		...resultFunctions
	};
}

export function parseSuccessResult(data: unknown, partial = false) {
	if (!partial) {
		return {
			...SuccessResultSchema.parse(data),
			...resultFunctions
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
			...SuccessResultPartialSchema.parse(data),
			...resultFunctions
		};
	}
}

export const ResultSchema = z.union([ErrorResultSchema, SuccessResultSchema]);
export type Result = z.infer<typeof ResultSchema>;
