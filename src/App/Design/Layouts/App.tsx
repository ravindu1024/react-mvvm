import React, {ReactElement, useState} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {HeadlinePage} from "../../Features/Headlines/HeadlinePage";
import {SourcesPage} from "../../Features/Sources/SourcesPage";
import Footer, {FooterData} from "../Components/Footer";
import Scafold from "./Scafold";
import {NavigationBar, NavigationBarData} from "../Components/NavigationBar";
import Notification, {NotificationData} from "../Components/Notification";


export const App: React.FC<any> = props => {
    const [footer, setFooter] = useState<FooterData>()
    const [navContent, setNavContent] = useState<NavigationBarData>()
    const [notifications, setNotifications] = useState<ReactElement[]>([])

    const footerCallback = (data: FooterData): void => {
        setFooter(data)
    }

    const navCallback = (data: NavigationBarData): void => {
        setNavContent(data)
    }

    const notificationCallback = (data: NotificationData): void => {
        console.log("notification callbak")
        let notif = <Notification data={data} show={true}/>
        let newList = notifications.slice()
        newList.push(notif)
        setNotifications(newList)
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HeadlinePage
                footerCallback={footerCallback}
                navCallback={navCallback}
                notificationCallback={notificationCallback}/>
        },
        {
            path: "/sources",
            element: <SourcesPage
                footerCallback={footerCallback}
                navCallback={navCallback}
                notificationCallback={notificationCallback}/>
        }
    ])


    return (
        <Scafold
            className="scafold"
            notifications={notifications}
            navContent={<NavigationBar data={navContent}/>}
            mainContent={<RouterProvider router={router}/>}
            footer={<Footer data={footer}/>}
        />
    )
}