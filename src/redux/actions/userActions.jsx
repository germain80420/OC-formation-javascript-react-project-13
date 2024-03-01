export const userProfile = (userData) => {
  return {
    type: "GET_USERPROFILE",
    payload: userData,
  }
}

export const updateUserInfos = (userData) => {
  return {
    type: "EDIT_USERNAME",
    payload: userData,
  }
}

export const clearUserData = () => {
  return {
    type: "CLEAR_USER_DATA",
  }
}
