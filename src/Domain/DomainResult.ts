import {CustomException} from "../Data/CustomException";

export class DomainResult<T>{
    private _data?: T
    private _error?: CustomException
    
    static with<V>(data: V): DomainResult<V>{
        return new DomainResult<V>(data, undefined)
    }
    
    static empty(): DomainResult<never>{
        return new DomainResult<never>({} as never)
    }
    
    static withError<V>(error: CustomException): DomainResult<V>{
        return new DomainResult<V>(undefined, error)
    }
    
    static withCustomError<V>(error: string): DomainResult<V>{
        return new DomainResult<V>(undefined, new CustomException(error, 0))
    }

    private constructor(data?: T, error?: CustomException) {
        this._data = data
        this._error = error
    }
    
    
    get success(): boolean{
        return this._data != undefined
    }
    
    get data(): T{
        return this._data!!
    }
    
    get error(): CustomException{
        return this._error!!
    }
}