import * as z from "zod";
import {ErrorSchema} from "../error";
import {newInstance, parseInstance} from "../functions";
import * as resultFunctions from "./functions";

type Error = z.infer<typeof ErrorSchema>;

export const ErrorResultSchema = z.object({
	success: z.literal(false),
	error: ErrorSchema
}).strict();

export const ErrorResultPartialSchema = ErrorResultSchema.partial();
export type ErrorResultPartial = z.infer<typeof ErrorResultPartialSchema>;
export type ErrorResult = z.infer<typeof ErrorResultSchema>;

export const newErrorResult = (error: Error | unknown) => newInstance(ErrorResultSchema, resultFunctions, {success: false, error: error});

export const parseErrorResult = (data: object, partial = false) => parseInstance(ErrorResultSchema, resultFunctions, data, partial);

export const SuccessResultSchema = z.object({
	success: z.literal(true),
	data: z.any()
}).strict();

export const SuccessResultPartialSchema = SuccessResultSchema.partial();
export type SuccessResultPartial = z.infer<typeof SuccessResultPartialSchema>;
export type SuccessResult = z.infer<typeof SuccessResultSchema>;

export const newSuccessResult = (data: unknown) => newInstance(SuccessResultSchema, resultFunctions, {success: true, data: data});

export const parseSuccessResult = (data: object, partial = false) => parseInstance(SuccessResultSchema, resultFunctions, data, partial);

export const ResultSchema = z.union([ErrorResultSchema, SuccessResultSchema]);
export type Result = z.infer<typeof ResultSchema>;
