import React from 'react'
import NewsHeadline from '../../../Domain/Model/NewsHeadline'
import CommonStyles from '../../Styles/CommonStyles'

interface HeadlineRowProps {
    headline: NewsHeadline
}

export const HeadlineRow: React.FC<HeadlineRowProps> = ({headline}: HeadlineRowProps) => {
    
    let author = (headline.author) ? `${headline.author}` : undefined
    if(author){
        author = (headline.source) ? `${author}, ${headline.source}` : author
    }
    
    return (
        
        <div className={`align-items-center mb-3 p-3 ${CommonStyles.rowBackground()}`}>
            <a className="link-dark fs-5 fw-bold lh-small text" href={headline.url} target="_blank">{headline.title}</a>
            <div className="row m-0 p-0 mt-3">
                <div className="col-4 p-0 pe-2">
                    {headline.imageUrl ? <img className="news-image" src={headline.imageUrl}/> : null}
                </div>
                <div className="col-8 p-0 ps-2">
                    <p className="text-start fs-7 fw-light mb-0">{author ?? ""}</p>
                    <p className="text-start fs-8 fw-light mb-2">{headline.publishedAt}</p>
                    <p className="text-start fs-6 fw-normal lh-small mb-1">{headline.description}</p>
                </div>
            </div>
        </div>
    )
}

export default HeadlineRow