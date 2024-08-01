import NewsSource from "../Model/NewsSource";
import {NewsSourceDao} from "../../Data/Dao/NewsSourceDao";
import {NewsMappings} from "../Mappings/NewsMappings";
import ErrorMappings from "../Mappings/ErrorMappings";
import {DomainResult} from "../DomainResult";
import NewsApi from "../../Data/DataSources/NewsApi";
import NewsLocalDataStore from "../../Data/DataSources/NewsLocalDataStore";

export class SourcesUseCase{
    constructor(
        private api: NewsApi,
        private localDataStore: NewsLocalDataStore,
        private mappings: NewsMappings,
        private errorMapping: ErrorMappings
    ) {
    }
    
    async getSources(): Promise<DomainResult<NewsSource[]>>{
        try{
            let sources = await this.api.getSources("au")
            let mapped = this.mappings.mapSourceToDomain(sources)
            return DomainResult.with(mapped)
        }catch (e) {
            return DomainResult.withError(this.errorMapping.mapToDomainError(e))
        }
    }
    
    async getSavedSources(): Promise<DomainResult<string[]>>{
        try{
            let saved = await this.localDataStore.getSavedSources()
            return DomainResult.with(saved.map(s => s.source))
        }catch (e) {
            return DomainResult.withError(this.errorMapping.mapToDomainError(e))
        }
    }
    
    async saveSources(sources: string[]): Promise<DomainResult<never>>{
        try{
            let daos = sources.map((s) => {
                let dao: NewsSourceDao = {
                    source: s
                }
                return dao
            })

            await this.localDataStore.saveSources(daos)
            return DomainResult.empty()
        }catch (e) {
            return DomainResult.withError(this.errorMapping.mapToDomainError(e)) 
        }
    }
    
}


export default SourcesUseCase