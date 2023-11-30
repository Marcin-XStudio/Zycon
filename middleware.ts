import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {ResponseCookies, RequestCookies} from "next/dist/server/web/spec-extension/cookies";

import {refreshCookie, getCookieExpiresAt} from "@/lib/cookies";
 
export async function middleware(request: NextRequest) {
	const response = NextResponse.next();
	const token = request.cookies.has("auth");

	if (token) {
		if (request.nextUrl.pathname.startsWith("/login")) {
			return NextResponse.redirect(new URL("/", request.url));
		}

		const authCookie = request.cookies.get("auth");

		if (!authCookie) {
			return null;
		}

		const newToken = await refreshCookie(authCookie.value);

		if(newToken) {
			response.cookies.set("auth", newToken, {secure: true, httpOnly: true, expires: await getCookieExpiresAt()});
			applySetCookie(request, response);

			return response;
		}
	}
	
	
	// Redirect to login page if user is not logged in and tries to access homepage
	if (request.nextUrl.pathname.startsWith("/") && !token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return response;
}

export const config = {
	matcher: ["/"],
};

// Make the update of the cookies available on the request
function applySetCookie(req: NextRequest, res: NextResponse) {
	const setCookies = new ResponseCookies(res.headers);
	
	const newReqHeaders = new Headers(req.headers);
	const newReqCookies = new RequestCookies(newReqHeaders);
	setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
	
	const dummyRes = NextResponse.next({request: {headers: newReqHeaders}});
	
	dummyRes.headers.forEach((value, key) => {
		if (key === "x-middleware-override-headers" || key.startsWith("x-middleware-request-")) {
			res.headers.set(key, value);
		}
	});
}