import {z} from "zod";

export const UserSchema = z.object({
	id: z.number(),
	username: z.string(),
	userToken: z.string(),
	userRole: z.string()
}).strict();