const initialState = {
  status: "VOID",
  isConnected: false,
  token: null,
  error: null,
  isSessionTimeOut: false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        status: "SUCCEEDED",
        isConnected: true,
        token: action.payload,
        error: null,
      }

    case "LOGIN_FAIL": {
      return {
        ...state,
        status: "FAILED",
        isConnected: false,
        error: action.payload,
      }
    }

    case "LOGOUT": {
      return initialState
    }

    case "SESSION_TIME_OUT": {
      return {
        ...initialState,
        isSessionTimeOut: true,
      }
    }
    default:
      return state
  }
}
