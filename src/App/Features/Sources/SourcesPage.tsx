import React, {useEffect, useMemo, useState} from 'react'
import DI from "../../DI";
import SourcesState from "./SourcesState";
import NewsSourceRow from "../../Design/Components/NewsSourceRow";
import Spinner from '../../Design/Components/Spinner';
import {useComponentMount} from "../../../Utils/CustomHooks";
import {NotificationData} from "../../Design/Components/Notification";
import PageTitle from "../../Design/Atoms/PageTitle";
import {FooterData} from '../../Design/Components/Footer';
import {NavigationBarData} from '../../Design/Components/NavigationBar';

interface SourcesProps {
    footerCallback: (footerData: FooterData) => void,
    navCallback: (navData: NavigationBarData) => void,
    notificationCallback: (notificationData: NotificationData) => void
}

export const SourcesPage: React.FC<SourcesProps> = ({
                                                        footerCallback,
                                                        navCallback,
                                                        notificationCallback
                                                    }: SourcesProps) => {
    // Initialize state
    const [state, setPageState] = useState<SourcesState>({
        sources: [],
        saved: [],
        error: undefined,
        isLoading: false
    })

    // One time object creation
    const viewModel = useMemo(() => {
        return DI.getSourcesListViewModel(state, setPageState)
    }, [state, setPageState])

    viewModel.notificationCallback = notificationCallback

    //Handling Notifications
    useEffect(() => {
            if (state.error) {
                notificationCallback({title: "Error", message: state.error, isError: true})
            }
        },
        [state.error]
    )

    // Component mount
    useComponentMount(() => {
        footerCallback({
            title: "News Browser App",
            description: "News sources for Australia"
        })

        navCallback({
            title: "News Browser",
            button1: {
                title: "Home",
                url: "/"
            }
        })

        viewModel.getSources()
    })


    let sourcesRows = state.sources.map((source, index) => {
        let checked = state.saved.find(s => s === source.id) != null
        return (
            <NewsSourceRow
                key={index}
                source={source}
                checked={checked}
                onCheckChanged={checked => {
                    viewModel.onSourceToggled(source.id, checked)
                }}
                onRowClicked={() => viewModel.onSourceToggled(source.id, !checked)}
            />
        )
    })

    document.body.classList.add("scrollbar-visible")

    return (
        <div className="container max-width-medium">
            <PageTitle text="Select News Sources"/>
            <div className="mt-3">
                {state.isLoading ? <Spinner/> : sourcesRows}
            </div>
        </div>
    )
}