import {NewsSourceDao} from "../Dao/NewsSourceDao";
import {just} from "../../Utils/Extensions";

export class NewsLocalDataStore{
    
    async saveSources(sources: NewsSourceDao[]): Promise<void>{
        return just(() => {
            window.localStorage.setItem("saved-sources", JSON.stringify(sources))
        })
    }
    
    async getSavedSources(): Promise<NewsSourceDao[]>{
        return just(() => {
            let saved = window.localStorage.getItem("saved-sources")
            if(saved){
                return (JSON.parse(saved) as NewsSourceDao[])
            }else{
                return []
            }
        })
    }
}

export default NewsLocalDataStore