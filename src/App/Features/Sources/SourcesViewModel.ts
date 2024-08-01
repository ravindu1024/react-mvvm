import SourcesUseCase from "../../../Domain/UseCases/SourcesUseCase";
import SourcesState from "./SourcesState";
import {SetState} from "../../../Utils/Types";
import {NotificationData} from "../../Design/Components/Notification";


export class SourcesViewModel {

    private state: SourcesState
    public notificationCallback: (data: NotificationData) => void = () => {}

    constructor(private useCase: SourcesUseCase, initialState: SourcesState, private setState: SetState<SourcesState>) {
        this.state = initialState
    }

    private updateState(newState: SourcesState){
        this.state = newState
        this.setState(newState)
    }
    
    getSources() {
        this._getSources().then()
    }
    
    onSourceToggled(sourceId: string, toggle: boolean) {
        this._onSourceToggled(sourceId, toggle).then()
    }

    private async _getSources(){        
        this.updateState({
            ...this.state,
            error: undefined,
            isLoading: true
        })
        
        let savedSources = await this.useCase.getSavedSources()
        let apiSources = await this.useCase.getSources()
        
        if(savedSources.success && apiSources.success){
            this.updateState({
                sources: apiSources.data,
                saved: savedSources.data,
                error: undefined,
                isLoading: false
            })
        }else{
            let message: string
            if(!savedSources.success){
                message = savedSources.error.message
            }else{
                message = apiSources.error.message
            }
            
            this.updateState({
                ...this.state,
                isLoading: false,
                error: message
            })
        }
    }

    private async _onSourceToggled(sourceId: string, toggle: boolean){
        let savedSources = this.state.saved.filter((s) => s !== sourceId)

        if (toggle) {
            savedSources.push(sourceId)
        }
        
        let result = await this.useCase.saveSources(savedSources)
        if(result.success){
            let updatedSources = this.state.sources
                .filter(s => savedSources.includes(s.id))
                .map(s => s.name)
                .join(", ")

            this.notificationCallback({
                title: "Saved",
                message: "Updates saved sources: " + updatedSources,
                isError: false
            })

            this.updateState({
                ...this.state,
                saved: savedSources,
                error: undefined,
                isLoading: false
            })
        }else{
            this.updateState({
                ...this.state,
                error: result.error.message,
                isLoading: false
            })
        }
    }
}

export default SourcesViewModel