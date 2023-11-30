"use server";

import {handleError} from "@/utils/handleError";
import {ACTION_CODE} from "./_actionCode";
import {LoggerService} from "@/services";
import {AuthDao} from "@/dao";

const FUNCTION_CODE = "GET_CURRENT_USER";


export async function getCurrentUser() {
	try {
		LoggerService.logInfo("Action - getCurrentUser - Start");

		const currentUser = await AuthDao.getCurrentUser();

		LoggerService.logInfo("Action - getCurrentUser - End - Success");
		
		return currentUser;
	} 
    
	catch (error: unknown | Error) {
		handleError(
			error, 
			ACTION_CODE, 
			FUNCTION_CODE,
			"Echec de la récupération de l'utilisateur courant",
		);
	}
}
