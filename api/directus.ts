import {createDirectus, authentication, rest} from "@directus/sdk";

export const directus = createDirectus("http://34.42.236.49:8055/").with(authentication()).with(rest());
