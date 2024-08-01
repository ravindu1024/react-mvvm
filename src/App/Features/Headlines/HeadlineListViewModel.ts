import HeadlineUseCase from "../../../Domain/UseCases/HeadlineUseCase";
import HeadlineState from "./HeadlineState";
import {SetState} from "../../../Utils/Types";

export class HeadlineListViewModel {

    private state: HeadlineState

    constructor(private useCase: HeadlineUseCase, initialState: HeadlineState, private setState: SetState<HeadlineState>) {
        this.state = initialState
    }
    

    updateState(newState: HeadlineState){

        this.state = newState
        this.setState(newState)
    }
    
    private async _getHeadlines(){
        this.updateState({
            ...this.state,
            error: undefined,
            isLoading: true
        })
        
        let headlines = await this.useCase.getHeadlines()
        if(headlines.success){
            this.updateState({
                headlines: headlines.data,
                error: undefined,
                isLoading: false
            })
        }else{
            this.updateState({
                ...this.state,
                error: headlines.error.message,
                isLoading: false
            })
        }
    }

    getHeadlines() {
        this._getHeadlines().then()
    }
}

export default HeadlineListViewModel