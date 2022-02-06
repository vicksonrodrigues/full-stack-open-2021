export const setNotification =(message,notificationType,displayTime) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      payload:{
        message,
        notificationType
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
        payload:{
          message: null,
          notificationType: null
        }
      })
    }, displayTime * 1000)
  }
}

const initialState = {
  message : null,
  notificationType: null,
}

const notificationReducer = (state=initialState, action) => {
  switch(action.type) {
  case 'SHOW_NOTIFICATION':
    return {
      ...state,
      message: action.payload.message,
      notificationType: action.payload.notificationType
    }
  case 'HIDE_NOTIFICATION':
    return {
      ...state,
      message: action.payload.message,
      notificationType: action.payload.notificationType
    }
  default:
    return state
  }
}

export default notificationReducer