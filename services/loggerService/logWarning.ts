import {ErrorModel} from '../../models';
import {SERVICE_CODE} from './_serviceCode';
const FUNCTION_CODE = 'LOG_WARNING';

/**
 * logWarning
 * @param {unknown} payload
 * @return {Promise<Result>}
 * @author titouan@x-studio.fr
 */
export async function logWarning(payload: unknown) {
    try {
        console.warn(payload);
    }
    catch (error) {
        console.error(ErrorModel.newError({
            code: `${SERVICE_CODE}/${FUNCTION_CODE}/ERROR`,
            message: 'Une erreur est survenue.',
            error: error
        }));
    }
}
