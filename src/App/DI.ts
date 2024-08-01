import NetworkManager from "../Data/NetworkManager";
import {NewsApi} from "../Data/DataSources/NewsApi";
import {NewsRepository} from "../Data/Repositories/NewsRepository";
import NewsMappings from "../Domain/Mappings/NewsMappings";
import HeadlineUseCase from "../Domain/UseCases/HeadlineUseCase";
import HeadlineListViewModel from "./Features/Headlines/HeadlineListViewModel";
import HeadlineState from "./Features/Headlines/HeadlineState";
import NewsLocalDataStore from "../Data/DataSources/NewsLocalDataStore";
import SourcesUseCase from "../Domain/UseCases/SourcesUseCase";
import SourcesState from "./Features/Sources/SourcesState";
import SourcesViewModel from "./Features/Sources/SourcesViewModel";
import ErrorMappings from "../Domain/Mappings/ErrorMappings";
import {SetState} from "../Utils/Types";

export class DI{
    static getNewsLocalDataStore(): NewsLocalDataStore{
        return new NewsLocalDataStore()
    }
    
    static getHeadlinesApi(): NewsApi{
        return new NewsApi(this.getNetworkManager())
    }
    
    
    static getHeadlinesRepository(): NewsRepository{
        return new NewsRepository(this.getHeadlinesApi(), this.getNewsLocalDataStore(), this.getErrorMappings())
    }
    
    static getMappings(): NewsMappings{
        return new NewsMappings()
    }
    
    
    static getHeadlinesUseCase(): HeadlineUseCase{
        return new HeadlineUseCase(this.getHeadlinesApi(), this.getNewsLocalDataStore(), this.getMappings(), this.getErrorMappings())
    }
    
    static getSourcesUseCase(): SourcesUseCase{
        return new SourcesUseCase(this.getHeadlinesApi(), this.getNewsLocalDataStore(), this.getMappings(), this.getErrorMappings())
    }
    
    static getHeadlineListviewModel(initialState: HeadlineState, setState: SetState<any>): HeadlineListViewModel{
        return new HeadlineListViewModel(this.getHeadlinesUseCase(), initialState, setState)
    }
    
    static getSourcesListViewModel(initialState: SourcesState, setState: SetState<SourcesState>): SourcesViewModel{
        return new SourcesViewModel(this.getSourcesUseCase(), initialState, setState)
    }
    
    static getNetworkManager(): NetworkManager{
        return new NetworkManager(process.env.REACT_APP_NEWS_API_KEY ?? "")
    }
    
    static getErrorMappings(): ErrorMappings{
        return new ErrorMappings()
    }
}

export default DI