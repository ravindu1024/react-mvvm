import axios, {Axios} from "axios";
import {AxiosRequestConfig} from "axios";

export class NetworkManager{
    
    public axios: Axios
    
    constructor(apiKey: String) {
        const baseUrl = process.env.REACT_APP_NEWS_API_URL ?? ""

        let config: AxiosRequestConfig = {
            baseURL: `${baseUrl}/v2`,
            responseType: "json",
            headers: {
                "X-Api-Key": apiKey
            }
        }
        this.axios = axios.create(config)
    }    
}

export default NetworkManager