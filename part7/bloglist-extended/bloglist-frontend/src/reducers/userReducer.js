import userService from '../services/users'
export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USER_LIST',
      payload:
          users,
    })
  }

}

const userReducer = (state=[],action) => {
  switch(action.type)
  {
  case 'INIT_USER_LIST':
    return action.payload

  default:
    return state
  }

}

export default userReducer