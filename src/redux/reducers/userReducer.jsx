
const initialState = {
    status: 'VOID',
    userData: {}
}

export const userReducer = (state = initialState, action ) => {
    switch (action.type) {
        case "GET_USERPROFILE":
            return {
                ...state,
                status: 'SUCCEEDED',
                userData: action.payload
            }
        case "EDIT_USERNAME": 
            return {
                ...state,
                status: "MODIFIED",
                userData: {
                    ...state.userData,
                    firstname: action.payload.firstName,
                    lastname: action.payload.lastName
                } 
            } 
        case "LOGOUT": {
            return initialState
        }   
        default:
            return state    
    }
}
