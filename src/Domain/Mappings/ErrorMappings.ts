import {CustomException} from "../../Data/CustomException";
import {AxiosError} from "axios";

export class ErrorMappings{
    
    mapToDomainError(error: any): CustomException{
        if(error instanceof AxiosError){
            let er = error as AxiosError
            if(er.response?.status === 401){
                return new CustomException("Invalid API key", 401)
            }
        }
        
        return new CustomException("Unknown error", 0)
    }
}

export default ErrorMappings