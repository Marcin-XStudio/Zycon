import {Result} from '../result';

export function toString(this: Result) {
    return `Result: ${this.success}`;
}
