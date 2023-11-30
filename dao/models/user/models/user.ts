import * as z from "zod";

import * as userFunctions from "../functions";
import {newInstance} from "../../functions/newInstance";
import {parseInstance} from "../../functions/parseInstance";


export const UserSchema = z.object({
	id: z.string().optional(),
	first_name: z.string().optional(),
	last_name: z.string().optional(),
	password: z.string().optional(),
	email: z.string().optional(),
	description: z.string().nullable(),
	tags: z.array(z.string()).optional(),
	avatar: z.string().nullable(),
	status: z.string().optional(),
	email_notifications: z.boolean().optional(),
}).strict();

export const UserPartialSchema = UserSchema.partial();
export type UserPartial = z.infer<typeof UserPartialSchema>;
export type User = z.infer<typeof UserSchema>;

export const newUser = (data: object):User => newInstance(UserSchema, userFunctions, data);

export const parseUser = (data: object):User => parseInstance(UserSchema, userFunctions, data, true);
