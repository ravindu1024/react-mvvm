import {AxiosRequestConfig, AxiosResponse} from "axios";


export function just<T>(run: () => T): Promise<T>{
    return new Promise((resolve) => resolve(run()))
}

export {}


