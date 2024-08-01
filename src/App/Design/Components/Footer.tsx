import React, {ReactElement} from "react";

export interface FooterData{
    title?: string,
    description?: string
}
export interface FooterProps{
    data?: FooterData
}

export const Footer: React.FC<FooterProps> = ({data}: FooterProps): ReactElement => {
    
    return(
        <div className="bg-dark p-4">
            <p className="text text-center text-light fs-5">{data?.title ?? ""}</p>
            <p className="text text-center text-light fw-light">{data?.description ?? ""}</p>
        </div>
    )
}

export default Footer