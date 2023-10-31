import {Error} from "../error";

export function toString(this: Error) {
	return `Error ${this.error}`;
}
