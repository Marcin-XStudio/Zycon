import * as z from "zod";

export const TimestampSchema = z.number();

export type Timestamp = z.infer<typeof TimestampSchema>;

export function newTimestamp() {
	return TimestampSchema.parse(Date.now());
}

export function parseTimestamp(data: unknown) {
	return TimestampSchema.parse(data);
}
