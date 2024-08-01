import React from 'react'

interface PageTitleProps{
    className?: string
    text: string
}

export const PageTitle: React.FC<PageTitleProps> = ({className, text}: PageTitleProps) => {
    
    return (
        <p className={`text-center fs-2 text mb-3 mt-2 ${className ?? ""}`}>{text}</p>
    )
}

export default PageTitle