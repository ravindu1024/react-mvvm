import React, {ReactElement} from "react";
import {Container, ToastContainer} from "react-bootstrap";
import {FooterProps} from "../Components/Footer";
import {NavigationBarProps} from "../Components/NavigationBar";

interface ScafoldProps{
    className: string,
    notifications: ReactElement[],
    navContent: ReactElement<NavigationBarProps>,
    mainContent: ReactElement<MainContentProps>,
    footer?: ReactElement<FooterProps>
}

export interface MainContentProps{
    
}

export const Scafold: React.FC<ScafoldProps> = ({className, notifications, navContent, mainContent, footer}: ScafoldProps) => {
    
    return(
        <div className={`${className} w-100`} id="Scafold">
            <ToastContainer className="p-2" position={"top-end"}>{notifications}</ToastContainer>
            <div id="NavBar">{navContent}</div>
            <div id="Main Content" className="main-content">{mainContent}</div>
            <div id="Footer">{footer}</div>
        </div>
    )
}

export default Scafold