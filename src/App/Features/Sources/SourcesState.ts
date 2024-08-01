import NewsSource from "../../../Domain/Model/NewsSource";

export interface SourcesState{
    sources: NewsSource[],
    saved: string[],
    error?: string,
    isLoading: boolean
}


export default SourcesState