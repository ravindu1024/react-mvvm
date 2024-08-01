export type HeadlineResponseDto = {
    totalResults: number,
    articles: NewsHeadlineDto[]
}

export type HeadlineSourceDto = {
    id?: string,
    name?: string
}

export type NewsHeadlineDto = {
    title: String,
    author?: string,
    source: HeadlineSourceDto,
    description?: string,
    url: string,
    urlToImage?: string,
    publishedAt: string
}
