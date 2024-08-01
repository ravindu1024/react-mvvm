import React from "react";

export interface NavigationBarData {
    title?: string,
    button1?: {
        title: string,
        url: string
    }
}

export interface NavigationBarProps {
    data?: NavigationBarData
}

export const NavigationBar: React.FC<NavigationBarProps> = ({data}: NavigationBarProps) => {
    return (
        <div className="bg-dark p-2">
            <div className="row align-items-center ps-5 pe-5">
                <div className="col">
                    <p className="text text-light fs-5 m-0">{data?.title ?? ""}</p>
                </div>
                <div className="col">
                    {
                        data?.button1 ?
                            <p
                                className="text-light fw-medium text-end m-0 p-0"
                            ><a
                                className="link-opacity-100-hover link-light"
                                href={data.button1.url}>{data.button1.title}
                            </a>

                            </p> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default NavigationBar