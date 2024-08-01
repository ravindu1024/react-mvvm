import React from 'react'

interface LinkProps{
    className?: string
    text: string,
    url: string
}

export const Link: React.FC<LinkProps> = ({className, text, url}: LinkProps) => {
    return(
        <p className={`${className ?? ""}`}><a className={`link-opacity-100-hover`} href={url}>{text}</a></p>
    )
}

export default Link