
export const initialState = {
    dates: {
        startDate: new Date(Date.now() - 86400000),
        endDate: new Date(Date.now())
    },
    filters: {
        inart : false,
        callillust : false,
        ameliart : false,
        gawrt : false,
        artofashes : false,
        irysart : false,
        kronillust : false,
        drawmei : false,
        illustraybae : false,
        galaxillust : false,
        finefaunart: false 
    },
    loading: false,
    firstLoaded: false
}

export interface Action {
    type: string,
    payload: string | Date | boolean
}

export default function mainViewReducer(state = initialState, action: Action) {
    switch(action.type) {
        case 'addTag': {
            let filter = {
                ...state.filters
            };
            filter[action.payload as string] = !state.filters[action.payload as string];
            return {
                ...state,
                filters: filter
            }
        }
        case 'updateStartDate': {
            return {
                ...state,
                dates: {
                    ...state.dates,
                    startDate: action.payload as Date
                }
            }
        }
        case 'updateEndDate': {
            return {
                ...state,
                dates: {
                    ...state.dates,
                    endDate: action.payload as Date
                }
            }
        }
        case 'setLoading': {
            let firstLoadingState = state.firstLoaded;
            if (action.payload as boolean === false) { firstLoadingState = true }
            return {
                ...state,
                loading: action.payload as boolean,
                firstLoaded: firstLoadingState
            }
        }
        default:
            return state
    }
}