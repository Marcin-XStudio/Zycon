
import {ZodTypeAny} from "zod";

export function newInstance<InstanceFunctions>(instanceSchema: ZodTypeAny, instanceFunctions: InstanceFunctions, data: object) {
	if (data === null || data === undefined) {
		throw new Error("Payload can't be null or undefined.");
	}
	if (typeof data !== "object") {
		throw new Error("Payload has to be an object");
	}

	return {
		...instanceFunctions,
		...instanceSchema.parse({...data}),
	};
}
