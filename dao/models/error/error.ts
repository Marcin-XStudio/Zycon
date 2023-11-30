import * as z from "zod";
import * as errorFunctions from "./functions";
import {TimestampSchema} from "../timestamp";
import {newInstance} from "../functions/newInstance";
import {parseInstance} from "../functions/parseInstance";

export const ErrorSchema = z.object({
	trace: z.string(),
	user_message: z.string(),
	createdTimestamp: TimestampSchema,
	error: z.any().default(null)
});

export const ErrorPartialSchema = ErrorSchema.partial();
export type ErrorPartial = z.infer<typeof ErrorPartialSchema>;
export type Error = z.infer<typeof ErrorSchema>;

export const newError = (data: object) => newInstance(ErrorSchema, errorFunctions, data);

export const parseError = (data: object, partial = false) => parseInstance(ErrorSchema, errorFunctions, data, partial);