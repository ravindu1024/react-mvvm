import React, {Dispatch, ReactElement, SetStateAction, useEffect, useMemo, useRef, useState} from 'react'
import DI from "../../DI";
import HeadlineState from "./HeadlineState";
import PageTitle from "../../Design/Atoms/PageTitle";
import Spinner from "../../Design/Components/Spinner";
import HeadlineRow from '../../Design/Components/HeadlineRow';
import Notification, { NotificationData } from "../../Design/Components/Notification";
import { useComponentMount } from '../../../Utils/CustomHooks';
import { FooterData} from "../../Design/Components/Footer";
import {NavigationBarData} from "../../Design/Components/NavigationBar";
import {Button, Container, Row} from "react-bootstrap";
import Link from '../../Design/Atoms/Link';

interface HeadlinePageProps {
    footerCallback: (footerData: FooterData) => void
    navCallback: (navData: NavigationBarData) => void
    notificationCallback: (notificationData: NotificationData) => void
}

export const HeadlinePage: React.FC<HeadlinePageProps> = ({footerCallback, navCallback, notificationCallback}: HeadlinePageProps) => {

    // Initialize State
    const [state, setHeadlineState] = useState<HeadlineState>({
        headlines: [],
        error: undefined,
        isLoading: false
    })

    // Initialize one time objects
    let viewModel = useMemo(() => {
        return DI.getHeadlineListviewModel(state, setHeadlineState)
    }, [])


    // Run on component mount
    useComponentMount(() => {
        footerCallback({
            title: "News Browser App",
            description: "Top Headlines for today"
        })

        navCallback({
            title: "News Browser",
            button1: {
                title: "Manage Sources",
                url: "/sources"
            }
        })

        viewModel.getHeadlines()
    })

    // Error handling inside a useEffect to prevent unwanted re-renders
    useEffect(() => {
        console.log("use effect error")
        if(state.error){
            notificationCallback({title: "Error", message: state.error, isError: true})
        }
    }, [state.error])


    // Run everytime

    document.body.classList.add("scrollbar-visible")


    let mainComponent: any
    if(state.isLoading){
        mainComponent = <Spinner/>
    }else if (state.headlines.length === 0){
        mainComponent = (
            <Container className="">
                <Row className="justify-content-center mt-5">
                    <p className="text-center fw-light text-secondary fs-7 m-0">No headlines found. Check your sources and try again.</p>
                    <button className="btn btn-link fs-7" onClick={() => viewModel.getHeadlines()}>Try Again</button>
                </Row>
            </Container>
        )
    }else{
        mainComponent = state.headlines.map((headline) => {
            return <HeadlineRow headline={headline} key={headline.url}/>
        })
    }

    return (
        <div className="container max-width-medium">
            <PageTitle text={"Latest Headlines"}/>
            <div className="mt-3">
                {
                    mainComponent
                }
            </div>
        </div>
    )
}