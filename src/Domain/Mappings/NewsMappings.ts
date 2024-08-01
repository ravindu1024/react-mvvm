import {HeadlineResponseDto} from "../../Data/Dto/NewsHeadlineDto";
import {NewsHeadline} from "../Model/NewsHeadline";
import {NewsSourcesResponseDto} from "../../Data/Dto/NewsSourceDto";
import NewsSource from "../Model/NewsSource";
import {NewsSourceDao} from "../../Data/Dao/NewsSourceDao";

export class NewsMappings {
    mapHeadlineDtoToDomain(dto: HeadlineResponseDto): NewsHeadline[] {
        return dto.articles.map((dto) => {
            let headline: NewsHeadline = {
                title: dto.title,
                author: dto.author,
                source: dto.source.name,
                description: dto.description ?? "",
                url: dto.url,
                imageUrl: dto.urlToImage,
                publishedAt: dto.publishedAt
            }
            return headline
        })
    }
    
    mapSourceToDomain(dto: NewsSourcesResponseDto): NewsSource[]{
        return dto.sources.map((dto) => {
            let source: NewsSource = {
                id: dto.id,
                name: dto.name
            }
            return source
        })
    }
}

export default NewsMappings