import {ZodRawShape, ZodObject} from "zod";

export function parseInstance<InstanceFunctions, T extends ZodRawShape, TReturn>(instanceSchema: ZodObject<T>, instanceFunctions: InstanceFunctions, data: object, partial = false):TReturn {
	const instancePartialSchema = instanceSchema.partial();

	if (!partial) {
		return {
			...instanceSchema.parse(data),
			...instanceFunctions
		} as TReturn;
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
			...instancePartialSchema.parse(data),
			...instanceFunctions
		} as TReturn;
	}
}