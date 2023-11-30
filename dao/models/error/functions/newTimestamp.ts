import {TimestampSchema} from "../../timestamp";
export function newTimestamp() {
	return TimestampSchema.parse(Date.now());
}