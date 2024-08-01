import NetworkManager from "../NetworkManager";
import {HeadlineResponseDto} from "../Dto/NewsHeadlineDto";
import {NewsSourcesResponseDto} from "../Dto/NewsSourceDto";

export class NewsApi {
    constructor(private networkManager: NetworkManager) {
    }

    async getHeadlines(sources: String, page: number, pagesize: number): Promise<HeadlineResponseDto>{
        let query = {
            sources: sources,
            page: page,
            pageSize: pagesize
        }

        let response = await this.networkManager.axios.get<HeadlineResponseDto>(
            "/top-headlines",
            {params: query}
        )
        
        return response.data
    };

    async getSources(countryCode: string): Promise<NewsSourcesResponseDto>{
        let query = {
            country: countryCode
        }

        let response = await this.networkManager.axios.get<NewsSourcesResponseDto>(
            "/top-headlines/sources",
            {params: query}
        )
        
        return response.data
    };
}

export default NewsApi