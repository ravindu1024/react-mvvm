import NewsHeadline from "../../../Domain/Model/NewsHeadline";

export interface HeadlineState{
    headlines: NewsHeadline[],
    error?: string,
    isLoading: boolean
}

export default HeadlineState 