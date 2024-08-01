import React, {useState} from "react";
import {Toast} from "react-bootstrap";

export interface NotificationData{
    title: string
    message?: string
    isError: boolean
}
export interface NotificationProps{
    data: NotificationData
    show: boolean
}

export const Notification: React.FC<NotificationProps> = ({data, show}: NotificationProps) => {
    
    const [shouldShow, setShouldShow] = useState(show)
    let colour = data.isError ? "bg-danger-subtle" : "bg-info-subtle"
    
    setTimeout(() => {
        setShouldShow(false)
    }, 2000)
    
    return(
        <Toast show={shouldShow} onClose={() => setShouldShow(false)} className={colour}>
                <Toast.Header>
                    <strong className="me-auto">{data.title}</strong>
                </Toast.Header>
                <Toast.Body>{data.message ?? "Unknown error"}</Toast.Body>
        </Toast>
    )
}

export default Notification