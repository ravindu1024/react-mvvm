import NewsApi from "../DataSources/NewsApi";
import {HeadlineResponseDto} from "../Dto/NewsHeadlineDto";
import {NewsSourcesResponseDto} from "../Dto/NewsSourceDto";
import {NewsSourceDao} from "../Dao/NewsSourceDao";
import NewsLocalDataStore from "../DataSources/NewsLocalDataStore";
import ErrorMappings from "../../Domain/Mappings/ErrorMappings";
import {CustomException} from "../CustomException";

export class NewsRepository {
    constructor(
        private api: NewsApi,
        private localDataStore: NewsLocalDataStore,
        private errorMappings: ErrorMappings
    ) {
        
    }
    
    async getHeadlines(sources: string): Promise<HeadlineResponseDto>{
        return this.api.getHeadlines(sources, 0, 20)
    }
    
    async getSources(country: string): Promise<NewsSourcesResponseDto>{
        return this.api.getSources(country)
    }
    
    async getSavedSources(): Promise<NewsSourceDao[]>{
        return this.localDataStore.getSavedSources()
    }
    
    async saveSources(sources: NewsSourceDao[]): Promise<void>{
        return this.localDataStore.saveSources(sources)
    }
}

export default NewsRepository