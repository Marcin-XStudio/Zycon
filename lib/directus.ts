import {createDirectus, authentication, rest} from "@directus/sdk";

export const client = createDirectus("https://akteapkonnect.directus.app/")
	.with(authentication("json", {autoRefresh: true, credentials: "include"}))
	.with(rest({credentials: "include"}));
