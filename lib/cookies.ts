"use server";

import {cookies} from "next/headers";
import {SignJWT, jwtVerify} from "jose";

import {AuthActions} from "@/actions";

export interface CookieData {
	[key: string]: number | string | null | undefined;
	access_token?: string | null;
	refresh_token?: string | null;
    expires_at?: number | null;
    expires?: number | null;
}

export async function getCookieExpiresAt () {
	const currentDate = new Date();

	currentDate.setDate(currentDate.getDate() + 7);
	return Math.round(currentDate.getTime());
}

export async function createCookie (data: CookieData) {
	if (!data) {
		return null;
	}

	const authJwt = await new SignJWT(data)
		.setProtectedHeader({alg: "HS256", typ: "JWT"})
		.sign(new TextEncoder().encode(process.env.JWT_SECRET || ""));
	
	cookies().set("auth", authJwt, {secure: true, httpOnly: true, expires: await getCookieExpiresAt()});

	return data;
}

export async function getCookie () {
	const authCookie = cookies().get("auth");

	if (!authCookie) {
		return null;
	}

	const {payload} = await jwtVerify(authCookie.value, new TextEncoder().encode(process.env.JWT_SECRET || ""));

	return  payload;
}

export const refreshCookie = async (jwtToken :string) => {
	const {payload} = await jwtVerify(jwtToken, new TextEncoder().encode(process.env.JWT_SECRET || ""));

	const decryptedJwt = payload as CookieData;

	if(!decryptedJwt?.expires_at || !decryptedJwt?.refresh_token) {
		return null;
	}

	if (decryptedJwt.expires_at < Date.now()) {
		const refreshedToken = await AuthActions.refreshUserToken(decryptedJwt.refresh_token);

		if (refreshedToken) {
			return await new SignJWT(refreshedToken)
				.setProtectedHeader({alg: "HS256", typ: "JWT"})
				.sign(new TextEncoder().encode(process.env.JWT_SECRET || ""));
		} else {
			return null;
		}
	}
};

export async function deleteAuthCookie () {
	cookies().delete("auth");
}
