import {NewsHeadline} from "../Model/NewsHeadline";
import NewsMappings from "../Mappings/NewsMappings";
import ErrorMappings from "../Mappings/ErrorMappings";
import {DomainResult} from "../DomainResult";
import NewsApi from "../../Data/DataSources/NewsApi";
import NewsLocalDataStore from "../../Data/DataSources/NewsLocalDataStore";

export class HeadlineUseCase{
    constructor(
        private api: NewsApi,
        private localDataStore: NewsLocalDataStore,
        private mapper: NewsMappings,
        private errorMapper: ErrorMappings
    ) {
    }
    
    async getHeadlines(): Promise<DomainResult<NewsHeadline[]>>{
        try{        
            let savedSources = await this.localDataStore.getSavedSources()
            if(savedSources.length == 0){
                return DomainResult.withCustomError("No sources selected")
            }

            let sources = savedSources.map(dao => dao.source).join(",")

            let response = await this.api.getHeadlines(sources, 0, 10)
            let headlines = this.mapper.mapHeadlineDtoToDomain(response)
            return DomainResult.with(headlines)
        }catch (e) {
            return DomainResult.withError(this.errorMapper.mapToDomainError(e))
        }
    }
}

export default HeadlineUseCase