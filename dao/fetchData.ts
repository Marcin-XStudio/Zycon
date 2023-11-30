import {client} from "@/lib/directus";
import {withToken, readItems, refresh} from "@directus/sdk";

// 1. Challenge the way storage is used
// 2. Refacto for pure refresh token function
// 3. Find a way to do the same server side 
// 4. Models front agnostiques
// 5. Models back appropriés pour le back utilisé

export const fetchClientData = async (collection: string) => {

	const refresh_token = localStorage.getItem("refresh_token");

	const refreshToken = await client.request(refresh("json", refresh_token as string));

	localStorage.setItem("refresh_token", refreshToken.refresh_token as string);
	
	const result = await client.request(withToken(refreshToken.access_token as string, readItems(collection)));

	if (result) {
		return result;
	}
};
